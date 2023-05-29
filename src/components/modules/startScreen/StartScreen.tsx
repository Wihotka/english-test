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
    const {authorized, enrolledOnCourse} = useSelector((state:any) => state.commonData);
    const {subject, test} = useParams<UrlParamsT>();
    const options = config.options[subject];

    const isFirstTime = authorized ? !enrolledOnCourse : true;

    const startTest = async (option:string) => {
        const [data, progress] = await loadTasksData(subject, test);
        setTestData({subject: subject, test: test, isTestStarted: true, option: option, tasksData: data, tasksProgress: progress});
    };

    return <div className={styles.startScreen}>
        <img src={require('_assets/img/greeting.png')} alt='greeting' className={styles.greetingImg}/>
        <div className={styles.info}>
            <div className={styles.titleWrap}>
                <h3 className={styles.title}>
                    <LocalizedText name={`greeting.title.${isFirstTime ? 'firstTime' : 'common'}`} path={`${subject}/${test}/translation`}/>
                </h3>
                {isFirstTime && <img src={require('_assets/img/gift.png')} alt='gift'/>}
            </div>
            <p className={styles.text}>
                <LocalizedText name={`greeting.description.${isFirstTime ? 'firstTime' : 'common'}`} path={`${subject}/${test}/translation`}/>
            </p>
            <h4 className={styles.startTest}>
                <LocalizedText name={'greeting.startTest'} path={`${subject}/${test}/translation`}/>
            </h4>
            <div className={styles.ageBtnWrapper}>
                {options.map((option:string) => <Button
                    key={option}
                    className={styles.ageBtn}
                    onClick={() => startTest(option)}
                >
                    <LocalizedText name={'greeting.childrenFrom'} path={`${subject}/${test}/translation`}/>
                    <LocalizedText name={`greeting.${option}`} path={`${subject}/${test}/translation`}/>
                </Button>)}
            </div>
        </div>
    </div>;
};
