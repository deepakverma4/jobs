import {SEARCH_QUERY} from './types';
export const textChanged = (text) =>{
		return{
			type: SEARCH_QUERY,
			payload: text
		};
};