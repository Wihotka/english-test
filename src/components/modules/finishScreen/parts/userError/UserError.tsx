import React from 'react';
import {useSelector} from 'react-redux';

import {UserDataT, PostDataT} from '@components/types';
import config from '@config';
import {ApiActions, ApiConnector} from '@lib/apiConnector';
import {LocalizedText} from '@components/elements/localizedText';
import {getSubjectID} from '@lib/getSubjectID';
import styles from './styles.scss';

interface IUserError {
    source:'platform'|'website';
    finalScore:number;
    maxScore:number;
    user:UserDataT;
    setIsFailedDataSending:React.Dispatch<React.SetStateAction<boolean>>;
    failedAttempts:number;
    setFailedAttempts:React.Dispatch<React.SetStateAction<number>>;
}

export const UserError = ({
    source,
    finalScore,
    maxScore,
    user,
    setIsFailedDataSending,
    failedAttempts,
    setFailedAttempts
}:IUserError) => {
    const {subject, test, option, tasksProgress} = useSelector((state:any) => state.testData);

    const redirectUrl = source === 'platform' ? config.personalTests : config.website;
    const tasksWithWrongAnswers = tasksProgress.map((task, index) => {
        if (!task.status) return index + 1;

        return null;
    }).filter(task => task) as number[];

    const handleRepeatSending = () => {
        if (finalScore !== undefined && maxScore && failedAttempts < 3) {
            const resultData:PostDataT = {
                subject: subject,
                test: test,
                source: source,
                testSubcategory: option,
                wrongAnswers: tasksWithWrongAnswers,
                score: finalScore,
                maxScore: maxScore
            };

            if (source == 'website') {
                resultData.username = user.username;
                resultData.tel = user.tel;
                resultData.email = user.email;
            }

            const subjectID = getSubjectID(subject);

            const data = {
                action: ApiActions.sendData,
                params: {
                    subjectID,
                    ...resultData
                }
            };

            ApiConnector.request(data).then((response) => {
                if (response.status) {
                    setIsFailedDataSending(false);

                    console.log('Successful sending of data');
                } else {
                    setIsFailedDataSending(true);
                    setFailedAttempts(prev => prev += 1);

                    console.log('Failed sending of data');
                }
            });
        }
    };

    return <div className={styles.errorContainer}>
        <svg viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M54 0C43.3198 0 32.8795 3.16704 23.9992 9.10064C15.119 15.0342 8.19766 23.4679 4.11053 33.3351C0.0233974 43.2023 -1.04598 54.0599 1.03762 64.5349C3.12122 75.0098 8.26422 84.6317 15.8163 92.1837C23.3683 99.7358 32.9902 104.879 43.4651 106.962C53.9401 109.046 64.7977 107.977 74.6649 103.889C84.5321 99.8023 92.9658 92.881 98.8994 84.0008C104.833 75.1205 108 64.6802 108 54C107.985 39.6831 102.29 25.9569 92.1667 15.8333C82.0431 5.70973 68.3169 0.0154849 54 0V0ZM73.089 66.7305C73.9326 67.5744 74.4065 68.7188 74.4065 69.912C74.4065 71.1052 73.9326 72.2496 73.089 73.0935C72.2308 73.9096 71.0918 74.3646 69.9075 74.3646C68.7232 74.3646 67.5842 73.9096 66.726 73.0935L54 60.363L41.274 73.0935C40.4244 73.9263 39.2822 74.3927 38.0925 74.3927C36.9029 74.3927 35.7606 73.9263 34.911 73.0935C34.0674 72.2496 33.5935 71.1052 33.5935 69.912C33.5935 68.7188 34.0674 67.5744 34.911 66.7305L47.637 54L34.911 41.2695C34.4812 40.8544 34.1384 40.3578 33.9026 39.8088C33.6667 39.2598 33.5426 38.6693 33.5374 38.0718C33.5322 37.4743 33.6461 36.8817 33.8723 36.3287C34.0986 35.7757 34.4327 35.2732 34.8552 34.8507C35.2778 34.4282 35.7802 34.0941 36.3332 33.8678C36.8863 33.6415 37.4788 33.5277 38.0763 33.5329C38.6738 33.5381 39.2643 33.6622 39.8133 33.898C40.3624 34.1339 40.8589 34.4767 41.274 34.9065L54 47.637L66.726 34.9065C67.1411 34.4767 67.6377 34.1339 68.1867 33.898C68.7357 33.6622 69.3262 33.5381 69.9237 33.5329C70.5212 33.5277 71.1138 33.6415 71.6668 33.8678C72.2198 34.0941 72.7223 34.4282 73.1448 34.8507C73.5673 35.2732 73.9014 35.7757 74.1277 36.3287C74.354 36.8817 74.4678 37.4743 74.4626 38.0718C74.4574 38.6693 74.3333 39.2598 74.0975 39.8088C73.8616 40.3578 73.5188 40.8544 73.089 41.2695L60.363 54L73.089 66.7305Z" fill="#FF5858"/>
        </svg>
        <h3 className={styles.title}>
            <LocalizedText name={'error.title'} path={'translation'}/>
        </h3>
        <p className={styles.text}>
            {failedAttempts >= 3
                ? <LocalizedText name={'error.textTech'} path={'translation'}/>
                : <LocalizedText name={'error.textRepeat'} path={'translation'}/>
            }
        </p>
        {failedAttempts >= 3 && <a href="mailto:tech.amakids@yandex.ru" className={styles.link}>tech.amakids@yandex.ru</a>}
        {failedAttempts >= 3
            ? <a href={redirectUrl} className={styles.btn}>
                <LocalizedText name={'buttons.ok'} path={'translation'}/>
            </a>
            : <button onClick={handleRepeatSending} className={styles.btn}>
                <LocalizedText name={'buttons.repeat'} path={'translation'}/>
            </button>
        }
    </div>;
};