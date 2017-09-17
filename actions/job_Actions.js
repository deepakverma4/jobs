import {FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS, SEARCH_QUERY} from './types';
import axios from 'axios';
import reverseGeoCode from 'latlng-to-zip';
import qs from 'qs';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOBS_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10
};



const buildJobsUrl= (zip, qu)=>{
	const query= qs.stringify({...JOBS_QUERY_PARAMS, l:zip, q:qu});
	return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region,qu, callback) => async (dispatch) =>{
	try{
	let zip= await reverseGeoCode(region);
	const url = buildJobsUrl(zip,qu);
	let {data} = await axios.get(url);
	dispatch({type:FETCH_JOBS, payload:data});
	callback();

	}catch(e){
		console.error(e);
	}
};

export const likeJob=(job)=>{
	return{
		payload:job,
		type: LIKE_JOB
	};
};

export const clearLikedJobs = () =>{
	return{type: CLEAR_LIKED_JOBS};
}
