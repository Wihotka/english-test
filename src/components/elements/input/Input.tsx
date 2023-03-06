import React, {Ref, useState} from 'react';
import classNames from 'classnames';
import {upperFirst} from 'lodash';
import styles from './styles.scss';

type P = {
    value?:string|number;
    defaultValue?:string|number;
    className?:string;
    onChange?:Function;
    onBlur?:Function;
    disabled?:boolean;
    autoFocus?:boolean;
    type?:string;
    upperFirstLetter?:boolean;
};

export const Input = React.forwardRef((props:P, ref:Ref<any>) => {
    const {disabled = false, autoFocus = false, type = 'text', upperFirstLetter} = props;
    const [inputValue, setInputValue] = useState(props.value ?? '');

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(typeof props.onChange == 'function'){
            props.onChange(e.target.value);
        }
        //Делаем первую букву первого инпута заклавной
        const inputText = upperFirstLetter
            ? upperFirst(e.target.value.trimStart())
            : e.target.value.trimStart();
        //Только английские буквы пробел и апостроф
        setInputValue(inputText.replace(/[^A-Za-z' ]/ig, ''));
    };

    const onBlur = value => {
        if(typeof props.onBlur == 'function'){
            props.onBlur(value);
        }
    };

    return <div className={styles.inputWrapper}>
        <input
            className={classNames(styles.input, props.className, disabled && styles.disabled)}
            value={inputValue}
            onChange={onChange}
            onBlur={e => onBlur(e.target.value)}
            type={type}
            disabled={disabled}
            autoFocus={autoFocus}
            ref={ref}
        />
    </div>;
});