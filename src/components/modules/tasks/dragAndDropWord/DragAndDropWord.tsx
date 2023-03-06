import React from 'react';
import {StageT} from '@components/types';
import {Stage} from './parts';
import styles from './styles.scss';

interface P {
    stage:StageT;
}

export const DragAndDropWord = ({stage}:P) => <div className={styles.dragAndDropWord}>
    {stage.tasks.map((task, index) => <Stage key={index} task={task}/>)}
</div>;