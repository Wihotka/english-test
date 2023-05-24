import React from 'react';
import {useSelector} from 'react-redux';
import {StageT} from '@components/types';
import {RadioButtons} from '@components/elements/radioButton';
import {setTaskStatus, setTaskDone} from '@reducers/testData/dispatchers';
import styles from './styles.scss';

interface P {
    stage:StageT;
}

export const LookAndChoose = ({stage}:P) => {
    const testData = useSelector((state:any) => state.testData);
    const {subject, test, option} = testData;

    return <div className={styles.lookAndChoose}>
        {stage.tasks.map(task => {
            const imgPath = task.option[option].img[0];
            const labels = task.option[option].labels;
            //Поскольку в задании 1 вопрос, то id вопроса задаем статично
            const questionId = 0;

            const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
                const checkedAnswer = e.target.value;
                const correctAnswer = task.option[option].correctAnswer;

                setTaskDone({key: task.id, done: true, value: [checkedAnswer]});

                if (checkedAnswer === correctAnswer) setTaskStatus({key: task.id, status: true, score: 1});
                else setTaskStatus({key: task.id, status: false, score: 0});
            };

            return <div key={task.id} className={styles.task}>
                <span className={styles.taskNumber}>{task.id}.</span>
                <img src={require(`_assets/img/tasks/${subject}/${test}/${imgPath}`)} alt='task' className={styles.taskImg}/>
                <div className={styles.radioBtns}>
                    <RadioButtons
                        options={labels}
                        onChange={handleChange}
                        stageId={+task.id}
                        questionId={questionId}
                    />
                </div>
            </div>;
        })}
    </div>;
};