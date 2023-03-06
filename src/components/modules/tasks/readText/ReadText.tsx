import React from 'react';
import {useSelector} from 'react-redux';
import {StageT} from '@components/types';
import {RadioButtons} from '@components/elements/radioButton';
import {setTaskStatus, setTaskDone} from '@reducers/testData/dispatchers';
import styles from './styles.scss';

interface P {
    stage:StageT;
}

export const ReadText = ({stage}:P) => {
    const testData = useSelector((state:any) => state.testData);
    const {option, tasks} = testData;

    return <div className={styles.readText}>
        {stage.tasks.map(task => {
            const questions:any[] = task.option[option].questions;
            const text:string[] = task.option[option].text;

            return <div key={task.id} className={styles.task}>
                <span className={styles.taskNumber}>{task.id}.</span>
                <div className={styles.taskText}>
                    {text.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
                <div className={styles.questionsWrapper}>
                    {questions.map((question, index) => {
                        const labels = question.labels;

                        const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
                            const checkedAnswers = [...tasks[+task.id - 1].currentAnswer];
                            checkedAnswers[index] = e.target.value;
                            const correctAnswers = questions.map(question => question.correctAnswer);

                            if (!checkedAnswers.includes(undefined) && checkedAnswers.length >= questions.length)
                                setTaskDone({key: task.id, done: true, value: checkedAnswers});
                            else
                                setTaskDone({key: task.id, done: false, value: checkedAnswers});

                            //Сравниваем результаты
                            const isEqual = JSON.stringify(checkedAnswers) === JSON.stringify(correctAnswers);

                            if (isEqual) setTaskStatus({key: task.id, status: true});
                            else setTaskStatus({key: task.id, status: false});
                        };
                        
                        return <div key={index} className={styles.questionWrapper}>
                            <span className={styles.question}>{question.text}</span>
                            <RadioButtons
                                options={labels}
                                onChange={handleChange}
                                stageId={+task.id}
                                questionId={index}
                            />
                        </div>;
                    })}
                </div>
            </div>;
        })}
    </div>;
};