import {assign} from 'lodash-es';

export const setTestData = (state:any, action:{payload:any}) => {
    assign(state, action.payload);
};

export const setStage = (state:{stage:number}, action:{payload:any}) => {
    state.stage = action.payload;
};

export const setTaskStatus = (state:{tasks:{status:boolean}[]}, action:{payload:{key:any; status:boolean}}) => {
    const {key, status} = action.payload;
    state.tasks[key - 1].status = status;
};

export const setTaskDone = (state:{tasks:{
    done:boolean;
    currentAnswer:any;
}[]}, action:{payload:{key:any; done:boolean; value:any}}) => {
    const {key, done, value} = action.payload;
    state.tasks[key - 1].done = done;
    state.tasks[key - 1].currentAnswer = value;
};

export const setIsAudioPlaying = (state:{isAudioPlaying:boolean}, action:{payload:any}) => {
    state.isAudioPlaying = action.payload;
};

export const setIsAnotherAudioPlaying = (state:{isAnotherAudioPlaying:boolean}, action:{payload:any}) => {
    state.isAnotherAudioPlaying = action.payload;
};