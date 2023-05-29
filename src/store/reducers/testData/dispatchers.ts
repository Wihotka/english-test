import {bindActions} from '@reducers/utils/actions-binder';
import {actions} from './reducer';

export const {
    setTestData,
    setStage,
    setTestLang,
    setTaskStatus,
    setTaskDone,
    setIsAudioPlaying,
    setIsAnotherAudioPlaying
} = bindActions(actions);