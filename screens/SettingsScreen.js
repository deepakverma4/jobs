import React, { Component } from 'react';
import { View, Text, Platform, AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-elements';
import {clearLikedJobs, facebookLogout} from '../actions'

class SettingsScreen extends Component{
	static navigationOptions= ({navigation}) =>
	({		title: 'Settings',
		tabBarIcon:({tintColor}) =>{
					return <Icon name="description" color={tintColor} size={28}/>
				},
			headerStyle:{
					marginTop: Platform.OS === 'android' ? 24 : 0 
				}
		});

	

	onLogout=()=>{
		AsyncStorage.removeItem('fb_token');
		this.props.facebookLogout();
		this.props.navigation.navigate('auth');
	}

	onButtonPress=()=>{
		this.props.clearLikedJobs();
		this.props.navigation.navigate('rev');

	}



	render(){
		return(
			<View style={styles.containerStyle}> 
				<Button
				title="Reset Jobs Selections"
				icon={{name: 'delete-forever'}} 
				large
				backgroundColor="#f44336"
				onPress={this.onButtonPress}/>

				<Button
				title="Log Out"
				large
				backgroundColor="#03A9F4"
				onPress={this.onLogout}/>
		
			</View>
				);
	}
}

const styles={
	containerStyle:{
		position: 'relative',
		flex: 1,
		marginTop: 10,
		justifyContent: 'space-around',
		alignItems: 'center'
	}
};

export default connect(null,{clearLikedJobs, facebookLogout})(SettingsScreen);