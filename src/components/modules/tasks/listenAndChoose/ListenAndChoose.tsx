import React from 'react';
import {useSelector} from 'react-redux';
import {StageT} from '@components/types';
import {RadioButtons} from '@components/elements/radioButton';
import {BtnPlayGroup} from '@components/elements/btnPlay';
import {setTaskStatus, setTaskDone} from '@reducers/testData/dispatchers';
import styles from './styles.scss';

interface P {
    stage:StageT;
}

export const ListenAndChoose = ({stage}:P) => {
    const testData = useSelector((state:any) => state.testData);
    const {subject, test, option} = testData;

    return <div className={styles.listenAndChoose}>
        {stage.tasks.map(task => {
            const question:string = task.option[option].question;
            const labels:any[] = task.option[option].labels;
            //Поскольку в задании 1 вопрос, то id вопроса задаем статично
            const questionId = 0;

            const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
                const checkedAnswer = e.target.value;
                const correctAnswer = task.option[option].correctAnswer;

                setTaskDone({key: task.id, done: true, value: [checkedAnswer]});

                if (checkedAnswer === correctAnswer) setTaskStatus({key: task.id, status: true, score: 1});
                else setTaskStatus({key: task.id, status: false, score: 0});
            };

            const soundUrl = `${subject}/${test}/${option}`;

            return <div key={task.id} className={styles.task}>
                <span className={styles.taskNumber}>{task.id}.</span>
                {option === 'sixToTen'
                    ? <div className={styles.questionFiguresWrapper}>
                        <BtnPlayGroup
                            soundUrl={soundUrl}
                            audioFile={`task${task.id}`}
                            type={'play'}
                        />
                        <RadioButtons
                            options={labels}
                            onChange={handleChange}
                            stageId={+task.id}
                            questionId={questionId}
                            imgLabels
                        />
                    </div>
                    : <div className={styles.questionWrapper}>
                        <BtnPlayGroup
                            soundUrl={soundUrl}
                            audioFile={`task${task.id}`}
                            type={'play'}
                        />
                        <span className={styles.question}>{question}</span>
                        <RadioButtons
                            options={labels}
                            onChange={handleChange}
                            stageId={+task.id}
                            questionId={questionId}
                        />
                    </div>
                }
            </div>;
        })}
    </div>;
};