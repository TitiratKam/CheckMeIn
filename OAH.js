'use strict';
 import React, {
  Component
} from 'react';
import {
 AsyncStorage,
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
  Dimensions
}                             from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon,Button,Container,Header,Content,Left,Title,Body,Right} from 'native-base';
//import MapView from 'react-native-maps';
var {height, width} = Dimensions.get('window');

const options = {
       title: 'Select photo',
       takePhotoButtonTitle : 'Take a photo',
       chooseFromLibaryButtonTitle : 'Choose photo from libary',
       quality: 1
   };

export default class OwnAttendanceHis extends React.Component {

constructor(props) {
   super(props);
   this.state = {
       hasToken:false,
       chosenDate: new Date(),
       modalVisible: false,
       modalNoti: false,
       userid: null,
       AttendanceHis:[],
       date:null,
       today:[],
       region: {
       latitude: 13.764884,
       longitude: 100.538265,
       latitudeDelta: 0.005,
       longitudeDelta: 0.005,
       deatetoday:null,
       todaydate:null,
       AtDate:[]
       },
   };

   this.setDate = this.setDate.bind(this);
   this.AttendanceHis = this.AttendanceHis.bind(this);
   this.getCurrentTime = this.getCurrentTime.bind(this);
   this.ToAttendanceHis = this.ToAttendanceHis.bind(this);
   this.noti = this.noti.bind(this);
   this.setAtDate = this.setAtDate.bind(this);
   this.onRegionChange = this.onRegionChange.bind(this);


 }

 setDate(newDate) {
   this.setState({chosenDate: newDate})
 }
 openModal() {
   this.setState({modalVisible:true});
 }
 closeModal() {
   this.setState({modalVisible:false});
 }

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

componentDidMount() {
   AsyncStorage.getItem('id').then((token) => {
     this.setState({ hasToken: token !== null, isLoaded: true })
     if (this.state.hasToken == true) {
       this.setState({ userid: token});
       console.log("id ="+this.state.userid);
       this.getCurrentTime();
     }
       else{

           //navigate("LogIn");
         }
   });

 }

 getCurrentTime() {
     let hour = new Date().getHours();
     let minutes = new Date().getMinutes();
     let seconds = new Date().getSeconds();
     let date = new Date().getDate();
     let month = new Date().getMonth() + 1;
     let year = new Date().getFullYear();
     //let date = new Date();

       //this.setState({ time: hour + ':' + minutes});
       //this.setState({ todaydate: date + '-' + month + '-' + year});
      //  this.setState({ todaydate: year + '-' + month + '-' + date});
       let date12 = year + '-' + month + '-' + date;
       console.log('hhhjjjkkk'+date12);
       this.setState({deatetoday:date12});
       //this.setState({modalVisible:true});
       //console.log("datedate"+date);
       //console.log("dateee"+this.state.deatetoday);
       this.ToAttendanceHis(date12);
   }


ToAttendanceHis(date){
  var date1 = date;
  console.log("gfdsa"+date1);
  fetch('http://172.20.10.3:8008/api/v1.0/todayAt', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
          userid : this.state.userid,
          date : date1,


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
      //let date = responseData[0].Date.getDate();
      if (responseData.length != 0){
      console.log("todaydate = "+responseData[0].Date),
      //console.log("todaydate = "+responseData[0].PictureOut._parts.picture),
      this.setState({todaydate : responseData[0].Date}),
      //this.checkinCheck2();
      this.setState({today : responseData}),
      //this.setState({checkin : true}),
      //console.log("today :"+this.state.today[0].PictureOut.uri),
      this.date();
      //this.checkinCheck2();
      //this.noti();
      }
      else{

      }


    })
  //
    .done();
   }

