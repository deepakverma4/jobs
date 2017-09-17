import React, { Component } from 'react';
import { View, Text , Dimensions} from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';


const SCREEN_WIDTH = Dimensions.get('window').width;



class Slides extends Component{

	renderLastSlides(index){
		if(index === this.props.data.length - 1){
			return(
				<Button 
				title= "Onwards!"
				buttonStyle={styles.buttonStyle}
				onPress= {this.props.onComplete}
				/>

				);
		}
	}

	renderSlides(){
	
	return this.props.data.map((slide, index) =>{

		return(
		
			<View 
			key={slide.text} 
			style={[styles.slideStyle, {backgroundColor: slide.color}]}
			>
			<Text style={styles.textStyle}>{slide.text}</Text>
			{this.renderLastSlides(index)}
			</View>
		
		);
		});
}
	render(){
		return(
			<Swiper 
			style={styles.swiperStyle}
			loop= 'false'
			 showButtons>
				{this.renderSlides()}
			</Swiper>
			);
			
	}
}

const styles={
	swiperStyle:{

	},
	slideStyle:{
		flex:1,
		justifyContent:'center',
		alignItems: 'center',
		width: SCREEN_WIDTH

	},
	textStyle:{
		fontSize:30,
		color: 'white',
		textAlign: 'center'
	},
	buttonStyle:{
		backgroundColor: '#0288D1',
		marginTop: 15
	}
};

export default Slides;