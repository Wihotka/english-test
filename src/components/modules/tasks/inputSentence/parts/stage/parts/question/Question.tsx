import React, {useState, useEffect} from 'react';
import {setTaskStatus, setTaskDone} from '@reducers/testData/dispatchers';
import {Input} from '@components/elements/input';
import styles from './styles.scss';

export const Question = ({
    task,
    question,
    questionIndex,
    currentAnswer,
    questionsDone,
    questionsStatus
}) => {
    const inputGaps:string[] = question.inputs;
    const correctAnswer:string = question.correctAnswer;
    const defaultQuestionAnswers = currentAnswer[questionIndex]
        ? currentAnswer[questionIndex].split(' / ') : new Array(inputGaps.length).fill('');
    const [questionAnswer] = useState<string[]>(defaultQuestionAnswers);

    const checkIsDone = () => {
        if (!questionAnswer.includes(''))
            questionsDone[questionIndex] = true;
        else questionsDone[questionIndex] = false;
    };
    
    const checkIsCorrect = () => {
        if (questionAnswer.join(' / ').toLowerCase() === correctAnswer.toLowerCase())
            questionsStatus[questionIndex] = true;
        else questionsStatus[questionIndex] = false;
};

    //Проверяем дефолтные значения
    useEffect(() => {
        checkIsDone();
        checkIsCorrect();
    }, []);

    return <div key={questionIndex} className={styles.questionWrapper}>
        <span className={styles.question}>{question.text}</span>
        <div className={styles.inputsWrapper}>
            {inputGaps.map((inputGap, inputIndex) => {
                const handleChange = (inputText) => {
                    //Убираем лишние пробельные символы
                    inputText = inputText.replace(/\s+/g, ' ').trim();
                    //Получаем введенный текс
                    questionAnswer[inputIndex] = inputText;
                    //Добавляем ответ в массив ответов
                    currentAnswer[questionIndex] = questionAnswer.join(' / ');
                    //Помечаем выполненные вопросы и проверяем правильный ответ
                    checkIsDone();
                    checkIsCorrect();
                    //Сохраняем данные в стор
                    if (!questionsDone.includes(false))
                        setTaskDone({key: task.id, done: true, value: currentAnswer});
                    else setTaskDone({key: task.id, done: false, value: currentAnswer});
                    if (!questionsStatus.includes(false))
                        setTaskStatus({key: task.id, status: true});
                    else setTaskStatus({key: task.id, status: false});
                };

                return <Input
                    key={inputIndex}
                    className={styles.input}
                    onChange={handleChange}
                    value={defaultQuestionAnswers[inputIndex]}
                    upperFirstLetter={inputIndex === 0}
                />;
            })}
        </div>
    </div>;
};