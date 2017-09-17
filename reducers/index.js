import {combineReducers} from 'redux';
import auth from './auth_reducers';
import jobs from './jobs_reducers';
import likedJobs from './likes_reducers'; 
import sQuery from './query_reducer';

export default combineReducers({
	auth,jobs,likedJobs,sQuery
});