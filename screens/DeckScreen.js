import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import {connect} from 'react-redux';
import {MapView} from 'expo';
import Swipe from '../components/Swipe';
import {Button,Card, Icon} from 'react-native-elements';
import * as actions from '../actions';

class DeckScreen extends Component{
		static navigationOptions={
		title: 'Jobs',
		tabBarIcon:({tintColor}) =>{
					return <Icon name="description" color={tintColor} size={28}/>
				}
		}

	
	renderCard(job){
		const initialRegion={
			longitude:job.longitude,
			latitude:job.latitude,
			latitudeDelta: 0.045,
			longitudeDelta: 0.02
		};
		return(<Card title={job.jobtitle}>
						<View style={{height:200}} >
						<MapView
							scrollEnabled={false}
							style={{flex:1}} 
							cacheEnabled={Platform.OS==='android'? true : false}
							initialRegion={initialRegion}
						> 
						</MapView>
						</View>
						<View style={styles.detailWrapper}>
						<Text>{job.company} </Text>
						<Text> {job.formattedRelativeTime} </Text>
						</View>
							<Text>
							{job.snippet.replace(/<b>/g, '').replace(/<\/b/g,'')} 
							</Text>
						</Card>
					);
}				
	
	renderNoMoreCards = () =>{
		return(
		<Card title="No More Jobs">
		<Button 
		title="Go Back To Map "
		large
		icon={{name:'my-location'}}
		backgroundColor="#03A9F4"
		onPress={() => this.props.navigation.navigate('map')}/>
		</Card>
			);
	}

	render(){
		return(
			<View> 
				<Swipe
				data={this.props.jobs}
				renderCard={this.renderCard}
				renderNoMoreCards={this.renderNoMoreCards.bind(this)}
				keyProp="jobkey"
				onSwipeRight={job => this.props.likeJob(job)}
				 />
			</View>
				);
	}
}
const styles={
	detailWrapper:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10
	}
};
function mapStateToProps({jobs}){
	return{ jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);