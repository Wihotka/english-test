import React from 'react';
import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
import {PDFDownloadLink} from '@react-pdf/renderer';
import {UrlParamsT} from '@components/types';
import {Button} from '@components/elements/button';
import {LocalizedText} from '@components/elements/localizedText';
import {UserForm, PdfResults} from './parts';
import styles from './styles.scss';

export const FinishScreen = () => {
    const tasksProgress = useSelector((state:any) => state.testData.tasksProgress);
    const tasksWithRightAnswers = tasksProgress.filter(task => task.status);
    const {source} = useParams<UrlParamsT>();
    const isStudentFromPlatform = source === 'platform';

    return <div className={styles.finishScreen}>
        {isStudentFromPlatform
            ? <div className={styles.currentUserContent}>
                <h3 className={styles.title}>
                    <LocalizedText name={'form.title'} path={'translation'}/>
                </h3>
                <div className={styles.infoPlatform}>
                    <img src={require('_assets/img/mail.png')} alt='mail'/>
                    <p className={styles.text}>
                        <LocalizedText name={'form.description.current'} path={'translation'}/>
                    </p>
                    <h4 className={styles.subtitle}>
                        <LocalizedText name={'form.subtitle'} path={'translation'}/>
                    </h4>
                    <div className={styles.resultsWrap}>
                        <svg viewBox="0 0 148 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M137.851 10.3948C125.345 -6.50743 105.316 -0.2022 91.2544 10.9654C67.4844 29.5333 36.2151 -0.189974 12.6745 19.3446C-11.931 39.7486 2.54965 79.0914 28.3142 91.4737C80.2806 118.806 180.055 77.3993 137.851 10.3948Z" fill="#E3EEFD"/>
                        </svg>
                        <div className={styles.results}>
                            <span>{tasksWithRightAnswers.length}</span>
                            /
                            <span>{tasksProgress.length}</span>
                        </div>
                    </div>
                    <Button className={styles.btn}>
                        <LocalizedText name={'buttons.ok'} path={'translation'}/>
                    </Button>
                    <PDFDownloadLink document={<PdfResults/>} fileName='results.pdf'>
                        {({blob, url, loading, error}) => (loading ? 'Загрузка результатов...' : 'Скачать')}
                    </PDFDownloadLink>
                </div>
            </div>
            : <div className={styles.newUserContent}>
                <img src={require('_assets/img/greeting.png')} alt='greeting' className={styles.greetingImg}/>
                <div className={styles.infoNew}>
                    <h3 className={styles.title}>
                        <LocalizedText name={'form.title'} path={'translation'}/>
                    </h3>
                    <p className={styles.text}>
                        <LocalizedText name={'form.description.new'} path={'translation'}/>
                    </p>
                    <UserForm tasks={tasksProgress}/>
                </div>
            </div>
        }
    </div>;
};