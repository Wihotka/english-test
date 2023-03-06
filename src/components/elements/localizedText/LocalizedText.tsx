import React from 'react';
import {useTranslation} from 'react-i18next';

import styles from './styles.scss';

export type LocalizedTextP = {
    name:string;
    path:string;
};

export const LocalizedText = ({name, path}:LocalizedTextP) => {
    const {t} = useTranslation(path);
    const localizedText = t(name);

    return <span className={styles.localizedText}>
        {localizedText || name}
    </span>;
};
