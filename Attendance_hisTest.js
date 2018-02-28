 'use strict';
  import React, {
   Component
} from 'react';
 import {
   AppRegistry,
   StyleSheet,
   View,
   Text,
   TextInput,
   ListView,
   DeviceEventEmitter,
   KeyboardAvoidingView,
   DatePickerIOS,
   Modal,
   TouchableOpacity,
   Image,
   Alert
 }                             from 'react-native';
 import Beacons                from 'react-native-beacons-manager';
 import BluetoothState         from 'react-native-bluetooth-state';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon,Button,Container,Header,Content,Left,Right} from 'native-base';


import firebase from './firebase';

// var config = {
//   apiKey: "AIzaSyB0si1iezjtjhKke33vJvg9QsKhdoEY-ps",
//     authDomain: "checkmein-3b603.firebaseapp.com",
//     databaseURL: "https://checkmein-3b603.firebaseio.com",
//     projectId: "checkmein-3b603",
//     storageBucket: "checkmein-3b603.appspot.com",
//     messagingSenderId: "173482721628"

// };
// firebase.initializeApp(config);


export default class Notification extends React.Component {




constructor(props) {
    super(props);
    this.database = firebase.database();
    this.state = { 
      modalNoti: false,
      leaveRequest: [],
      i: null,
      name:null,
      dateFrom:null,
      dateTo:null,
      leaveType:null

    };
    //this.noti = this.noti.bind(this);
    this.leaveRequestRef = this.database.ref('leaveRequest');
    this.listeningForUser = this.listeningForUser.bind(this);

  }
  noti(name,dateFrom,dateTo,leaveType,i){
  
      this.setState({modalNoti:true});
     this.setState({name:name});
     this.setState({dateFrom:dateFrom});
     this.setState({dateTo:dateTo});
     this.setState({leaveType:leaveType});
     this.setState({i:i});
     console.log(i);

  }
  back(){
  
     this.setState({modalNoti:false});

  }
  approve(i){

    this.leaveRequestRef.child(this.state.i).remove();;
     
     this.setState({modalNoti:false});
  }

  deny(i){

    this.leaveRequestRef.child(this.state.i).remove();;
     
    this.setState({modalNoti:false});

  }

