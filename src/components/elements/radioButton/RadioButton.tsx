import React from 'react';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import styles from './styles.scss';

interface SingleP {
    label:string;
    id?:string;
    disabled?:boolean;
    value?:string;
    name?:string;
    defaultChecked?:boolean;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>) => void;
    img:string;
}

interface MultipleP {
    options:SingleP[];
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    stageId?:number;
    questionId?:number;
    imgLabels?:boolean;
}

const RadioButton = ({
    label,
    id,
    disabled = false,
    value,
    name,
    defaultChecked,
    onChange,
    img
}:SingleP) => {
    const {subject, test, option} = useSelector((state:any) => state.testData);
    const imgPath = img ? `${option}/${img}` : '';

    return <div className={classNames(styles.radioButton, imgPath && styles.radioButtonImg)}>
        <input
            type='radio'
            id={id}
            disabled={disabled}
            value={value}
            name={name}
            defaultChecked={defaultChecked}
            className={styles.input}
            onChange={onChange}
        />
        <label
            htmlFor='radio-button'
            className={classNames(styles.label, disabled && styles.labelDisabled, imgPath && styles.labelImg)}
        >
            {!imgPath && label}
        </label>
        {imgPath &&
            <div className={styles.imgWrapper}>
                <img src={require(`_assets/img/tasks/${subject}/${test}/${imgPath}`)} alt='image'/>
            </div>
        }
    </div>;
};

export const RadioButtons = ({options, onChange, stageId, questionId, imgLabels}:MultipleP) => {
    //Получаем данные из стора для хранения состояния при переходе м/д этапами заданий
    const tasks = useSelector((state:any) => state.testData.tasksProgress);
    const currentAnswer:string[] = tasks[stageId - 1].currentAnswer;

    return <fieldset>
        <div className={classNames(styles.btnWrapper, imgLabels && styles.btnWrapperImg)}>
            {options.map(({label, name, disabled, img}:SingleP, index) => {
                const shortenedOptionLabel = label.replace(/\s+/g, '');
                const optionId = `radio-option-${shortenedOptionLabel}`;

                return <RadioButton
                    value={label}
                    label={label}
                    key={index}
                    id={optionId}
                    name={name}
                    disabled={disabled}
                    onChange={onChange}
                    defaultChecked={label === currentAnswer[questionId]}
                    img={img}
                />;
            })}
        </div>
    </fieldset>;
};

