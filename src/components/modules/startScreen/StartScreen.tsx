import React from 'react';
import {useSelector} from 'react-redux';
import {setTestData} from '@reducers/testData/dispatchers';
import {Button} from '@components/elements/button';
import {LocalizedText} from '@components/elements/localizedText';
import {tasks} from './tasks';
import styles from './styles.scss';

export const StartScreen = () => {
    const isFirstTime = useSelector((state:any) => state.studentData.isFirstTime);

    const startTest = (option) => {
        setTestData({isTestStarted: true, option: option, tasks: tasks[option]});
    };

    return <div className={styles.startScreen}>
        <img src={require('_assets/img/greeting.png')} alt='greeting' className={styles.greetingImg}/>
        <div className={styles.info}>
            <div className={styles.titleWrap}>
                <h3 className={styles.title}>
                    <LocalizedText name={`greeting.title.${isFirstTime ? 'firstTime' : 'common'}`} path={'translation'}/>
                </h3>
                {isFirstTime && <img src={require('_assets/img/gift.png')} alt='gift'/>}
            </div>
            <p className={styles.text}>
                <LocalizedText name={`greeting.description.${isFirstTime ? 'firstTime' : 'common'}`} path={'translation'}/>
            </p>
            <h4 className={styles.startTest}>
                <LocalizedText name={'greeting.startTest'} path={'translation'}/>
            </h4>
            <div className={styles.ageBtnWrapper}>
                {options.map(option => <Button
                    key={option}
                    className={styles.ageBtn}
                    onClick={() => startTest(option)}
                >
                    <LocalizedText name={'greeting.childrenFrom'} path={'translation'}/>
                    <LocalizedText name={`greeting.${option}`} path={'translation'}/>
                </Button>)}
            </div>
        </div>
    </div>;
};

const options = ['sixToTen', 'elevenToFourteen'];