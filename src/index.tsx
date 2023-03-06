import React from 'react';
import ReactDOM from 'react-dom';
import {App} from '@components/app';

import '@components/app/styles/main.scss';
import './i18n';

ReactDOM.render(<App/>, document.querySelector('#app'));