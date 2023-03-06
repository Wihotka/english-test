import React, {useState} from 'react';
import {Question} from './parts';
import styles from './styles.scss';

export const Stage = ({task, option, tasks}) => {
    const questions:any[] = task.option[option].questions;
    const currentAnswer:string[] = [...tasks[+task.id - 1].currentAnswer];
    const [questionsDone] = useState<boolean[]>([]);
    const [questionsStatus] = useState<boolean[]>([]);

    return <div key={task.id} className={styles.task}>
        <span className={styles.taskNumber}>{task.id}.</span>
        <div className={styles.questionsWrapper}>
            {questions.map((question, questionIndex) => <Question
                key={questionIndex}
                task={task}
                question={question}
                questionIndex={questionIndex}
                currentAnswer={currentAnswer}
                questionsDone={questionsDone}
                questionsStatus={questionsStatus}
            />)}
        </div>
    </div>;
};