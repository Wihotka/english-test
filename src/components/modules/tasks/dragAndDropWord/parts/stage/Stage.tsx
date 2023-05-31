import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDrag} from 'react-dnd';
import classNames from 'classnames';

import {setTaskStatus} from '@reducers/testData/dispatchers';
import {DndAnswer, DragWordI} from './parts';
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

const DragWord = ({word, id, answers, setAnswer}:DragWordI) => {
    const [isDropped, setIsDropped] = useState<boolean>(answers && answers.includes(word) ? true : false);

    const [{isDragging}, drag] = useDrag(() => ({
        type: 'word',
        item: {
            id: id
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        end(_draggedItem, monitor) {
            setIsDropped(monitor.didDrop());
            if (setAnswer && monitor.didDrop()) setAnswer(null);
        },
    }), [id]);

    return <div
        ref={drag}
        className={classNames(
            styles.dragWord,
            isDragging && styles.dragWordDragging,
            isDropped && styles.dragWordDropped
        )}
    >{word}</div>;
};