import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {setTaskStatus} from '@reducers/testData/dispatchers';
import {DndAnswer, DragWord} from './parts';
import styles from './styles.scss';

export const Stage = ({task}) => {
    const testData = useSelector((state:any) => state.testData);
    const {subject, test, option, tasksProgress} = testData;
    const words:any[] = task.option[option].words;
    const correctAnswer:string[] = task.option[option].correctAnswer;
    const currentAnswer:string[] = [...tasksProgress[+task.id - 1].currentAnswer];

    useEffect(() => {
        //Сравниваем результаты
        const isEqual = JSON.stringify(currentAnswer) === JSON.stringify(correctAnswer);
        let score = 0;

        for (let i = 0; i < currentAnswer.length; i++) {
            if (currentAnswer[i] && currentAnswer[i].toLowerCase() === correctAnswer[i].toLowerCase()) ++score;
        }

        if (isEqual) setTaskStatus({key: task.id, status: true, score: score});
        else setTaskStatus({key: task.id, status: false, score: score});
    }, [currentAnswer]);

    return <div key={task.id} className={styles.task}>
        <span className={styles.taskNumber}>{task.id}.</span>
        <div className={styles.dropCellsContainer}>
            {words.map((word, index) => {
                return <div key={index} className={styles.dropCellWrapper}>
                    <div className={styles.imgWrapper}>
                        <img
                            src={require(`_assets/img/tasks/${subject}/${test}/${word.img}`)}
                            alt='image'
                            className={styles.image}
                        />
                    </div>
                    <DndAnswer
                        words={words}
                        answers={currentAnswer}
                        taskId={task.id}
                        wordIndex={index}
                    />
                </div>;
            })}
        </div>
        <div className={styles.dragWordsContainer}>
            {words.map((word, index) => {
                return <DragWord
                    key={index}
                    word={word.word}
                    answers={currentAnswer}
                    id={index}
                />;
            })}
        </div>
    </div>; 
};
