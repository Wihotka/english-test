import React, {CSSProperties, useEffect, useState} from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

type Props = {
    children?:any;
    width?:string;
    opened?:boolean;
    onClose?:Function;
    style?:CSSProperties;
    modalWrapperStyle?:CSSProperties;
    className?:string;
};

export const Modal = (props:Props) => {
    const {width, modalWrapperStyle} = props;
    const [opened, setOpened] = useState(props.opened);

    useEffect(() => {
        setOpened(props.opened);
    }, [props.opened]);

    const close = () => {
        setOpened(false);
        if (typeof props.onClose === 'function') {
            props.onClose();
        }
    };

    useEffect(() => {
        if(opened){
            //Закрытие при нажатии на Esc
            window.addEventListener('keydown', onKeyDown);
        }
    }, [opened]);

    const onKeyDown = e => {
        if (e.code == 'Escape') {
            close();
            window.removeEventListener('keydown', onKeyDown);
        }
    };

    const modalBodyStyle = width ? {width: width + 'px'} : {};

    return (
        <div
            className={classNames(styles.modal, opened && styles.opened)}
            style={modalWrapperStyle}
        >
            <div className={styles.modalOverlay} onClick={close} />
            <span className={styles.modalClose} onClick={close}/>
            <div
                className={classNames(styles.modalBody, props.className)}
                style={{...modalBodyStyle, ...props.style}}

            >
                <div className={classNames(styles.modalContent)}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};