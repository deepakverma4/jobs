import React, { Component } from 'react';
import { View, Text ,Platform, ScrollView, Linking } from 'react-native';
import {Button, Card, Icon} from 'react-native-elements';
import {MapView} from 'expo';
import {connect} from 'react-redux';

class ReviewScreen extends Component{
	static navigationOptions = ({ navigation }) => ({
		headerTitle: 'Review Jobs',
		tabBarIcon:({tintColor}) =>{
					return <Icon name="favorite" color={tintColor} size={28}/>
				},
		headerRight: (
			<View style={{ marginRight: 10 }}>
				<Button
					title="Settings"
					backgroundColor="#03A9F4"
					onPress={() => navigation.navigate('settings')}
					buttonStyle={{ borderRadius: 5, height: 35 }}
				/>
			</View>
		),
		headerStyle: {
			marginTop: Platform.OS === 'android' ?  24 : 0,
		}
	});

	renderLikedJobs(){
		return this.props.likedJobs.map(job => {
			const {company,formattedRelativeTime, url, 
				   longitude,latutude, jobtitle, jobkey} = job;
			const initialRegion = {
				longitude,
				latutude,
				longitudeDelta:0.045,
				latutudeDelta:0.02
			}
		return(
				<Card title={jobtitle} key= {jobkey}>
					<View style={{height:200}}>
					<MapView 
					style={{flex:1}}
					scrollEnabled={false}
					cacheEnabled={Platform.OS==='android'}
					initialRegion={initialRegion}
					/>
						<View style={styles.detailsWrapper}>
							<Text style={styles.italics}> {company}</Text>
							<Text style={styles.italics}> {formattedRelativeTime}</Text>
						</View>
							<Button
							title="Apply Now!"
							backgroundColor='#03A9F4'
							onPress={()=>Linking.openURL(url)}
							/>
					</View>
				</Card>
			);
			});
	}

	render(){
		return(
			<ScrollView >
				{this.renderLikedJobs()}
			</ScrollView>
				);
	}
}
const styles={
	detailsWrapper:{
		justifyContent: 'space-around',
		flexDirection: 'row',
		marginBottom: 10,
		marginTop: 10
	},
	italics:{
		fontStyle: 'italic'
	}
};

function mapStateToProps(state){
	return {likedJobs: state.likedJobs};
}

export default connect(mapStateToProps)(ReviewScreen);