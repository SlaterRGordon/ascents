import { combineReducers } from 'redux';

import auth from './auth';
import climbs from './climbs';
import ascents from './ascents';

export const reducers = combineReducers({ auth, climbs, ascents });