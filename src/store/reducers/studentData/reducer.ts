import {createSlice} from '@reduxjs/toolkit';
import * as reducers from './reducers';

export const {actions, reducer} = createSlice({
    name: 'studentData',
    initialState: {
        isFirstTime: true // TEST
    },
    reducers
});