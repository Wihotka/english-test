import React, {FC, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {
    setIsAudioPlaying as setIsAudioListening,
    setIsAnotherAudioPlaying as setIsAnotherAudioListening
} from '@reducers/testData/dispatchers';
import styles from './style.scss';

export type BtnType = 'play' | 'playSlowly';

type P = {
    disabled?:boolean;
    type:BtnType;
    audioObj:HTMLAudioElement;
    isAudioPlaying:boolean;
    setIsAudioPlaying:React.Dispatch<React.SetStateAction<boolean>>;
    isAudioPaused:boolean;
    setIsAudioPaused:React.Dispatch<React.SetStateAction<boolean>>;
    isAudioSlowedDown:boolean;
    setIsAudioSlowedDown:React.Dispatch<React.SetStateAction<boolean>>;
};

export const BtnPlay:FC<P> = (p) => {
    const {
        disabled = false, 
        type,
        audioObj,
        isAudioPlaying,
        setIsAudioPlaying,
        isAudioPaused,
        setIsAudioPaused,
        isAudioSlowedDown,
        setIsAudioSlowedDown
    } = p;

    //Подключаем данные из стора чтобы определять включена ли другая запись в данный момент
    const isAudioListening = useSelector((state:any) => state.testData.isAudioPlaying);
    const isAnotherAudioListening = useSelector((state:any) => state.testData.isAnotherAudioPlaying);

    const clickPlayHandler = () => {
        if (disabled) return;

        type === 'play'
            ? isAudioPlaying && !isAudioPaused
                ? pauseAudio()
                : playAudio()
            : playSlowlyAudio();
    };

    const pauseAudio = () => {
        setIsAudioPaused(true);
        audioObj.pause();
    };

    const playAudio = () => {
        if (isAudioListening && !isAudioPaused) setIsAnotherAudioListening(true);

        setTimeout(() => {
            setIsAudioPlaying(true);
            setIsAudioPaused(false);
            audioObj.volume = 1;
            audioObj.playbackRate = isAudioSlowedDown ? 0.7 : 1;
            audioObj.play().then();
            setIsAudioListening(true);
        }, 0);
    };

    const playSlowlyAudio = () => {
        if (isAudioSlowedDown) {
            audioObj.playbackRate = 1;
            setIsAudioSlowedDown(false);
        } else {
            audioObj.playbackRate = 0.7;
            setIsAudioSlowedDown(true);
        }
    };

    audioObj.addEventListener('ended', function(){
        audioObj.currentTime = 0;

        setIsAudioPlaying(false);
        setIsAudioListening(false);
    });

    //Останавливаем аудио при смене этапа
    useEffect(() => {
        return () => {
            setIsAudioPlaying(false);
            setIsAudioPaused(false);
            audioObj.pause();
            audioObj.currentTime = 0;
            audioObj.remove();
            setIsAudioListening(false);
        };
    }, []);

    useEffect(() => {
        if (isAnotherAudioListening && isAudioPlaying) {
            setIsAudioPlaying(false);
            setIsAudioPaused(false);
            audioObj.pause();
            audioObj.currentTime = 0;
            setIsAudioListening(false);
            setIsAnotherAudioListening(false);
        }
    }, [isAnotherAudioListening]);

    const btnClassName = classNames(styles.btn, styles[`btn_${type}`]);

    return <button
        disabled={disabled}
        className={btnClassName}
        onClick={clickPlayHandler}
    >
        {type === 'play'
            ? isAudioPlaying && !isAudioPaused
                ? <img className={styles.logoPause} src={require(`_assets/img/elements/${type}Pause.svg`)} draggable={false} alt='pause'/>
                : <img className={styles.logoPlay} src={require(`_assets/img/elements/${type}.svg`)} draggable={false} alt='play'/>
            : isAudioSlowedDown 
                ? <img className={styles.logoPlay} src={require(`_assets/img/elements/${type}Slowed.svg`)} draggable={false} alt='play'/>
                : <img className={styles.logoPlay} src={require(`_assets/img/elements/${type}.svg`)} draggable={false} alt='play'/>
        }
    </button>;
};

export const BtnPlayGroup = (p) => {
    const {disabled = false, audioFile, soundUrl, isAnotherBtnPressed} = p;

    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
    const [isAudioPaused, setIsAudioPaused] = useState<boolean>(false);
    const [isAudioSlowedDown, setIsAudioSlowedDown] = useState<boolean>(false);

    const audioUrl = require(`_assets/sounds/${soundUrl}/${audioFile}.mp3`);
    const [audioObj] = useState<HTMLAudioElement>(new Audio(audioUrl));

    if (isAnotherBtnPressed) {
        setIsAudioPlaying(false);
        setIsAudioPaused(false);
        audioObj.pause();
        audioObj.currentTime = 0;
    }

    return <div className={styles.btnGroup}>
        <BtnPlay
            audioObj={audioObj}
            type='play'
            disabled={disabled}
            isAudioPlaying={isAudioPlaying}
            setIsAudioPlaying={setIsAudioPlaying}
            isAudioPaused={isAudioPaused}
            setIsAudioPaused={setIsAudioPaused}
            isAudioSlowedDown={isAudioSlowedDown}
            setIsAudioSlowedDown={setIsAudioSlowedDown}
        />
        <BtnPlay
            audioObj={audioObj}
            type='playSlowly'
            disabled={disabled}
            isAudioPlaying={isAudioPlaying}
            setIsAudioPlaying={setIsAudioPlaying}
            isAudioPaused={isAudioPaused}
            setIsAudioPaused={setIsAudioPaused}
            isAudioSlowedDown={isAudioSlowedDown}
            setIsAudioSlowedDown={setIsAudioSlowedDown}
        />
    </div>;
};