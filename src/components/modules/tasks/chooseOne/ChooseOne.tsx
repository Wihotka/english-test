import React from 'react';
import {useSelector} from 'react-redux';
import {StageT} from '@components/types';
import {RadioButtons} from '@components/elements/radioButton';
import {setTaskStatus, setTaskDone} from '@reducers/testData/dispatchers';
import styles from './styles.scss';

interface P {
    stage:StageT;
}

export const ChooseOne = ({stage}:P) => {
    const testData = useSelector((state:any) => state.testData);
    const {option, tasksProgress} = testData;

    return <div className={styles.chooseOne}>
        {stage.tasks.map(task => {
            const questions:any[] = task.option[option].questions;

            return <div key={task.id} className={styles.task}>
                <span className={styles.taskNumber}>{task.id}.</span>
                <div className={styles.questionsWrapper}>
                    {questions.map((question, index) => {
                        const labels = question.labels;

                        const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
                            const checkedAnswers = [...tasksProgress[+task.id - 1].currentAnswer];
                            checkedAnswers[index] = e.target.value;
                            const correctAnswers = questions.map(question => question.correctAnswer);

                            if (!checkedAnswers.includes(undefined) && checkedAnswers.length >= questions.length)
                                setTaskDone({key: task.id, done: true, value: checkedAnswers});
                            else
                                setTaskDone({key: task.id, done: false, value: checkedAnswers});

                            //Сравниваем результаты
                            const isEqual = JSON.stringify(checkedAnswers) === JSON.stringify(correctAnswers);
                            let score = 0;

                            for (let i = 0; i < checkedAnswers.length; i++) {
                                if (checkedAnswers[i] && checkedAnswers[i].toLowerCase() === correctAnswers[i].toLowerCase()) ++score;
                            }

                            if (isEqual) setTaskStatus({key: task.id, status: true, score: score});
                            else setTaskStatus({key: task.id, status: false, score: score});
                        };
                        
                        return <div key={index} className={styles.questionWrapper}>
                            <span className={styles.question}>
                                {question.text.includes('___')
                                    ? <EmptyBlockText text={question.text}/>
                                    : question.text}
                            </span>
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

const EmptyBlockText = ({text}) => {
    const textArr = text.split('___');

    return <div className={styles.emptyQuestion}>
        {textArr[0]}<div className={styles.emptyBlock}/>{textArr[1]}
    </div>;
};