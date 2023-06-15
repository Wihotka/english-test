import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {useSelector} from 'react-redux';

import {UrlParamsT, UserDataT} from '@components/types';
import {LocalizedText} from '@components/elements/localizedText';
import {UserForm, UserResults, UserError} from './parts';
import styles from './styles.scss';

export const FinishScreen = () => {
    const {authorized} = useSelector((state:any) => state.commonData);
    const {tasksData, tasksProgress, option} = useSelector((state:any) => state.testData);

    const [finalScore, setFinalScore] = useState<number>(0);
    const [maxScore, setMaxScore] = useState<number>(0);
    const [userData, setUserData] = useState<UserDataT>({username: '', tel: '', email: ''});
    const [isFormSent, setIsFormSent] = useState<boolean>(false);
    const [isFailedDataSending, setIsFailedDataSending] = useState<boolean>(false);
    const [failedAttempts, setFailedAttempts] = useState<number>(0);

    const {source} = useParams<UrlParamsT>();

    // Подсчет итогового кол-ва баллов
    useEffect(() => {
        let score = 0;
        let maxScore = 0;

        tasksProgress.forEach(task => score += task.score);
        Object.values(tasksData).forEach((task:any) => maxScore += +task.maxScore[option]);

        setFinalScore(score);
        setMaxScore(maxScore);
    }, []);

    return <div className={styles.finishScreen}>
        {isFailedDataSending
            ? <UserError
                source={source}
                finalScore={finalScore}
                maxScore={maxScore}
                user={userData}
                setIsFailedDataSending={setIsFailedDataSending}
                failedAttempts={failedAttempts}
                setFailedAttempts={setFailedAttempts}
            />
            : authorized
                ? <UserResults
                    source={source}
                    finalScore={finalScore}
                    maxScore={maxScore}
                    user={userData}
                    setIsFailedDataSending={setIsFailedDataSending}
                    failedAttempts={failedAttempts}
                    setFailedAttempts={setFailedAttempts}
                />
                : isFormSent
                    ? <UserResults
                        source={source}
                        finalScore={finalScore}
                        maxScore={maxScore}
                        user={userData}
                        setIsFailedDataSending={setIsFailedDataSending}
                        failedAttempts={failedAttempts}
                        setFailedAttempts={setFailedAttempts}
                    />
                    : <div className={styles.newUserContent}>
                        <img src={require('_assets/img/greeting.png')} alt='greeting' className={styles.greetingImg}/>
                        <div className={styles.infoNew}>
                            <h3 className={styles.title}>
                                <LocalizedText name={'form.title'} path={'translation'}/>
                            </h3>
                            <p className={styles.text}>
                                <LocalizedText name={'form.description.new'} path={'translation'}/>
                            </p>
                            <UserForm
                                setUserData={setUserData}
                                setIsFormSent={setIsFormSent}
                            />
                        </div>
                    </div>
        }
    </div>;
};