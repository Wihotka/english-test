import {createSlice} from '@reduxjs/toolkit';
import * as reducers from './reducers';

export const {actions, reducer} = createSlice({
    name: 'commonData',
    initialState: {},
    reducers
});