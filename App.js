import {Notifications} from 'expo';
import React, {Component} from 'react';
import {  Text, View, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';

import registerForNotifications from './services/push_notifications';
import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends Component {
  componentDidMount(){
    registerForNotifications();
    Notifications.addListener((notification) =>{
      const { data: {text}, orogin } =notification;

      if(origin === 'received' && text){
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok' }]

          );
      }
    });
  }
  render() {
    console.disableYellowBox= true;
    const MainNavigator = TabNavigator({
      welcome: {screen: WelcomeScreen},
      auth: {screen: AuthScreen},
      main: {
              screen: TabNavigator({
              map: {screen: MapScreen},
              deck: {screen: DeckScreen},
              review: {
                        screen: StackNavigator({
                        rev: {screen: ReviewScreen},
                        settings: {screen: SettingsScreen}
                      })
              }
        },{
          tabBarComponent: TabBarBottom,
          tabBarPosition: 'bottom',
          swipeEnabled: false,
          tabBarOptions:{
            labelStyle: {fontSize: 12}
          }
      }  
)}
      
    },
    { 
      navigationOptions: {
        tabBarVisible: false
      },
      lazy:true
    });

  return (
     <Provider store={store} >
      <MainNavigator />
        </Provider>
    );
  }
}



