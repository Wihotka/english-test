import React, {FC} from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './styles.scss';
import classnames from 'classnames';

/*
Tooltip базируется на ReactTooltip
https://www.npmjs.com/package/react-tooltip
Элемент для которого мы делаем подсказку нужно:
    - добавить параметр data-tip
    - указать параметр data-for='' с кодом привязки к тултипу

Пример:
<div data-tip data-for='element'>Элемент</div>
<Tooltip for='element'>Описаие</Tooltip>
*/

type P = {
    place?:'left'|'bottom'|'right'|'top';
    effect?:'solid'|'float';
    globalEventOff?:string;
    for:string;
    className?:string
};

export const Tooltip:FC<P> = props => {

    const place = props.place || 'top';
    const effect = props.effect || 'solid';
    const globalEventOff = props.globalEventOff || '';

    return <ReactTooltip 
        className={classnames(styles.tooltip, props.className)}
        id={props.for} 
        place={place} 
        globalEventOff={globalEventOff} 
        clickable
        type="light" 
        effect={effect}
    >
        {props.children}
    </ReactTooltip>;
};