import React, { Component } from 'react';
import {AsyncStorage, ScrollView, AppRegistry, StyleSheet, Text, View,Alert, TextInput, TouchableOpacity,
    ImagePickerIOS, Image, KeyboardAvoidingView, StatusBar,Modal,Dimensions,NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Platform,
    PermissionsAndroid,
    AppState,
 } from 'react-native';

var {height, width} = Dimensions.get('window');

import BleManager from 'react-native-ble-manager';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DigitalClock from './DigitalClock';
import {Button,Container,Header,Content,Left,Title,Body,Right} from 'native-base';
import MapView from 'react-native-maps';


var ImagePicker = require('react-native-image-picker');

//const window = Dimensions.get('window');
//const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class Test extends Component {
  constructor(){
    super()

    this.state = {
      scanning:false,
      peripherals: new Map(),
      appState: '',
      image: null,
      modalVisible: true,
      currentUser: [],
      User: [],
      image: null,
      imageUL: null,
      chosenDate: new Date(),
      userid: null,
      hasToken:false,
      beacon: false,
      outside: false,
      latitude: null,
      longitude: null,
      date: null,
      time: null,
      timec: null,
      location: null,
      modalNoti: false,
      pic:null,
       region: {
        latitude: 13.764884,
        longitude: 100.538265,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
        },
        today:null,
        checkin:false
    }

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.setImage = this.setImage.bind(this);
    this.checkin = this.checkin.bind(this);
    this.checkout = this.checkout.bind(this);
    this.outsideChecked = this.outsideChecked.bind(this);
    this.noti = this.noti.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.checkinCheck = this.checkinCheck.bind(this);
    this.checkinCheck1 = this.checkinCheck1.bind(this);
    this.checkinCheck2 = this.checkinCheck2.bind(this);
    this.todayAt = this.todayAt.bind(this);
    this.asd = this.asd.bind(this);
    this.AttendanceHis = this.AttendanceHis.bind(this);
    this.PhotoUL = this.PhotoUL.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
  }

 static navigationOptions = {
        title: 'CHECK-IN',
        headerLeft: null,
        tabBarLabel:'CHECK-IN',
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                name="access-time"
                size={24}
                style={{color: tintColor}}>
                </MaterialIcons>
                ///
                );
        }
    };

  componentDidMount() {
    this.asd();

    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({showAlert: false});

    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );



    if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log("Permission is OK");

            } else {
              PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("User accept");
                } else {
                  console.log("User refuse");
                }
              });
            }
      });
    }

    this.timer = setInterval(() =>
    {
        this.startScan();
    }, 2000);



  }

  asd(){

    console.log("start checkin");
    var {navigate} = this.props.navigation;

    AsyncStorage.getItem('id').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
      if (this.state.hasToken == true) {
        this.setState({ userid: token});
        console.log("idCheckIn ="+ this.state.userid);
        this.AttendanceHis();
      }
        else{

            navigate("LogIn");
          }
    });
    //this.todayAt();
  }

  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({appState: nextAppState});
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  handleUpdateValueForCharacteristic(data) {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }

  startScan() {
    if (!this.state.scanning) {
      this.setState({peripherals: new Map()});
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning11...');
        this.setState({scanning:true});
      });
    }
  }

  retrieveConnected(){
    BleManager.getConnectedPeripherals([]).then((results) => {
      console.log(results);
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
      }
    });
  }

  handleDiscoverPeripheral(peripheral){
    var peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id)){
      console.log('Got ble peripheral', peripheral);
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals })

      let list = Array.from(this.state.peripherals.values());
      console.log("bbconnn"+list.length);
      let bcon = list.length;

      if (bcon >= 1){
        this.setState({beacon:true});
        console.log("asd"+this.state.beacon);
        //this.takePhoto();
      }
    }
  }

  test(peripheral) {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let peripherals = this.state.peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            this.setState({peripherals});
          }
          console.log('Connected to ' + peripheral.id);


          setTimeout(() => {

            /* Test read current RSSI value
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);
              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
              });
            });*/

            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              console.log(peripheralInfo);
              var service = '13333333-3333-3333-3333-333333333337';
              var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
              var crustCharacteristic = '13333333-3333-3333-3333-333333330001';

              setTimeout(() => {
                BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
                  console.log('Started notification on ' + peripheral.id);
                  setTimeout(() => {
                    BleManager.write(peripheral.id, service, crustCharacteristic, [0]).then(() => {
                      console.log('Writed NORMAL crust');
                      BleManager.write(peripheral.id, service, bakeCharacteristic, [1,95]).then(() => {
                        console.log('Writed 351 temperature, the pizza should be BAKED');
                        /*
                        var PizzaBakeResult = {
                          HALF_BAKED: 0,
                          BAKED:      1,
                          CRISPY:     2,
                          BURNT:      3,
                          ON_FIRE:    4
                        };*/
                      });
                    });

                  }, 500);
                }).catch((error) => {
                  console.log('Notification error', error);
                });
              }, 200);
            });

          }, 900);
        }).catch((error) => {
          console.log('Connection error', error);
        });
      }
    }
  }

  getCurrentTime()
  {
      let hour = new Date().getHours();
      let minutes = new Date().getMinutes();
      let seconds = new Date().getSeconds();
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();

      if( minutes < 10 )
      {
          minutes = '0' + minutes;
      }

      if( seconds < 10 )
      {
          seconds = '0' + seconds;
      }


      this.setState({ time: hour + ':' + minutes});
      this.setState({ timec: hour + '.' + minutes});
      this.setState({ date: year + '-' + month + '-' + date});

      console.log('time' + this.state.timec);
      console.log(this.state.date);
      this.todayAt();
      //this.noti();

  }

  todayAt(){
    //172.20.10.3.
    fetch('http://172.20.10.3:8008/api/v1.0/todayAt', {
    //fetch('http://192.168.1.47:8008/api/v1.0/todayAt', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userid : this.state.userid,
            date : this.state.date,


        })
      })

        .then((response) => response.json())
        .then((responseData) => {
        //this.saveItem('id_token', responseData.id_token),
        //Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
        //Actions.HomePage();
       // console.log(responseData[0]),
        //this.setState({today : responseData}),
        console.log(responseData),
        //this.checkinCheck2();
        this.setState({today : responseData.length}),
        //this.setState({checkin : true}),
        console.log("today :"+this.state.today);
        //this.checkinCheck2();
        this.noti();


      })
    //
      .done();
  }

  AttendanceHis(){

    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    this.setState({ date: year + '-' + month + '-' + date});
    //172.20.10.3.
    fetch('http://172.20.10.3:8008/api/v1.0/todayAt', {
    //fetch('http://192.168.1.47:8008/api/v1.0/todayAt', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userid : this.state.userid,
            date : this.state.date,


        })
      })

        .then((response) => response.json())
        .then((responseData) => {
        //this.saveItem('id_token', responseData.id_token),
        //Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
        //Actions.HomePage();
       // console.log(responseData[0]),
        //this.setState({today : responseData}),
        console.log(responseData);
        //this.checkinCheck2();
        if (responseData.length > 0){
          this.setState({checkin : true});
        }


      })
    //
      .done();
  }



  // outsideChecked() {
  
  //     fetch('http://192.168.1.50:8003/api/v1.0/checkin', {
  //         method: 'POST',
  //         headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //             userid : this.state.userid,
  //             date : this.state.date,
  //             time : this.state.time,
  //             picture : this.state.image,
  //             location : 'Outside',
  //             latitude : this.state.latitude,
  //             longitude : this.state.longitude,
  //     //       username: this.state.username,
  //     //       password: this.state.password,
  //         })
  //       })
  
  //         .then((response) => response.json())
  //         .then((responseData) => {
  //         //this.saveItem('id_token', responseData.id_token),
  //         //Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
  //         //Actions.HomePage();
  //         console.log(responseData),
  //         this.setState({modalNoti:false});
  
  
  //       })
  //     //
  //       .done();
  // }

  checkinCheck(){
      this.getCurrentTime();
      //this.checkinCheck1();


  }

  checkinCheck1(){
    if(this.state.imageUL != null){
    var data = new FormData();
    data.append('picture', {uri: this.state.imageUL, name: 'selfie.jpg', type: 'image/jpg'});
    //this.noti();
    //Alert.alert('check');
    this.setState({pic : data});

  }

      fetch('http://172.20.10.3:8008/api/v1.0/usercheckin', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
              userid : this.state.userid,
              date : this.state.date,
              time : this.state.time,
              location : "SIIT",
              lat: this.state.latitude,
              long: this.state.longitude,
              pic:this.state.pic
      //       username: this.state.username,
      //       password: this.state.password,

          })
        })

          .then((response) => response.json())
          .then((responseData) => {
          //this.saveItem('id_token', responseData.id_token),
          //Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
          //Actions.HomePage();
         // console.log(responseData[0]),
          //this.setState({today : responseData}),
          console.log(responseData),
          this.setState({checkin : true}),
          //this.checkinCheck2();
          this.noti();
          //this.PhotoUL()


        })
      //
        .done();

  }

  PhotoUL(){
    // console.log( this.state.imageUL );
    //     if (this.state.imageUL) {
    //       // Create the form data object
    //       var data = new FormData();
    //       data.append('picture', {uri: this.state.imageUL, name: 'selfie.jpg', type: 'image/jpg'});
    //
    //       // Create the config object for the POST
    //       // You typically have an OAuth2 token that you use for authentication
    //       const config = {
    //        method: 'POST',
    //        headers: {
    //          'Accept': 'application/json',
    //          'Content-Type': 'multipart/form-data;',
    //          //'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
    //        },
    //        body: data,
    //       }
    //
    //       fetch("https://postman-echo.com/post", config)
    //        .then((responseData) => {
    //            // Log the response form the server
    //            // Here we get what we sent to Postman back
    //            console.log("lll"+responseData);
    //        })
    //        .catch(err => {
    //          console.log(err);
    //    })
    // }

  }

  checkinCheck2(){
      let today = this.state.today;
      console.log("hhh"+today);
      if (today == 0){
          //this.noti();
          this.checkinCheck1();
          // this.setState({checkin : true});
          }
      else {
          console.log("out");
          //Alert.alert("You have check-in already.");
          // this.setState({checkin: true});
          this.checkout();
      }


  }



  checkin() {

  // clearInterval(this.timer);

  //this.startScan();

  if (this.state.beacon == true){
      //this.noti();
      //this.getCurrentTime();
      this.takePhoto();
      //this.noti();
  }

  else if (this.state.outside == true){

      navigator.geolocation.getCurrentPosition(
     (position) => {
       console.log("checkin outside");
       //console.log(position);
       this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
     
         //error: null,
       });
       this.setState({
         region:{latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,}
     
         //error: null,
       });
       console.log("location w longitude : " + this.state.longitude + " latitude : " + this.state.latitude);
       this.getCurrentTime();
       //this.outsideChecked();
       //this.state.checkinCheck1();
       //this.noti();
     },
     (error) => this.setState({ error: error.message }),
     { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
     
       //Alert.alert('Success');

  }
  else{
    //this.noti();
    this.getCurrentTime();
    //this.takePhoto();
      //Alert.alert('You are not in location');
  }
  }

  checkout(){
    if(this.state.imageUL != null){
    var data = new FormData();
    data.append('picture', {uri: this.state.imageUL, name: 'selfie.jpg', type: 'image/jpg'});
    //this.noti();
    //Alert.alert('check');
    this.setState({pic : data});

  }
    //Alert.alert("You have check-in already.");
    fetch('http://172.20.10.3:8008/api/v1.0/usercheckout', {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userid : this.state.userid,
            date : this.state.date,
            time : this.state.time,
            pic:this.state.pic
            // location : "SIIT",
            // lat: this.state.latitude,
            // long: this.state.longitude,
    //       username: this.state.username,
    //       password: this.state.password,

        })
      })

        .then((response) => response.json())
        .then((responseData) => {
        console.log(responseData),
        this.noti();


      })
    //
      .done();

  }



      noti(){
        if (this.state.modalNoti == true){
          this.setState({modalNoti:false});
        }
        else{
          this.setState({modalNoti:true});
        }
        }

        back(){

           this.setState({modalNoti:false});

        }


        onRegionChange(region) {
              this.setState({ region });
          }


      // listeningForUser() {
      // this.User.on('value', (snapshot) => {
      //   console.log("User:", snapshot.val());
      //   this.setState({
      //     User: snapshot.val() || []
      //   });
      // })

      // console.log(this.state.User);

      // }

