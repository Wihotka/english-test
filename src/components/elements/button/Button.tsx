import React, {CSSProperties, Ref, useCallback} from 'react';
import {useHistory} from 'react-router';
import classNames from 'classnames';
import styles from './styles.scss';

type Props = {
    children?:any;
    link?:string;
    color?:'blue'|'grey';
    navLink?:string;
    disabled?:boolean;
    open?:string;
    className?:string;
    onClick?:Function;
    style?:CSSProperties;
};

export const Button = React.forwardRef((props:Props, ref:Ref<any>) => {

    const {style, color = 'blue', children, disabled = false} = props;

    const history = useHistory();
    const navLinkClick = useCallback(() => history.push(props.navLink), [history]);

    const onClick = () => {

        if(disabled){
            return null;
        }

        if(props.open){
            window.open(props.open);
        }

        if(props.link){
            location.href = props.link;
        }

        if(props.navLink){
            navLinkClick();
        }

        if(typeof props.onClick == 'function'){
            props.onClick();
        }

        return null;
    };

    return <div className={classNames(styles.button, styles[color], props.className, disabled && styles.disabled)} ref={ref} style={{...style}} onClick={onClick}>{children}</div>;
});