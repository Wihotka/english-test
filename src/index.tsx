import React from 'react';
import ReactDOM from 'react-dom';
import {setFavicon} from 'amakids-games-utils-and-generations/lib/utils';
import {App} from '@components/app';
import config from '@config';

import '@components/app/styles/main.scss';
import './i18n';

setFavicon(config.favicon);

ReactDOM.render(<App/>, document.querySelector('#app'));