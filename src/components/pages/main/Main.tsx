import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
// import md5 from 'md5';

import config from '@config';
import {ApiActions, ApiConnector} from '@lib/apiConnector';
import {StartScreen} from '@components/modules/startScreen';
import {FinishScreen} from '@components/modules/finishScreen';
import {TestWrapper} from '@components/modules/testWrapper';
import styles from './styles.scss';

export const Main = () => {
    const testData = useSelector((state:any) => state.testData);
    const {isTestStarted, isTestFinished, tasksData, tasksProgress} = testData;

    //API
    useEffect(() => {
        let isSubscribed = true;

        const subjectID = 13; // TODO динамически присваивать код
        // const token = md5(`--sp--${subjectID.toString()}--${md5(subjectID.toString())}`);

        const data = {
            action: ApiActions.getData,
            params: {
                subjectID,
                // token
            }
        };

        ApiConnector.request(data).then((response) => {
            if (isSubscribed) {
                if (response.status) {
                    console.log('Success');
                } else {
                    setTimeout(() => {
                        location.href = config.personalCabinet;
                    }, 1500);
                }
            }
        });

        return () => {
            isSubscribed = false;
        };
    }, []);

    return <div className={classNames(
        styles.mainPage,
        isTestStarted && styles.mainPageTest,
        isTestFinished && styles.mainPageFinished
    )}>
        <div className={styles.mainWrapper}>
            {!isTestStarted
                ? <StartScreen/>
                : !isTestFinished
                    ? <TestWrapper tasks={tasksProgress} stages={tasksData}/>
                    : <FinishScreen/>
            }
        </div>
    </div>;
};