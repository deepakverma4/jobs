import {AsyncStorage}from 'react-native';
import {Facebook} from 'expo';
import {FACEBOOK_LOGIN_SUCCESS,
		FACEBOOK_LOGIN_FAIL,
		FACEBOOK_LOGOUT_SUCCESS} from './types';

export const facebookLogin =() => async (dispatch) => {
	let token = await AsyncStorage.getItem('fb_token');
	if (token){
		dispatch({type: FACEBOOK_LOGIN_SUCCESS , payload: token});
	}else {
		doFacebookLogin(dispatch);
	}
};

const doFacebookLogin = async dispatch =>{
	let {type,token} = await Facebook.logInWithReadPermissionsAsync('128315397775577',{
		permissions: ['public_profile']
	});

	if(type === 'canncel'){
		return dispatch({type: FACEBOOK_LOGIN_FAIL});
	}

	await AsyncStorage.setItem('fb_token',token);
	dispatch({type:FACEBOOK_LOGIN_SUCCESS, payload: token});

};

export const facebookLogout = () => {
	 AsyncStorage.removeItem('fb_token');
console.log('token removed');

	return{
		type: FACEBOOK_LOGOUT_SUCCESS
	};
	
	
};

