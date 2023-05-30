import {createSlice} from '@reduxjs/toolkit';
import * as reducers from './reducers';

export const {actions, reducer} = createSlice({
    name: 'testData',
    initialState: {
        subject: '',
        test: '',
        isTestStarted: false,
        isTestFinished: false,
        option: '',
        stage: 1,
        testLang: '',
        isAudioPlaying: false,
        isAnotherAudioPlaying: false,
        tasksData: {},
        tasksProgress: [],
    },
    reducers
});