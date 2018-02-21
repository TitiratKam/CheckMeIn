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
   Image
 }                             from 'react-native';
 import Beacons                from 'react-native-beacons-manager';
 import BluetoothState         from 'react-native-bluetooth-state';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon,Button,Container,Header,Content,Left,Right} from 'native-base';


export default class Notification extends React.Component {

constructor(props) {
    super(props);
    this.state = { 


    };
    this.noti = this.noti.bind(this);

  }
noti(){
  
     var {navigate} = this.props.navigation;
      
      navigate("RequestDetail")

  }


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

                    <View style={styles.formContainer}>
                        
                          
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
        //marginBottom:100,
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
  detail:{
    textAlign:'right',
    color:'white',
    fontSize:13,
  },
  hdetail:{
    textAlign:'right',
    fontSize: 15,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 10
  },
});

 AppRegistry.registerComponent(
   'reactNativeBeaconExample',
   () => reactNativeBeaconExample
);