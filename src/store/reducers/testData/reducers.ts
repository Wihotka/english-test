import {assign} from 'lodash-es';

export const setTestData = (state:any, action:{payload:any}) => {
    assign(state, action.payload);
};

export const setStage = (state:{stage:number}, action:{payload:any}) => {
    state.stage = action.payload;
};

export const setTaskStatus = (state:{tasksProgress:{
    status:boolean;
    score:number;
}[]}, action:{payload:{key:any; status:boolean; score:number}}) => {
    const {key, status, score} = action.payload;
    state.tasksProgress[key - 1].status = status;
    state.tasksProgress[key - 1].score = score;
};

export const setTaskDone = (state:{tasksProgress:{
    done:boolean;
    currentAnswer:any;
    score:number;
}[]}, action:{payload:{key:any; done:boolean; value:any}}) => {
    const {key, done, value} = action.payload;
    state.tasksProgress[key - 1].done = done;
    state.tasksProgress[key - 1].currentAnswer = value;
};

export const setIsAudioPlaying = (state:{isAudioPlaying:boolean}, action:{payload:any}) => {
    state.isAudioPlaying = action.payload;
};

export const setIsAnotherAudioPlaying = (state:{isAnotherAudioPlaying:boolean}, action:{payload:any}) => {
    state.isAnotherAudioPlaying = action.payload;
};