date(){
  var date = this.state.todaydate;
  var sdt = date.split("T");

  console.log("kkk"+sdt[0]);
  this.setState({todaydate : sdt[0]});
}



   AttendanceHis(){

       fetch('http://172.20.10.3:8008/api/v1.0/AtHis', {
               method: 'POST',
               headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  userid : this.state.userid

               })
             })
       .then((response) => response.json())
       .then((responseData) => {

         if (responseData.length != 0){
           console.log(responseData),
           this.setState({ AttendanceHis: responseData});
           console.log("ggk"+this.state.AttendanceHis);
           this.setAtDate();
         }
         else{
           console.log("ouw his fail");
         }




     })
   //
     .done();


     }

     setAtDate() {
       var strdate = this.state.AttendanceHis;
       var strdate2 = this.state.AttendanceHis.length;
       console.log("AtDateyy"+strdate[0].Date);
       console.log("AtDateyy ="+strdate2);
       //for (var x = 0; x < data.length; x++) {
       for (var i=0; i<strdate2; i++){
         var sdt = strdate[i].Date;
         var sdt1 = sdt.split("T");
         console.log("AtDategg"+sdt);
         //this.setState({startdate : sdt1[0]});
         console.log("AtDategg: "+sdt1[0]);
         this.setState({AtDate: [...this.state.AtDate, sdt1[0]]});
         console.log("srtdate: "+this.state.AtDate);

       }
     }

    noti(){

        this.setState({modalNoti:true});
        //this.state.today

         }
         back(){

            this.setState({modalNoti:false});

         }
