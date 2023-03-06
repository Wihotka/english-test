import React from 'react';
import {setTestData} from '@reducers/testData/dispatchers';
import {Button} from '@components/elements/button';
import {LocalizedText} from '@components/elements/localizedText';
import {tasks} from './tasks';
import styles from './styles.scss';

export const StartScreen = () => {
    const startTest = (option) => {
        setTestData({isTestStarted: true, option: option, tasks: tasks[option]});
    };

    return <div className={styles.startScreen}>
        <img src={require('_assets/img/greeting.png')} alt='greeting' className={styles.greetingImg}/>
        <div className={styles.info}>
            <h3 className={styles.title}>
                <LocalizedText name={'greeting.title'} path={'translation'}/>
            </h3>
            <p className={styles.text}>
                <LocalizedText name={'greeting.description'} path={'translation'}/>
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