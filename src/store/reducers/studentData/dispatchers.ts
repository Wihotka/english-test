import {bindActions} from '@reducers/utils/actions-binder';
import {actions} from './reducer';

export const {
    setIsFirstTime
} = bindActions(actions);