import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { root } from 'baobab-react/higher-order';

import stateTree from './state-tree';

const AppWithStore = root(stateTree, Routes);
ReactDOM.render(<AppWithStore />, document.querySelector('.react-app'));
