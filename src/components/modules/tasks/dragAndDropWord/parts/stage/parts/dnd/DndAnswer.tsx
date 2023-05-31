import React, {useState, useEffect} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import classNames from 'classnames';

import {setTaskDone} from '@reducers/testData/dispatchers';
import styles from './styles.scss';

interface DragWordI {
    word:string;
    id:number;
    answers?:string[];
    setAnswer?:React.Dispatch<React.SetStateAction<string | null>>;
}

export const DndAnswer = ({words, answers, taskId, wordIndex}) => {
    const [answer, setAnswer] = useState<string>();
    const [id, setId] = useState<number>();
    const currentAnswers = [...answers];

    useEffect(() => {
        setAnswer(answers[wordIndex]);
    }, []);

    //Проверка верных ответов
    useEffect(() => {
        if (answer) {
            currentAnswers[wordIndex] = answer;
            answers = [...currentAnswers];

            if (!answers.includes(null || undefined) && answers.length >= words.length)
                setTaskDone({key: taskId, done: true, value: answers});
            else setTaskDone({key: taskId, done: false, value: answers});
        } else if (answer === null) {
            answers[wordIndex] = answer;
            setTaskDone({key: taskId, done: false, value: answers});
        }
    }, [answer]);

    return <>
        {answer
            ? <DragWord
                word={answer}
                id={id}
                setAnswer={setAnswer}
            />
            : <DropCell
                words={words}
                setAnswer={setAnswer}
                setId={setId}
            />
        }
    </>;
};

const DropCell = ({words, setAnswer, setId}) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'word',
        drop: (item:any) => {
            addWord(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const addWord = (item) => {
        setAnswer(words[item.id].word);
        setId(item.id);
    };

    return <div
        ref={drop}
        className={classNames(
            styles.dropCell,
            isOver && styles.dropCellOver
        )}
    />;
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