import React  from 'react';
import {
  AsyncStorage,StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity ,StatusBar,ScrollView,Alert
  ,TouchableWithoutFeedback
} from 'react-native';
//import login from './test.js';
import login from './log-in.js';
import CheckIn from './check-in.js';
//import AttendanceHis from './Attendance_his.js';
import AttendanceHis from './MAH.js';

// import Base from './base_test.js';
// import BeaconTest from './BeacTest.js';
import OTRequest from './OTRequest.js';
import LeaveRequest from './LeaveRequest.js';
import Notification from './notification.js';
import RequestHis from './RequestHis.js';
// import TestRequest from './TestRequest.js';
// import AttendanceHisTest from './Attendance_hisTest.js';
// import checkInTest from './check-inTest.js';
import Calendar from './Calendar.js';
import test from './test.js';
import editReqForm from './editReqForm.js';

import {StackNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';
import {Icon,Container,Header,Body,Content} from 'native-base';



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



export const req = StackNavigator({
  RequestHis : {
    screen:RequestHis
  },
  editReqForm: {
    screen: editReqForm
  },
  // LeaveRequest:{
  //     screen: LeaveRequest
  //   },
  //   OTRequest:{
  //     screen: OTRequest
  //   },
});

export const reqtest = StackNavigator({
  test : {
    screen:test
  },
  editReqForm: { screen: editReqForm }
});

export const DrawExample = DrawerNavigator(
  {
    LogIn:{
      screen: login,
      navigationOptions: ({navigation}) => ({
      drawerLockMode: 'locked-closed'
    })
    },
    CheckIn:{
      screen: CheckIn,
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
    RequestHis:{
      screen: req
    },
    // BeaconTest:{
    //   screen: BeaconTest
    // },
    // TestRequest:{
    //   screen: TestRequest
    // },
    // AttendanceHisTest:{
    //   screen: AttendanceHisTest
    // },
    // CheckInTest:{
    //   screen: checkIn
    // },
    Calendar:{
      screen: Calendar
    },

  },
  {
    initialRouteName: 'CheckIn',
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
