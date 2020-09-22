'use strict';
 import React, {
  Component
} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabNavigator, TabView } from 'react-navigation'
//import Icon from "react-native-vector-icons/FontAwesome";
import OAH from './OAH';
import OthAH from './OthAH';

const tabNav = TabNavigator({

   TabItem1: {
       screen: OAH,
       navigationOptions: {
           tabBarLabel:"Tab 1",
           tabBarIcon: ({tintColor}) => {
           return (
               <MaterialIcons
               name="access-time"
               size={24}
               style={{color: tintColor}}>
               </MaterialIcons>
               ///
               );
       }
       }
   },
   TabItem: {
       screen: OthAH,
       navigationOptions: {
           tabBarLabel:"Tab 2",
           tabBarIcon: ({tintColor}) => {
           return (
               <MaterialIcons
               name="access-time"
               size={24}
               style={{color: tintColor}}>
               </MaterialIcons>
               ///
               );
       }
       }
   },


   ///... add more tabs here

}, {
       tabBarOptions: {
           activeTintColor: '#222',
       }
});

export default tabNav;
