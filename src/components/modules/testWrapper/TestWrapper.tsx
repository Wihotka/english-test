import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {setTestData, setStage} from '@reducers/testData/dispatchers';
import {Stage} from './parts';
import styles from './styles.scss';

type TaskProgressT = {
    status:boolean;
    done:boolean;
};

interface P {
    tasks:TaskProgressT[];
    stages:any;
}

export const TestWrapper = ({tasks, stages}:P) => {
    const langCode = useSelector((state:any) => state.commonData.langCode);
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
                <img src={require(`_assets/img/lang/${langCode}.svg`)} alt='lang' className={styles.lang}/>
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