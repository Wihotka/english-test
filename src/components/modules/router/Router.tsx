import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import config from '@config';
import {Main, NotFound} from '@pages';

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={config.path.subject} component={Main}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);