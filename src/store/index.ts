import {configureStore, EnhancedStore} from '@reduxjs/toolkit';

import {reducer} from '@reducers/index';

export const store:EnhancedStore = configureStore({
    reducer,
    devTools: true
});