import React, {useState, useEffect} from 'react';
import {setTaskStatus, setTaskDone} from '@reducers/testData/dispatchers';
import {Input} from '@components/elements/input';
import styles from './styles.scss';

export const Question = ({
    task,
    questions,
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
            {inputGaps.map((_inputGap, inputIndex) => {
                const handleChange = (inputText) => {
                    //Убираем символы
                    inputText = inputText.replace(/[\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\&\@\#\%\_\=]/g, '').trim();
                    //Убираем цифры
                    inputText = inputText.replace(/[0-9]/g, '').trim();
                    //Убираем лишние пробельные символы
                    inputText = inputText.replace(/\s+/g, ' ').trim();
                    //Получаем введенный текст
                    questionAnswer[inputIndex] = inputText;
                    //Добавляем ответ в массив ответов
                    currentAnswer[questionIndex] = questionAnswer.join(' / ');
                    //Помечаем выполненные вопросы и проверяем правильный ответ
                    checkIsDone();
                    checkIsCorrect();
                    //Считаем баллы
                    let score = 0;
                    for (let i = 0; i < currentAnswer.length; i++) {
                        if (currentAnswer[i] && currentAnswer[i].toLowerCase() === questions[i].correctAnswer.toLowerCase()) ++score;
                    }
                    //Сохраняем данные в стор
                    if (!questionsDone.includes(false))
                        setTaskDone({key: task.id, done: true, value: currentAnswer});
                    else setTaskDone({key: task.id, done: false, value: currentAnswer});
                    if (!questionsStatus.includes(false))
                        setTaskStatus({key: task.id, status: true, score: score});
                    else setTaskStatus({key: task.id, status: false, score: score});
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