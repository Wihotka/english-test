import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {useSelector} from 'react-redux';

import {UrlParamsT} from '@components/types';
import {LocalizedText} from '@components/elements/localizedText';
import {UserForm, UserResults} from './parts';
import styles from './styles.scss';

type UserData = {
    username:string;
    tel:string;
    email:string;
};

export const FinishScreen = () => {
    const {tasksProgress} = useSelector((state:any) => state.testData);

    const [finalScore, setFinalScore] = useState<number>(0);
    const [userData, setUserData] = useState<UserData>({username: '', tel: '', email: ''});
    const [isFormSent, setIsFormSent] = useState<boolean>(false);

    const {source} = useParams<UrlParamsT>();
    const isStudentFromPlatform = source === 'platform';

    // Подсчет итогового кол-ва баллов
    useEffect(() => {
        let score = 0;
        tasksProgress.forEach(task => score += task.score);

        setFinalScore(score);
    }, []);

    return <div className={styles.finishScreen}>
        {isStudentFromPlatform
            ? <UserResults source={source} finalScore={finalScore} user={userData}/>
            : isFormSent
                ? <UserResults source={source as 'website'} finalScore={finalScore} user={userData}/>
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