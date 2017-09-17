import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, AsyncStorage } from 'react-native';
import {AppLoading} from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
	{text: 'Welcome To Jobs App ', color: "#03A9F9"},
	{text: 'Use this to get a Job', color: "#009688"},
	{text: 'Set your location, then swipe away ', color: "#03A9F9"}
	

];

class WelcomeScreen extends Component{
	state= { token:null }

	onSlideComplete() {
		this.props.navigation.navigate('auth');
		}

		async componentWillMount(){
			let token= await AsyncStorage.getItem('fb_token');

			if(token){
				this.props.navigation.navigate('map');
				this.setState({token});
			}else {
				this.setState({token: false});
			}
		}


	render(){
		if(_.isNull(this.state.token)){
			return <AppLoading />;
		}
		return(
			<Slides data={SLIDE_DATA} onComplete={this.onSlideComplete.bind(this)} />

				);
			
	}
}

export default WelcomeScreen;