onRegionChange(region) {
               this.setState({ region });
           }

   render() {
       return (
       <Container>


           <Header>
               <Left>
                   <Icon name="ios-menu" onPress={() =>
                       this.props.navigation.navigate('DrawerOpen')}/>
               </Left>
               <Body  style={styles.body}>
                   <Title>Attendance History</Title>
               </Body>
               <Right>
               </Right>
           </Header>

           <Content ContentContainerStyle={{
               flex:1,
               alignItems: 'center',
               justifyContent: 'center',
            }}>

            <Modal
             state={styles.modal}
             visible={this.state.modalVisible}
             animationType={'slide'}
             onRequestClose={() => this.closeModal()}
             transparent={'true'}
            >

             <View style={styles.Container1}>
               <Header>
               <Left>
                  <TouchableOpacity onPress = {() => this.closeModal()}>
                   <Text>
                       Cancle
                   </Text>
                  </TouchableOpacity>
               </Left>
               <Right>
                   <TouchableOpacity onPress = {() => this.closeModal()}>
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
            {this.state.today.map((obj, i) =>
             <View style={styles.map}>


              </View>


             )}
            </Content>
          </Container>
         </Modal>




                           <Text style={styles.Text1}>
                               Today
                           </Text>


                         {this.state.today.map((obj, i) =>
                            <View style={[styles.s2]}>
                             <TouchableOpacity style={styles.db} onPress={() => this.noti()}>
                             <Image style={styles.timg1} source={require('./img/check.png')} />
                             </TouchableOpacity>

                             <View style={styles.db2}>

                             <View style={styles.talkBubble}>
                               <View style={styles.talkBubbleSquare}>
                                 <Text style={styles.thdetail}>{this.state.deatetoday}</Text>
                               </View>
                               <View style={styles.talkBubbleTriangle} />
                             </View>

                             <View style={styles.talkBubble}>
                               <View style={styles.talkBubbleSquare1}>
                                 <Text style={styles.tdetail}>Check-IN : {obj.CheckIN}</Text>
                                 <Text style={styles.tdetail}>Location : {obj.Location}</Text>
                               </View>
                             </View>

                             {(obj.CheckOUT != null) &&
                               <View style={styles.talkBubble}>
                                 <View style={styles.talkBubbleSquare1}>
                                   <Text style={styles.tdetail}>Check-OUT  : {obj.CheckOUT}</Text>
                                   <Text style={styles.tdetail}>Location : {obj.Location}</Text>
                                 </View>
                               </View>
                             }



                             </View>

                           </View>)}
                           <View style={styles.formContainer}>

                           <View style={styles.formDate}>
                           <Text style={styles.Text}>
                               From
                           </Text>

                           <TextInput
                               style={styles.input}
                               placeholder={this.state.chosenDate}
                               autoCorrect={false}
                               autoCapitalize={'none'}
                               placeholderTextColor={'#e6e6ff'}
                               returnKeyType={'next'}
                               onSubmitEditing={() => this.passwordInput.focus()}
                               enablesReturnKeyAutomatically={true}
                           />
                           <Icon name="calendar" style={styles.icon} onPress={() => this.openModal()}/>
                           </View>

                           <View style={styles.formDate}>
                           <Text style={styles.Text}>
                               To
                           </Text>

                           <TextInput
                               style={styles.input}
                               placeholder={this.state.chosenDate}
                               autoCorrect={false}
                               autoCapitalize={'none'}
                               placeholderTextColor={'#e6e6ff'}
                               returnKeyType={'next'}
                               onSubmitEditing={() => this.passwordInput.focus()}
                               enablesReturnKeyAutomatically={true}
                           />
                           <Icon name="calendar" style={styles.icon} onPress={() => this.openModal()}/>
                           </View>


                           <TouchableOpacity style={[styles.button,{backgroundColor: 'rgb(51, 77, 77)'}]}  onPress={() => this.AttendanceHis()}>
                               <Text style={styles.textBtn}>
                                 SEARCH
                               </Text>

                           </TouchableOpacity>



                           </View>

                            {this.state.AttendanceHis.map((obj, id) =>
                            <View style={[styles.s1,{backgroundColor: 'rgb(240, 245, 245)'}]}>
                             <View style={styles.db}>
                             <Image style={styles.img1} source={require('./img/man.png')}/>
                             </View>

                             <View style={styles.db2}>
                             <Text style={styles.hdetail}>{obj.Date}</Text>
                             <Text style={styles.detail}>IN : {obj.CheckIN}</Text>
                              <Text style={styles.detail}>OUT : {obj.CheckOUT}</Text>
                             <Text style={styles.detail}>Location : {obj.Location}</Text>
                             </View>

                           </View>)}



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
   body: {
       alignItems: 'center',
       justifyContent: 'center',
   },
   button: {
       paddingVertical: 10,
       marginVertical: 5,
       borderRadius: 30,


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
  Text1: {
    fontSize: 20,
    padding:10,
    width:100,
    color: ' rgb(128, 128, 128)',
    fontWeight: '700',
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
   timg1:{
   width:50,
   height:50,
   },
   s1: {
   margin : 10,
 padding:15,
 //backgroundColor:'rgb(147, 108, 108)',
 flexDirection:'row',
 borderWidth: 1,
 },
 s2: {
   margin : 10,
 padding:15,
 //backgroundColor:'rgb(147, 108, 108)',
 flexDirection:'row',
 //borderWidth: 1,
 },

 db:{
   flex:1
 },
 db2:{
   flex:2
 },
 detail:{
   textAlign:'right',
   color:'#293d3d',
   fontSize:13,
 },
 hdetail:{
   textAlign:'right',
   fontSize: 15,
   color: '#1f2e2e',
   fontWeight: '700',
   marginBottom: 10
 },
 tdetail:{
   textAlign:'right',
   color:' rgb(51, 0, 0)',
   fontSize:15,
   fontWeight: '500',
   marginRight: 10
 },
 thdetail:{
   textAlign:'center',
   fontSize: 17,
   color: 'white',
   fontWeight: '700',
   margin: 5
 },
  talkBubble: {
   backgroundColor: 'transparent'
 },
 talkBubbleSquare: {
   paddingVertical: 10,
   marginVertical: 5,
   backgroundColor: 'rgb(41, 163, 102)',
   borderRadius: 10
 },
 talkBubbleSquare1: {
   paddingVertical: 10,
   marginVertical: 5,
   backgroundColor: 'rgb(230, 242, 255)',
   borderRadius: 10
 },
 talkBubbleTriangle: {
   position: 'absolute',
   left: -26,
   top: 18,
   width: 0,
   height: 0,
   borderTopColor: 'transparent',
   borderTopWidth: 10,
   borderRightWidth: 26,
   borderRightColor: 'rgb(41, 163, 102)',
   borderBottomWidth: 10,
   borderBottomColor: 'transparent'
 },
  modalimg:{
     alignItems:'center',
   width:200,
   height:200,
   margin:20
   },
     map:{
   width: width,
   height: height
},
modaltext:{
   textAlign:'left',
   color:'#000',
   fontSize:15,
   padding: 5
 },
 formContainer: {
       flex:1,
       padding: 20,
       marginBottom:100
   },
});

AppRegistry.registerComponent(
  'reactNativeBeaconExample',
  () => reactNativeBeaconExample
);
