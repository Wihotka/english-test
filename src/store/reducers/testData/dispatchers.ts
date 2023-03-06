import {bindActions} from '@reducers/utils/actions-binder';
import {actions} from './reducer';

export const {
    setTestData,
    setStage,
    setTaskStatus,
    setTaskDone,
    setIsAudioPlaying,
    setIsAnotherAudioPlaying
} = bindActions(actions);