import {createSlice} from '@reduxjs/toolkit';
import * as reducers from './reducers';

export const {actions, reducer} = createSlice({
    name: 'testData',
    initialState: {
        isTestStarted: false,
        isTestFinished: false, //TEST
        option: '',
        stage: 1,
        testLang: 'uk',
        isAudioPlaying: false,
        isAnotherAudioPlaying: false,
        tasksData: {},
        tasksProgress: [],
    },
    reducers
});