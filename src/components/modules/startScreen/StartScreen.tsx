import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {setTestData} from '@reducers/testData/dispatchers';
import {loadTasksData} from '@lib/loadTasksData';
import {UrlParamsT} from '@components/types';
import {Button} from '@components/elements/button';
import {LocalizedText} from '@components/elements/localizedText';
import config from '@config';
import styles from './styles.scss';

export const StartScreen = () => {
    const isFirstTime = useSelector((state:any) => state.studentData.isFirstTime);
    const {subject} = useParams<UrlParamsT>();
    const options = config.options[subject];

    const startTest = async (option:string) => {
        const [data, progress] = await loadTasksData(subject);
        setTestData({subject: subject, isTestStarted: true, option: option, tasksData: data, tasksProgress: progress});
    };

    return <div className={styles.startScreen}>
        <img src={require('_assets/img/greeting.png')} alt='greeting' className={styles.greetingImg}/>
        <div className={styles.info}>
            <div className={styles.titleWrap}>
                <h3 className={styles.title}>
                    <LocalizedText name={`greeting.title.${isFirstTime ? 'firstTime' : 'common'}`} path={`${subject}/translation`}/>
                </h3>
                {isFirstTime && <img src={require('_assets/img/gift.png')} alt='gift'/>}
            </div>
            <p className={styles.text}>
                <LocalizedText name={`greeting.description.${isFirstTime ? 'firstTime' : 'common'}`} path={`${subject}/translation`}/>
            </p>
            <h4 className={styles.startTest}>
                <LocalizedText name={'greeting.startTest'} path={`${subject}/translation`}/>
            </h4>
            <div className={styles.ageBtnWrapper}>
                {options.map((option:string) => <Button
                    key={option}
                    className={styles.ageBtn}
                    onClick={() => startTest(option)}
                >
                    <LocalizedText name={'greeting.childrenFrom'} path={`${subject}/translation`}/>
                    <LocalizedText name={`greeting.${option}`} path={`${subject}/translation`}/>
                </Button>)}
            </div>
        </div>
    </div>;
};
