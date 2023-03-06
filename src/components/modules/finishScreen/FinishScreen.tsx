import React from 'react';
import {useSelector} from 'react-redux';
// import {Button} from '@components/elements/button';
import {LocalizedText} from '@components/elements/localizedText';
import {UserForm} from './parts';
import styles from './styles.scss';

export const FinishScreen = () => {
    const tasksData = useSelector((state:any) => state.testData.tasks);
    const studentFromPlatform = false; //TEST

    return <div className={styles.finishScreen}>
        {studentFromPlatform
            ? <div className={styles.currentUserContent}>
                <h3 className={styles.title}>
                    <LocalizedText name={'form.title'} path={'translation'}/>
                </h3>
            </div>
            : <div className={styles.newUserContent}>
                <img src={require('_assets/img/greeting.png')} alt='greeting' className={styles.greetingImg}/>
                <div className={styles.info}>
                    <h3 className={styles.title}>
                        <LocalizedText name={'form.title'} path={'translation'}/>
                    </h3>
                    <p className={styles.text}>
                        <LocalizedText name={'form.description.new'} path={'translation'}/>
                    </p>
                    <UserForm tasks={tasksData}/>
                </div>
            </div>
        }
    </div>;
};