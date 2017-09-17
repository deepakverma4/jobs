import {FETCH_JOBS,FACEBOOK_LOGOUT_SUCCESS} from '../actions/types';
const INITIAL_STATE={
	results:[]
};

export default function(state=INITIAL_STATE, action){
	switch(action.type){
		case FETCH_JOBS:
		return action.payload;
		case FACEBOOK_LOGOUT_SUCCESS:
		return INITIAL_STATE;
		default:
		return state;
	}
}