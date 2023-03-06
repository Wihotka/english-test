import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import {Router} from '@modules/router';
import {store} from 'store';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Preloader} from '@components/modules/common/preloader';

export const App = () =>
    <Provider store={store}>
        <Suspense fallback={<Preloader/>}>
            <DndProvider backend={HTML5Backend}>
                <Router/>
            </DndProvider>
        </Suspense>
    </Provider>;