  listeningForUser() {
    this.leaveRequestRef.on('value', (snapshot) => {
      console.log("leaveRequest change:", snapshot.val());
      this.setState({
        leaveRequest: snapshot.val() || []
      });
    })
}

componentDidMount() {
    this.listeningForUser();
  }




static navigationOptions = {
        title: 'NotificationTest',
        headerLeft: null,
        tabBarLabel:'NotificationTest',
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                name="sms"
                size={24}
                style={{color: tintColor}}>
                </MaterialIcons>
                );
        }
    };

    render() {

        return (
        <Container>

            <Header>
                <Left>
                    <Icon name="ios-menu" onPress={() =>
                        this.props.navigation.navigate('DrawerOpen')}/>
                </Left>
            </Header>

            <Content ContentContainerStyle={{
                flex:1,
                alignItems: 'center',
                justifyContent: 'center',
             }}>

             <Modal
              state={styles.modal}
              visible={this.state.modalNoti}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
             >
             
              <Container>
                <Header>
                <Left>
                   <TouchableOpacity onPress = {() => this.back()}>
                    <Text>
                        Back
                    </Text>
                   </TouchableOpacity>
                </Left>
               
                </Header>

                <Content>
                    <View style={styles.formContainer}>
                     <View style={styles.db3}>
                      <Image style={styles.modalimg} source={require('./img/man.png')}/>
                      <Text style={styles.hmodaltext}>{this.state.name}</Text>
                      <Text style={styles.modaltext}>{this.state.dateFrom} to {this.state.dateTo}</Text>
                      <Text style={styles.modaltext}>Leave type : {this.state.leaveType}</Text>
                    </View>
                        <View style={styles.formButton}>
                            <View style={styles.db}>
                                <TouchableOpacity style={[styles.button,{backgroundColor: 'rgb(0, 153, 115)'}]} >
                                    <Text style={styles.Approve} onPress={ () => this.approve(this.state.i)}>
                                      Approve
                                    </Text>
                            
                                </TouchableOpacity>
                            </View> 
                            <View style={styles.db}>
                                <TouchableOpacity style={[styles.button,{backgroundColor: '#D95E54'}]} >
                                    <Text style={styles.Deny}  onPress={ () => this.deny(this.state.i)}>
                                      Deny
                                    </Text>
                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Content>
              </Container>
             </Modal>
                              {this.state.leaveRequest.map((obj, i) => 
                              <TouchableOpacity style={[styles.s1,{backgroundColor: 'rgb(240, 245, 245)'}]} 
                                onPress={ () => this.noti(obj.name,obj.dateFrom,obj.dateTo,obj.leaveType,i)}>
                              <View style={styles.db}>
                              <Image style={styles.img1} source={require('./img/man.png')}/>
                              </View>

                              <View style={styles.db2}>
                              <Text style={styles.hdetail}>{obj.name || "Jasper Smith"}</Text>
                              <Text style={styles.detail}> {obj.dateFrom} to {obj.dateTo}</Text>
                              <Text style={styles.detail}>Leave type : {obj.leaveType}</Text>
                              </View>

                            </TouchableOpacity>)}


            </Content>
       </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'rgba(175, 214, 240,1.0)',
    },
    button: {
        paddingVertical: 10,
        marginVertical: 5
    },
    Approve: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',

    },
    Deny: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',

    },
    Container1: {
        flex: 1,
        marginBottom:20,
        backgroundColor: 'white',
    },
    Container2: {
        flex: 1,
        //backgroundColor: 'rgba(175, 214, 240,1.0)',
    },
   btleConnectionStatus: {
     fontSize: 20,
     paddingTop: 20
   },
   headline: {
     fontSize: 20,
     paddingTop: 20
   },
   row: {
     padding: 8,
     paddingBottom: 16
   },
   input: {
        height: 40,
        width:200,
        backgroundColor: 'rgb(240, 245, 245)',
        marginBottom: 10,
        color: '    rgb(92, 138, 138)',
        paddingHorizontal: 10
    },
    icon: {
        marginBottom: 10,
        paddingHorizontal: 10
    },
    Text: {
     fontSize: 11,
     padding:10,
     width:50
   },
   formContainer: {
        padding: 20,
        //marginBottom:100,
    },
    formButton: {
        flexDirection:'row',
        padding:10
    },
    modal: {
        alignItems:'center',
        justifyContent:'center',
    },
    mimg: {
        alignItems:'center',
        justifyContent:'center',
    },
    img1:{
    width:90,
    height:90,
    },
    modalimg:{
      alignItems:'center',
    width:200,
    height:200,
    margin:20
    },
    s1: {
    margin : 10,
  padding:15,
  //backgroundColor:'rgb(61, 92, 71)',
  flexDirection:'row',
  borderWidth: 1,
  },
  db:{
    flex:1
  },
  db2:{
    flex:2
  },
  db3:{
    flex:1,
    padding:10
  },
  detail:{
    textAlign:'right',
    color:'#293d3d',
    fontSize:13,
    padding:5
  },
  hdetail:{
    textAlign:'right',
    fontSize: 15,
    color: '#1f2e2e',
    fontWeight: '700',
    marginBottom: 10
  },
  hmodaltext:{
    textAlign:'center',
    fontSize: 25,
    color: '#000',
    fontWeight: '700',
    marginBottom: 10
  },
  modaltext:{
    textAlign:'left',
    color:'#000',
    fontSize:15,
    padding: 5
  },
});

 AppRegistry.registerComponent(
   'reactNativeBeaconExample',
   () => reactNativeBeaconExample
);