// componentDidMount() {
//   this.listeningForcurrentUser();
// }

  takePhoto(){
    clearInterval(this.timer);
    ImagePicker.launchCamera({noData: true }, this.setImage);
    //this.noti();
  }

  setImage(response){
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      //If it is iOS, remove 'file://' prefix
      let source = {uri: response.uri.replace('file://', ''), isStatic: true};
      this.setState({image: source});
      this.setState({imageUL: 'file://'+source.uri});
      console.log("imagepp ="+this.state.imageUL);
      this.getCurrentTime();
      //If android, don't need to remove the 'file://'' prefix
      if (Platform.OS === 'android') {
        source = {uri: response.uri, isStatic: true};
      }

      //this.noti();

    }
  }

  render() {
    //const list = Array.from(this.state.peripherals.values());
    //const dataSource = ds.cloneWithRows(list);


    return (

      <Container>
      <Header>
          <Left>

          </Left>
          <Body  style={styles.body}>
              <Title>CheckMeIn</Title>
          </Body>
          <Right>
          </Right>
      </Header>


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
       <View style={{flex: 1}}>

       {(this.state.beacon == true) &&
         <View style={styles.map}>
           <Image style={{flex: 1}} source={this.state.image}></Image>
         </View>
       }

        {(this.state.outside == true) &&
         <MapView style={styles.map}
                              region={this.state.region}
                              onRegionChange={this.onRegionChange}
                            >

                            <MapView.Marker
                               coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}}
                               title="Victory Monument"
                               description="A large military monument in Bangkok, Thailand."
                             />
                    </MapView>
       }

       </View>
           <View style={styles.formContainer}>
            <View style={styles.db3}>

             <Text style={styles.modaltext}>Date : {this.state.date}</Text>
             <Text style={styles.modaltext}>Time : {this.state.time}</Text>
             <Text style={styles.modaltext}>Location : {this.state.latitude}</Text>
             <Text style={styles.modaltext}>                  {this.state.longitude}</Text>
           </View>
               <View style={styles.formButton}>
                   <View style={styles.db}>
                       <TouchableOpacity style={[styles.button,{backgroundColor: 'rgb(0, 153, 115)'}]}  onPress = {() => this.checkinCheck2()}>
                           <Text style={styles.Approve} >
                             Confirm
                           </Text>

                       </TouchableOpacity>
                   </View>
               </View>
           </View>
       </Content>
     </Container>
    </Modal>


           <Content ContentContainerStyle={{
               flex:1,
               alignItems: 'center',
               justifyContent: 'center',
           }}>
               <View style={styles.DigitalClock}>

                        <DigitalClock />

               </View>
               <View style={styles.formContainer}>
               {(this.state.checkin == true) &&
                 <TouchableOpacity style={[styles.button,{backgroundColor: '#990000'}]}  onPress={() => this.checkin() }>
                     <Text style={styles.textBtn}>CHECK OUT</Text>
                 </TouchableOpacity>
               }
               {(this.state.checkin == false) &&
                 <TouchableOpacity style={[styles.button,{backgroundColor: '#e59400'}]}  onPress={() => this.checkin() }>
                     <Text style={styles.textBtn}>CHECK IN</Text>
                 </TouchableOpacity>
               }


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
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: 40
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 100,
        width: 100
    },
    title: {
        color: '#FFF',
        width: 160,
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 15
    },
    textBtn: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    button: {
        paddingVertical: 10,
        marginVertical: 5
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    formContainer: {
        flex:1,
        padding: 20,
        marginBottom:100
    },
    DigitalClock: {
        flex:2,
        paddingTop: 100,
        marginBottom:100
    },
    db3:{
    flex:1,
    padding:10
  },
  detail:{
    textAlign:'right',
    color:'white',
    fontSize:13,
    padding:5
  },
  hdetail:{
    textAlign:'right',
    fontSize: 15,
    color: '#fff',
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
    modalimg:{
      alignItems:'center',
    width:200,
    height:200,
    margin:20
    },
      map:{
    width: width,
    height: height/2
}

});
