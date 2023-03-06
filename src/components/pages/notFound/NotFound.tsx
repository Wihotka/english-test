import React from 'react';
import {Button} from '@components/elements/button';
import {LocalizedText} from '@components/elements/localizedText';
import config from '@config';
import styles from './styles.scss';

export const NotFound = () => {

    return <div>
        <div className={styles.notFound}>
            <div className={styles.wrapper}>
                <div className={styles.title}>404</div>
                <p className={styles.description}>
                    <LocalizedText name={'notFound.description'} path={'translation'}/>
                </p>
                <Button navLink={config.path.main} className={styles.toMain}>
                    <LocalizedText name={'notFound.back'} path={'translation'}/>
                </Button>
            </div>
        </div>
    </div>;
};