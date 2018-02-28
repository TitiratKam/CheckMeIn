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
// import Firestack from 'react-native-firestack';
 import Beacons                from 'react-native-beacons-manager';
 import BluetoothState         from 'react-native-bluetooth-state';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';
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
//const firestack = new Firestack();

export default class TestRequest extends React.Component {

constructor(props) {
    super(props);
    this.database = firebase.database();
    this.state = { 
        chosenDate: new Date(),
        modalDateFrom: false,
        modalDateTo: false,
        name: 'Jasper Smith',
        dateFrom: " ",
        dateTo: " ",
        leaveType: '1'
    };

    
    this.leaveRequestRef = this.database.ref('leaveRequest');
    this.setDate = this.setDate.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.setDateFrom = this.setDateFrom.bind(this);
    this.setDateTo = this.setDateTo.bind(this);
    this.openDateFrom = this.openDateFrom.bind(this);
    this.openDateTo = this.openDateTo.bind(this);
    this.sendRequest = this.sendRequest.bind(this);

  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
    console.log(this.state.chosenDate);
  }
  setDateFrom() {
    
    

    var date = this.state.chosenDate.getDate();
    var month = this.state.chosenDate.getMonth() + 1;
    var year = this.state.chosenDate.getFullYear();

    this.setState({dateFrom: year + '-' + month + '-' + date});
    this.setState({chosenDate: new Date() });

    this.setState({modalDateFrom:false});


  }
  setDateTo() {
    var date = this.state.chosenDate.getDate();
    var month = this.state.chosenDate.getMonth() + 1;
    var year = this.state.chosenDate.getFullYear();

    this.setState({dateTo: date + '-' + month + '-' + year});
    this.setState({chosenDate: new Date() });

    this.setState({modalDateTo:false});

  }
  openDateFrom() {
    this.setState({modalDateFrom:true});
  }
  openDateTo() {
    this.setState({modalDateTo:true});
  }
  closeDate() {
    this.setState({modalDateFrom:false});
    this.setState({modalDateTo:false});
  }

  onChangeText(text) {
      this.setState({ leaveType: text });
      
}

    sendRequest(){

      
    this.leaveRequestRef.transaction((leaveRequest) => {
      if (!leaveRequest) {
        leaveRequest = [];
      }
      leaveRequest.push({name: this.state.name, 
                        dateFrom: this.state.dateFrom, 
                        dateTo: this.state.dateTo,
                        leaveType: this.state.leaveType});
      
      return leaveRequest;
      });
      Alert.alert("Sent");
  }


 

static navigationOptions = {
        title: 'Test Request',
        headerLeft: null,
        tabBarLabel:'Test Request',
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                name="card-travel"
                size={24}
                style={{color: tintColor}}>
                </MaterialIcons>
                );
        }
    };

    render() {

      let data = [{
        value: 'Holiday',
      }, {
        value: 'Sick leave',
      }, {
        value: 'Family care leave',
      }];
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
              visible={this.state.modalDateFrom}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
              transparent={'true'}
             >
             
              <View style={styles.Container1}>
                <Header>
                <Left>
                   <TouchableOpacity onPress = {() => this.closeDate()}>
                    <Text>
                        Cancle
                    </Text>
                   </TouchableOpacity>
                </Left>
                <Right>
                    <TouchableOpacity onPress = {() => this.setDateFrom()}>
                    <Text>
                        Confirm
                    </Text>
                   </TouchableOpacity>
                </Right>
                </Header>
                <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                    mode ='date'
                    />
                </View>
             </Modal>

             <Modal
              state={styles.modal}
              visible={this.state.modalDateTo}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
              transparent={true}             >
             
              <View style={styles.Container1}>
                <Header>
                <Left>
                   <TouchableOpacity onPress = {() => this.closeDate()}>
                    <Text>
                        Cancle
                    </Text>
                   </TouchableOpacity>
                </Left>
                <Right>
                    <TouchableOpacity onPress = {() => this.setDateTo()}>
                    <Text>
                        Confirm
                    </Text>
                   </TouchableOpacity>
                </Right>
                </Header>
                <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                    mode ='date'
                    />
                </View>
             </Modal>

                    <View style={styles.formContainer}>
                            <Text style={styles.detail}>Absent Type</Text>
                             <Dropdown
                                label='Select'
                                data={data}
                                onChangeText={this.onChangeText}
                              />
                            
                            <Text style={styles.hdetail}>Date</Text>
                            <View style={styles.formDate}>

                            
                            <Text style={styles.Text}>
                                From
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholder={this.state.dateFrom}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                placeholderTextColor={' rgb(153, 153, 153)'}
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                enablesReturnKeyAutomatically={true}
                            />
                            <Icon name="calendar" style={styles.icon} onPress={() => this.openDateFrom()}/>
                            </View>
                            <View style={styles.formDate}>

                            
                            <Text style={styles.Text}>
                                To
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholder={this.state.dateTo}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                placeholderTextColor={' rgb(153, 153, 153)'}
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                enablesReturnKeyAutomatically={true}
                            />
                            <Icon name="calendar" style={styles.icon} onPress={() => this.openDateTo()}/>
                            </View>

                            
                            <Text style={styles.hdetail}>Comment</Text>
                            <TextInput
                                style={styles.comment}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                placeholder={"Comment"}
                                placeholderTextColor={' rgb(59, 43, 43)'}
                                returnKeyType={'go'}
                                ref={(input) => this.passwordInput = input}
                            />
                    

                            <TouchableOpacity style={[styles.button,{backgroundColor: '#D95E54'}]} onPress={() => this.sendRequest()}>
                                <Text style={styles.textBtn}>
                                  SEND
                                </Text>
                                
                            </TouchableOpacity>
                    </View>

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
        marginVertical: 5,

    },
    textBtn: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',

    },
    Container1: {
        flex: 1,
        marginTop:320,
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
        marginBottom:100,
    },
    formDate: {
        flexDirection:'row',
    },
    modal: {
        alignItems:'center',
        justifyContent:'center',
    },
    img1:{
    width:90,
    height:90,
    },
    s1: {
    margin : 10,
  padding:15,
  backgroundColor:'rgb(147, 108, 108)',
  flexDirection:'row',
  },
  db:{
    flex:1
  },
  db2:{
    flex:2
  },
  hdetail:{
    textAlign:'left',
    fontSize: 15,
    color: '#000',
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10
  },
  detail:{
    textAlign:'left',
    fontSize: 15,
    color: '#000',
    fontWeight: '700',
  },
  comment: {
        height: 200,
        backgroundColor: 'rgb(240, 245, 245)',
        marginBottom: 10,
        color: '  rgb(59, 43, 43)',
        paddingHorizontal: 10
    },
});

 AppRegistry.registerComponent(
   'reactNativeBeaconExample',
   () => reactNativeBeaconExample
);