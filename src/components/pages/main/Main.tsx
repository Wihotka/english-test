import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {setCommonData} from '@reducers/commonData/dispatchers';
import {StartScreen} from '@components/modules/startScreen';
import {FinishScreen} from '@components/modules/finishScreen';
import {TestWrapper} from '@components/modules/testWrapper';
import styles from './styles.scss';

export const Main = () => {
    const testData = useSelector((state:any) => state.testData);
    const {isTestStarted, isTestFinished, tasks} = testData;

    //API
    useEffect(() => {
        let isSubscribed = true;

        if (isSubscribed) {
            setCommonData({langCode: 'ru'});
        }

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
                    ? <TestWrapper tasks={tasks}/>
                    : <FinishScreen/>
            }
        </div>
    </div>;
};