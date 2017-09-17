import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {Button, SocialIcon} from 'react-native-elements';

class AuthScreen extends Component{
	facebookButton(){
		 this.props.facebookLogin();
		 this.onAuthComplete(this.props);


	}

	componentWillReceiveProps(nextProps){
		this.onAuthComplete(nextProps);
	}

	onAuthComplete(props){
		if(props.token){
			this.props.navigation.navigate('map');
		}
	}
	render(){
		return(
			<View style={styles.containerStyle}>
				<SocialIcon
				title='LogIn With Facebook'
				button
				type= 'facebook'
				style={{width: 300}}
				onPress={this.facebookButton.bind(this)}
				/>
			</View>
				);
	}
}

const styles={
	containerStyle:{
		position: 'relative',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
};

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps,actions)(AuthScreen);