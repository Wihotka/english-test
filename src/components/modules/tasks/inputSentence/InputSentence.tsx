import React from 'react';
import {useSelector} from 'react-redux';
import {StageT} from '@components/types';
import {Stage} from './parts';
import styles from './styles.scss';

interface P {
    stage:StageT;
}

export const InputSentence = ({stage}:P) => {
    const testData = useSelector((state:any) => state.testData);
    const {option, tasks} = testData;

    return <div className={styles.inputSentence}>
        {stage.tasks.map((task, index) => <Stage
            key={index}
            task={task}
            option={option}
            tasks={tasks}
        />)}
    </div>;
};