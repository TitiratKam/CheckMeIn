import React  from 'react';
import {
  StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity ,StatusBar,ScrollView,Alert
  ,TouchableWithoutFeedback
} from 'react-native';
import login from './log-in.js';
import checkIn from './check-in.js';
import AttendanceHis from './Attendance_his.js';
import Base from './base_test.js';
import BeaconTest from './BeacTest.js';
import OTRequest from './OTRequest.js';
import LeaveRequest from './LeaveRequest.js';
import Notification from './notification.js';
import RequestDetail from './RequestDetail.js';


import {StackNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';
import {Container,Header,Body,Content} from 'native-base';


//   const Navigation = StackNavigator(
//   {
//     First:{screen: login},
//     Second:{screen: checkIn},
//     // detail: {
//     //   screen: detail,
//     //    navigationOptions: ({navigation}) => ({
//     //   title: `${navigation.state.params.title}`,
//     //   }),
//     // },
//     // reserve: {screen: reserve}
//   }
// ); 
const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={{ height: 200}}>
      <Body>
        <Image
          style = {styles.drawerImage}
          source={require('./img/man.png')}
        />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
)


  const Navigation = StackNavigator(
  {
    RequestDetail:{screen: RequestDetail},
    // detail: {
    //   screen: detail,
    //    navigationOptions: ({navigation}) => ({
    //   title: `${navigation.state.params.title}`,
    //   }),
    // },
    // reserve: {screen: reserve}
  }
); 

  const DrawExample = DrawerNavigator(
  {
    LogIn:{
      screen: login
    },
    CheckIn:{
      screen: checkIn
    },
    Notification:{
      screen: Notification
    },
    AttendanceHis:{
      screen: AttendanceHis
    },
    LeaveRequest:{
      screen: LeaveRequest
    },
    OTRequest:{
      screen: OTRequest
    },
    Base:{
      screen: Base
    },
    BeaconTest:{
      screen: BeaconTest
    },
    //RequestDetail:{screen: RequestDetail},
    // detail: {
    //   screen: detail,
    //    navigationOptions: ({navigation}) => ({
    //   title: `${navigation.state.params.title}`,
    //   }),
    // },
    // reserve: {screen: reserve}
  },
  {
    initialRouteName: 'LogIn',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
    activeTintColor: 'red',
    }
  }
); 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'rgba(175, 214, 240,1.0)',
    },
    drawerImage:{
      height: 150,
      width: 150
    }
    
});


export default DrawExample;