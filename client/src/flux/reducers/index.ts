import { combineReducers } from 'redux';

import auth from './auth';
import climbs from './climbs';
import ascents from './ascents';
import grades from './grades';

export const reducers = combineReducers({ auth, climbs, ascents, grades });