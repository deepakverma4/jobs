import React,{ Component } from 'react';
import {MapView} from 'expo';
import { View, Text, ProgressBarAndroid, Platform ,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon, SearchBar} from 'react-native-elements';

import {fetchJobs,textChanged } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class MapScreen extends Component{
	static navigationOptions={
		title: 'Map',
		tabBarIcon:({tintColor}) =>{
					return <Icon name="my-location" color={tintColor} size={28}/>
				}
		}

	
	state={
		mapLoaded: false,
		region:{
			longitude: -122,
			latitude: 37,
			longitudeDelta: 0.04,
			latitudeDelta: 0.09
		}
	}
	onRegionChange = (region) =>{
		
		this.setState({region});
	}

	onTextChange =(text) =>{
		this.props.textChanged(text);
	};

	onButtonPress=()=>{
		this.props.fetchJobs(this.state.region, this.props.q, ()=>{
			this.props.navigation.navigate('deck');
		});
	}

	

	componentDidMount(){
		this.setState({mapLoaded:true});
	}

	render(){
		if(!this.state.mapLoaded){
			return (
				<View style={{ flex: 1, marginTop: Platform.OS === 'android' ? 17 : 0 }}>
					<ProgressBarAndroid 
						styleAttr='Horizontal'
						color='#03A9F4'
					/>
				</View>
				);
		}
		return(
		<View style={{flex:1}}> 
			<MapView 
			style={{flex:1}}
			region={this.state.region}
			onRegionChange={this.onRegionChange}
			/>
			<View style={styles.containerStyle}>
					<SearchBar
						textInputRef='input'
  						lightTheme
  						inputStyle={{ backgroundColor: '#FFF' }}
  						containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', width: SCREEN_WIDTH * 0.80 }}
  						placeholder='Job Title'
  						clearIcon={{ name: 'clear', color: '#86939E' }}
  						onChangeText={this.onTextChange}
  					/>
  					<View style={{ flex: 1, position: 'absolute', top: 8, left: SCREEN_WIDTH * 0.75 }}>
  						<Button 
  							title='Search'
  							backgroundColor='#03A9F4'
  							buttonStyle={{ height: 40, width: SCREEN_WIDTH * 0.19 }}
  							onPress={this.onButtonPress}
  							fontSize={SCREEN_WIDTH * 0.19 * 0.19}
  						/>
  					</View>
				</View>

			
	</View>

				);
	}
}

const styles ={
containerStyle: {
		position: 'absolute',
		top: 24,
		flexDirection: 'row'
	}
};


function mapStateToProps(state){
	
	const {q} = state.sQuery;

	return {q};
}
export default connect(mapStateToProps, {fetchJobs,textChanged})(MapScreen);