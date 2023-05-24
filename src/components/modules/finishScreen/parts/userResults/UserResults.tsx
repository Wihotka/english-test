import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {PDFDownloadLink} from '@react-pdf/renderer';

import config from '@config';
import {ApiActions, ApiConnector} from '@lib/apiConnector';
import {getSubjectID} from '@lib/getSubjectID';
import {LocalizedText} from '@components/elements/localizedText';
import {PdfResults} from './parts';
import styles from './styles.scss';

type UserData = {
    username:string;
    tel:string;
    email:string;
};

type PostData = {
    subject:string;
    test:string;
    source:'platform'|'website';
    testSubcategory:string;
    wrongAnswers:number[];
    score:number;
    maxScore:number;
    user:UserData;
};

interface IUserResults {
    source:'platform'|'website';
    finalScore:number;
    maxScore:number;
    user:UserData;
}

export const UserResults = ({source, finalScore, maxScore, user}:IUserResults) => {
    const {authorized, enrolledOnCourse} = useSelector((state:any) => state.commonData);
    const {subject, test, option, tasksData, tasksProgress} = useSelector((state:any) => state.testData);

    const redirectUrl = source === 'platform' ? config.personalTests : config.website;
    const isFirstTime = authorized ? !enrolledOnCourse : true;
    const tasksWithRightAnswers = tasksProgress.filter(task => task.status);
    const tasksWithWrongAnswers = tasksProgress.map((task, index) => {
        if (!task.status) return index + 1;

        return null;
    }).filter(task => task) as number[];

    // TODO Отправка данных
    useEffect(() => {
        let isSubscribed = true;

        const resultData:PostData = {
            subject: subject,
            test: test,
            source: source,
            testSubcategory: option,
            wrongAnswers: tasksWithWrongAnswers,
            score: finalScore,
            maxScore: maxScore,
            user: user
        };

        const subjectID = getSubjectID(source);

        const data = {
            action: ApiActions.sendData,
            params: {
                subjectID
            },
            postParams: {
                resultData
            }
        };

        ApiConnector.request(data).then((response) => {
            if (isSubscribed) {
                if (response.status) {
                    console.log('Success');
                } else {
                    setTimeout(() => {
                        location.href = config.personalCabinet;
                    }, 1500);
                }
            }
        });

        return () => {
            isSubscribed = false;
        };
    }, []);

    return <div className={styles.currentUserContent}>
        <h3 className={styles.title}>
            <LocalizedText name={'form.title'} path={'translation'}/>
        </h3>
        <div className={styles.infoPlatform}>
            {source === 'platform' && <img src={require('_assets/img/mail.png')} alt='mail'/>}
            <p className={styles.text}>
                {source === 'platform'
                    ? isFirstTime 
                        ? <LocalizedText name={'form.description.platformWithGift'} path={'translation'}/>
                        : <LocalizedText name={'form.description.platform'} path={'translation'}/>
                    : <LocalizedText name={'form.description.website'} path={'translation'}/>
                }
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
            <PDFDownloadLink
                className={styles.downloadBtn}
                document={<PdfResults
                    finalScore={finalScore}
                    tasks={tasksData}
                    progress={tasksProgress}
                    subject={subject}
                    test={test}
                    option={option}
                />}
                fileName='results.pdf'
            >
                {({loading}) => (loading
                    ? <LocalizedText name={'buttons.loading'} path={'translation'}/> 
                    : <LocalizedText name={'buttons.download'} path={'translation'}/> 
                )}
            </PDFDownloadLink>
            <a href={redirectUrl} className={styles.okBtn}>
                <LocalizedText name={'buttons.ok'} path={'translation'}/>
            </a>
        </div>
    </div>;
};