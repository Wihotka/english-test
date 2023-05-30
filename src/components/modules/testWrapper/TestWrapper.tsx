import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import i18n from 'i18next';
import {lowerFirst} from 'lodash';
import classNames from 'classnames';

import {LocalizedText} from '@components/elements/localizedText';
import {TaskProgressT, UrlParamsT} from '@components/types';
import {setTestData, setStage, setTestLang} from '@reducers/testData/dispatchers';
import {Stage} from './parts';
import styles from './styles.scss';

interface P {
    tasks:TaskProgressT[];
    stages:any;
}

export const TestWrapper = ({tasks, stages}:P) => {
    const langCode = useSelector((state:any) => state.commonData?.settings?.langCode);
    const testLang = useSelector((state:any) => state.testData?.testLang);
    const {subject, test} = useParams<UrlParamsT>();
    //Подсчитываем число ответов
    const doneTasks = tasks.filter(task => task.done).length;

    const [currentStage, setCurrentStage] = useState<number>(1);
    const taskElement = useRef(null);
    //Выбираем тему из tasks для дальнейшего выбора нужной локализации
    const questionTheme = lowerFirst(stages[currentStage].theme);

    //Позиционируем скролл в начало для каждого этапа
    useEffect(() => {
        setStage(currentStage);
        taskElement.current.scrollTop = 0;
    }, [currentStage]);

    const switchQuestionLang = async () => {
        if (langCode !== 'uk') {
            switch (testLang) {
                case 'uk':
                    setTestLang(langCode);
                    await i18n.changeLanguage(langCode);
                    break;
                default:
                    setTestLang('uk');
                    await i18n.changeLanguage('uk');
                    break;
            }
        }
    };

    return <div className={styles.testWrapper}>
        <div className={styles.questionWrapper}>
            <div className={styles.question}>
                <LocalizedText name={`tasks.${questionTheme}`} path={`${subject}/${test}/translation`}/>
            </div>
            <button className={classNames(langCode === 'uk' && styles.disabledLangBtn)} onClick={switchQuestionLang}>
                <img src={require(`_assets/img/lang/${testLang ?? 'uk'}.svg`)} alt='lang' className={styles.lang}/>
            </button>
            <div className={styles.doneTasks}>
                <LocalizedText name={'tasks.done'} path={`${subject}/${test}/translation`}/>
                <span> {doneTasks}/{tasks.length}</span>
            </div>
        </div>
        <div ref={taskElement} className={styles.task}>
            <Stage
                stages={stages}
                stage={stages[currentStage]}
                doneTasks={doneTasks}
                setTestData={setTestData}
                setStage={setCurrentStage}
            />
        </div>
    </div>;
};