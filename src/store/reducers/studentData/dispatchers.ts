import {bindActions} from '@reducers/utils/actions-binder';
import {actions} from './reducer';

export const {
    setIsStudentFromPlatform,
    setIsFirstTime
} = bindActions(actions);