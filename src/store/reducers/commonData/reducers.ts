import {assign} from 'lodash-es';

export const setCommonData = (state:any, action:{payload:any}) => {
    assign(state, action.payload);
};