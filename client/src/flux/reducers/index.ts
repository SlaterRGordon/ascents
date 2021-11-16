import { combineReducers } from 'redux';

import auth from './auth';
import climbs from './climbs'

export const reducers = combineReducers({ auth, climbs });