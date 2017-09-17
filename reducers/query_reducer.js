import {SEARCH_QUERY} from '../actions/types';

const INITIAL_STATE ={
	q: ''
};

export default(state=INITIAL_STATE,action)=>{
	switch(action.type){
		case SEARCH_QUERY:
		return { q: action.payload };
		default:
		return state;
	}

};