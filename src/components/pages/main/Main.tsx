import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
import classNames from 'classnames';

import {UrlParamsT} from '@components/types';
import config from '@config';
import {ApiActions, ApiConnector} from '@lib/apiConnector';
import {getSubjectID} from '@lib/getSubjectID';
import {StartScreen} from '@components/modules/startScreen';
import {FinishScreen} from '@components/modules/finishScreen';
import {TestWrapper} from '@components/modules/testWrapper';
import styles from './styles.scss';

export const Main = () => {
    const testData = useSelector((state:any) => state.testData);
    const {isTestStarted, isTestFinished, tasksData, tasksProgress} = testData;

    const {subject, source} = useParams<UrlParamsT>();

    //API
    useEffect(() => {
        let isSubscribed = true;

        const subjectID = getSubjectID(subject);

        const data = {
            action: ApiActions.getData,
            params: {
                subjectID
            }
        };

        ApiConnector.request(data).then((response) => {
            if (isSubscribed) {
                if (response.status) {
                    console.log('Success');
                } else {
                    setTimeout(() => {
                        if (source === 'platform') location.href = config.personalTests;
                        else location.href = config.website;
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