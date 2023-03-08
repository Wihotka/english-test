import React from 'react';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import {Button} from '@components/elements/button';
import {LocalizedText} from '@components/elements/localizedText';
import * as Tasks from '@modules/tasks';
import {StageT} from '@components/types';
import styles from './styles.scss';

interface P {
    stages:any,
    stage:StageT;
    doneTasks:number;
    setTestData:React.Dispatch<React.SetStateAction<any>>;
    setStage:React.Dispatch<React.SetStateAction<number>>;
}

export const Stage = ({stages, stage, doneTasks, setTestData, setStage}:P) => {
    //Выбираем нужный модуль по теме из tasksData
    const Task = Tasks[stage.theme];

    const backClick = () => setStage(state => state > 1 ? --state : state);
    const nextClick = () => setStage(state => state < Object.values(stages).length ? ++state : state);
    const finishClick = () => setTestData({isTestFinished: true});

    return <div className={styles.taskWrapper}>
        <Task stage={stage}/>
        <div className={styles.btnWrapper}>
            <Button
                className={classNames(styles.btn, +stage.id <= 1 && styles.btnDisabled)}
                disabled={+stage.id <= 1}
                onClick={backClick}
            >
                <LocalizedText name={'buttons.back'} path={'translation'}/>
            </Button>
            <div data-tip data-for='tooltip'>
                <Button
                    className={classNames(
                        styles.btn,
                        styles.btnNext,
                        +stage.id >= Object.values(stages).length && !doneTasks && styles.btnDisabled
                    )}
                    disabled={+stage.id >= Object.values(stages).length && !doneTasks}
                    onClick={+stage.id >= Object.values(stages).length ? finishClick : nextClick}
                >
                    {+stage.id >= Object.values(stages).length
                        ? <LocalizedText name={'buttons.done'} path={'translation'}/>
                        : <LocalizedText name={'buttons.next'} path={'translation'}/>
                    }
                </Button>
                {+stage.id >= Object.values(stages).length && !doneTasks &&
                    <ReactTooltip id='tooltip' className={styles.tooltip}>
                        <LocalizedText name={'tooltip'} path={'translation'}/>
                    </ReactTooltip>
                }
            </div>
        </div>
    </div>;
};