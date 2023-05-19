import React from 'react';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';

import {LocalizedText} from '@components/elements/localizedText';
import styles from './styles.scss';

type UserData = {
    username:string;
    tel:string;
    email:string;
};

interface IUserForm {
    tasks:any[];
    setUserData:React.Dispatch<React.SetStateAction<UserData>>;
    setIsFormSent:React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserForm = ({tasks, setUserData, setIsFormSent}:IUserForm) => {
    const {t} = useTranslation('translation');

    const placeholders = {
        username: t('form.inputPlaceholders.name'),
        tel: t('form.inputPlaceholders.tel'),
        email: t('form.inputPlaceholders.email')
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            tel: '',
            email: ''
        },
        validate: values => {
            const errors = {
                username: '',
                tel: '',
                email: ''
            };

            if (!values.username) errors.username = t('form.errors.noUsername');
            else if (values.username.split(' ').length < 2) errors.username = t('form.errors.incorrectUsername');
            else if (!values.username.split(' ').every(str => !!str)) errors.username = t('form.errors.incorrectUsername');

            if (!values.tel) errors.tel = t('form.errors.noTel');
            else if (values.tel.length < 5) errors.tel = t('form.errors.incorrectTel');
            else if (!values.tel.match(/\d/i)) errors.tel = t('form.errors.incorrectTel');

            if (!values.email) errors.email = t('form.errors.noEmail');
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = t('form.errors.incorrectEmail');

            if (errors.username || errors.tel || errors.email)
                return errors;
            
            return null;
        },
        onSubmit: values => {
            const resultsData = {
                user: values,
                tasks: tasks
            };

            setIsFormSent(true);

            console.log(resultsData); // TEST
        },
    });

    const handleUsername = (e) => {
        const value = e.target.value;
        e.target.value = value.trimStart().replace(/\s\s+/g, ' ');
        formik.handleChange(e);
    };
    const handleTel = (e) => {
        const value = e.target.value;
        e.target.value = value.replace(/[^\d\+\-() ]/g, '').replace(/\s\s+/g, ' ').substr(0, 20).trimStart();
        formik.handleChange(e);
    };
    const handleEmail = (e) => {
        const value = e.target.value;
        e.target.value = value.trim();
        formik.handleChange(e);
    };

    return <form onSubmit={formik.handleSubmit} className={styles.userForm}>
        <div className={styles.inputWrapper}>
            <input
                type='text'
                value={formik.values.username}
                onChange={handleUsername}
                placeholder={placeholders.username}
                name='username'
                className={formik.errors.username && formik.touched.username ? styles.inputError : ''}
            />
            {formik.errors.username && formik.touched.username && <div>{formik.errors.username}</div>}
        </div>
        <div className={styles.inputWrapper}>
            <input
                type='tel'
                value={formik.values.tel}
                onChange={handleTel}
                placeholder={placeholders.tel}
                name='tel'
                className={formik.errors.tel && formik.touched.tel ? styles.inputError : ''}
            />
            {formik.errors.tel && formik.touched.tel && <div>{formik.errors.tel}</div>}
        </div>
        <div className={styles.inputWrapper}>
            <input
                type='text'
                value={formik.values.email}
                onChange={handleEmail}
                placeholder={placeholders.email}
                name='email'
                className={formik.errors.email && formik.touched.email ? styles.inputError : ''}
            />
            {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}
        </div>
        <button type='submit' className={styles.submitBtn}>
            <LocalizedText name={'buttons.submit'} path={'translation'}/>
        </button>
        <p className={styles.personal}>
            <LocalizedText name={'form.personal.text'} path={'translation'}/>
            <a href='https://amakids.ru/privacy_policy/' target='_blank' rel='noopener'>
                <LocalizedText name={'form.personal.link'} path={'translation'}/>
            </a>
        </p>
    </form>;
};