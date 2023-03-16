import React from 'react';
import {useSelector} from 'react-redux';
import {StageT} from '@components/types';
import {RadioButtons} from '@components/elements/radioButton';
import {setTaskStatus, setTaskDone} from '@reducers/testData/dispatchers';
import styles from './styles.scss';

interface P {
    stage:StageT;
}

export const TrueOrFalse = ({stage}:P) => {
    const testData = useSelector((state:any) => state.testData);
    const {subject, option, tasksProgress} = testData;

    return <div className={styles.trueOrFalse}>
        {stage.tasks.map(task => {
            const questions:any[] = task.option[option].questions;
            const imgPath = task.option[option].img[0];

            return <div key={task.id} className={styles.task}>
                <span className={styles.taskNumber}>{task.id}.</span>
                <img src={require(`_assets/img/tasks/${subject}/${imgPath}`)} alt='sign' className={styles.taskImg}/>
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

                            let score = 0;

                            for (let i = 0; i < checkedAnswers.length; i++) {
                                if (checkedAnswers[i] && checkedAnswers[i].toLowerCase() === correctAnswers[i].toLowerCase()) ++score;
                            }

                            //Сравниваем результаты
                            const isEqual = JSON.stringify(checkedAnswers) === JSON.stringify(correctAnswers);

                            if (isEqual) setTaskStatus({key: task.id, status: true, score: score});
                            else setTaskStatus({key: task.id, status: false, score: score});
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