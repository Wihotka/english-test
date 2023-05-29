import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {lowerFirst} from 'lodash';

import {LocalizedText} from '@components/elements/localizedText';
import {TaskProgressT, UrlParamsT} from '@components/types';
import {setTestData, setStage} from '@reducers/testData/dispatchers';
import {Stage} from './parts';
import styles from './styles.scss';

interface P {
    tasks:TaskProgressT[];
    stages:any;
}

export const TestWrapper = ({tasks, stages}:P) => {
    const langCode = useSelector((state:any) => state.commonData?.settings?.langCode);
    const {subject, test} = useParams<UrlParamsT>();
    //Подсчитываем число ответов
    const doneTasks = tasks.filter(task => task.done).length;

    const [currentStage, setCurrentStage] = useState<number>(1);
    const taskElement = useRef(null);
    //Выбираем тему из tasks для дальнейшего выбора нужной локализации
    const questionTheme = lowerFirst(stages[currentStage].theme);

    //Позиционируем скролл в начало для каждого этапа
    useEffect(() => {
        setStage(currentStage);
        taskElement.current.scrollTop = 0;
    }, [currentStage]);

    return <div className={styles.testWrapper}>
        <div className={styles.questionWrapper}>
            <div className={styles.question}>
                <LocalizedText name={`tasks.${questionTheme}`} path={`${subject}/${test}/translation`}/>
            </div>
            <button>
                <img src={require(`_assets/img/lang/${langCode ?? 'uk'}.svg`)} alt='lang' className={styles.lang}/>
            </button>
            <span className={styles.doneTasks}>{`Done ${doneTasks}/${tasks.length}`}</span>
        </div>
        <div ref={taskElement} className={styles.task}>
            <Stage
                stages={stages}
                stage={stages[currentStage]}
                doneTasks={doneTasks}
                setTestData={setTestData}
                setStage={setCurrentStage}
            />
        </div>
    </div>;
};