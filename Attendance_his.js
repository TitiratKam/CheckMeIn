'use strict';
 import React, {
  Component
} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OAH from './OAH';
import MAH from './MAH';


export default class AttendanceHis extends React.Component {



static navigationOptions = {
       title: 'AttendanceHis',
       headerLeft: null,
       tabBarLabel:'AttendanceHis',
       drawerIcon: ({tintColor}) => {
           return (
               <MaterialIcons
               name="list"
               size={24}
               style={{color: tintColor}}>
               </MaterialIcons>
               );
               //
       }
   };


   render() {
     if (1>2){
       return (
       <OAH/>
       );

     }
     else{
       return (
       <MAH/>
       );

     }
   }
}
