import React, {useState, useEffect, useRef} from 'react';
import {setTestData, setStage} from '@reducers/testData/dispatchers';
import {Stage} from './parts';
import {stages} from './utils/stagesData';
import styles from './styles.scss';

type Task = {
    status:boolean;
    done:boolean;
};

interface P {
    tasks:Task[];
}

export const TestWrapper = ({tasks}:P) => {
    //Подсчитываем число ответов
    const doneTasks = tasks.filter(task => task.done).length;

    const [currentStage, setCurrentStage] = useState<number>(1);
    const taskElement = useRef(null);

    //Позиционируем скролл в начало для каждого этапа
    useEffect(() => {
        setStage(currentStage);
        taskElement.current.scrollTop = 0;
    }, [currentStage]);

    return <div className={styles.testWrapper}>
        <div className={styles.questionWrapper}>
            <span className={styles.question}>{stages[currentStage].question}</span>
            <button>
                <img src={require('_assets/img/lang/ru.svg')} alt='lang' className={styles.lang}/>
            </button>
            <span className={styles.doneTasks}>{`Done ${doneTasks}/${tasks.length}`}</span>
        </div>
        <div ref={taskElement} className={styles.task}>
            <Stage
                stage={stages[currentStage]}
                doneTasks={doneTasks}
                setTestData={setTestData}
                setStage={setCurrentStage}
            />
        </div>
    </div>;
};