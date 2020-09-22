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
  Picker,
  Alert
}                             from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon,Button,Container,Header,Content,Left,Title,Body,Right} from 'native-base';


export default class EmployeeAttendanceHis extends React.Component {

constructor(props) {
   super(props);
   this.state = {
       hasToken:false,
       chosenDate: new Date(),
       modalVisible: false,
       userid: null,
       AttendanceHis:[],
       subordinate:[],
       user: 0,
       Epicker: false,
       name:[],
       reportid:null,
       PositionID:null,
       subid:null,
       date:null,
       today:[]
   };

   this.setDate = this.setDate.bind(this);
   this.AttendanceHis = this.AttendanceHis.bind(this);
   this.AttendanceHis1 = this.AttendanceHis1.bind(this);
   //this.Search = this.Search.bind(this);
   this.employeepicker = this.employeepicker.bind(this);
   this.subordinate = this.subordinate.bind(this);
   this.name = this.name.bind(this);
   this.userinfo = this.userinfo.bind(this);
   this.subid = this.subid.bind(this);

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
 employeepicker(){
   if (this.state.Epicker == false){
     this.setState({Epicker:true})
   }
   else{
     this.setState({Epicker:false});
     this.setState({subid:this.state.subordinate[this.state.user].IdentificationNo});
     console.log("Confirm"+this.state.subordinate[this.state.user].IdentificationNo);
   }
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
       this.userinfo();

     }
       else{

           //navigate("LogIn");
         }
   });

 }

userinfo(){
  console.log("user"+this.state.userid);
  fetch('http://172.20.10.3:8008/api/v1.0/userinfo', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userid : this.state.userid


             // "requesttype": requesttype,
             //  "requestid": requestid,
             //  "notiTo": notiTo
        })
      })

        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.length != 0){
            console.log("reportto"+responseData);
          this.setState({PositionID:responseData[0].PositionID});
          console.log("PositionID"+responseData[0].PositionID);
           //Alert.alert("PositionID"+this.state.PositionID);
           this.subordinate();
          }
          else{
            Alert.alert("PositionID Fail");
          }

      })
    //
      .done();
}

 subordinate(){
   var {navigate} = this.props.navigation;
   //fetch('http://192.168.1.49:8003/api/v1.0/checkmein')
   fetch('http://172.20.10.3:8008/api/v1.0/subordinateinfo', {
           method: 'POST',
           headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
           body: JSON.stringify({
             PositionID: this.state.PositionID,

           })
         })
   .then((response) => response.json())
   .then((responseData) => {
   //this.saveItem('id_token', responseData.id_token),
   //Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
   //Actions.HomePage();
   //console.log(responseData),
   this.setState({ subordinate: responseData});
   //Alert.alert("subordinate = "+this.state.subordinate.length);
   console.log("subordinate = "+this.state.subordinate.length);
   this.name();

 })
//
 .done();

   }

 updateUser = (user) => {
     this.setState({ user: user });
     this.subid();
  }

  subid(){
     let a = this.state.user ;
      this.setState({ subid: this.state.subordinate[a].IdentificationNo });
      console.log("updateUser = " +this.state.subid);
      console.log("updateUser = " +a);
   }

   ToAttendanceHis(){
     let date = new Date().getDate();
     let month = new Date().getMonth() + 1;
     let year = new Date().getFullYear();
     console.log("ToAttendanceHis = "+ year + '-' + month + '-' + date);

     this.setState({ date: year + '-' + month + '-' + date});
     fetch('http://172.20.10.3:8008/api/v1.0/todayAt', {
         method: 'POST',
         headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
         body: JSON.stringify({
             userid : this.state.subid,
             date : this.state.date
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
         //this.setState({todaydate : responseData[0].Date}),
         //this.checkinCheck2();
         this.setState({today : responseData}),
         //this.setState({checkin : true}),
         console.log("today :"+this.state.today[0].PictureOut.uri);
         //this.date();
         //this.checkinCheck2();
         //this.noti();
         }
         else{

         }


       })
     //
       .done();
      }



 AttendanceHis(){
   //this.ToAttendanceHis();
   this.AttendanceHis1();
   //Alert.alert("subordinate = "+this.state.subid);

   }

   AttendanceHis1(){

       fetch('http://172.20.10.3:8008/api/v1.0/AtHis', {
               method: 'POST',
               headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  userid : this.state.subid

               })
             })
       .then((response) => response.json())
       .then((responseData) => {

         if (responseData.length != 0){
           console.log(responseData),
           this.setState({ AttendanceHis: responseData});
           console.log(this.state.AttendanceHis);
         }
         else{
           console.log("AttendanceHis1 fail");
         }


     })
   //
     .done();


     }

   name(){
     let r = this.state.subordinate;
     console.log(r.length);
     for(let i = 0; i < r.length; i++) {
       this.setState({name: [...this.state.name, this.state.subordinate[i].FirstName+" "+this.state.subordinate[i].LastName]});
       console.log(this.state.name);
   }
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
             visible={this.state.Epicker}
             animationType={'slide'}
             onRequestClose={() => this.employeepicker()}
             transparent={'true'}
            >
             <View style={styles.Container1}>
               <Header style={styles.modalHead}>
               <Left>
                  <TouchableOpacity onPress = {() => this.employeepicker()}>
                   <Text>
                       Cancle
                   </Text>
                  </TouchableOpacity>
               </Left>
               <Right>
                   <TouchableOpacity onPress = {() => this.employeepicker()}>
                   <Text>
                       Confirm
                   </Text>
                  </TouchableOpacity>
               </Right>
               </Header>
                           <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>

                              {this.state.subordinate.map((obj, i) =>
                               <Picker.Item label ={this.state.name[i]} value = {i} />
                            )}
                           </Picker>
               </View>

            </Modal>

                   <View style={styles.formContainer}>

                   {this.state.today.map((obj, i) =>
                      <View style={[styles.s2]}>
                       <TouchableOpacity style={styles.db} onPress={() => this.noti(i)}>
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

                           <View style={styles.formDate}>
                           <Text style={styles.Text}>
                               Subordinate
                           </Text>

                           <TextInput
                               style={styles.input}
                               placeholder={this.state.name[this.state.user]}
                               autoCorrect={false}
                               autoCapitalize={'none'}
                               placeholderTextColor={'#e6e6ff'}
                               returnKeyType={'next'}
                               onSubmitEditing={() => this.passwordInput.focus()}
                               enablesReturnKeyAutomatically={true}
                           />
                           <Icon name="calendar" style={styles.icon} onPress={() => this.employeepicker()}/>
                           </View>

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


                           <TouchableOpacity style={[styles.button,{backgroundColor: '#D95E54'}]} onPress={() => this.AttendanceHis()}>
                               <Text style={styles.textBtn}>
                                 SEARCH
                               </Text>

                           </TouchableOpacity>



                           </View>

                           {this.state.AttendanceHis.map((obj, i) =>
                            <View style={[styles.s1,{backgroundColor: 'rgb(240, 245, 245)'}]}>
                             <View style={styles.db}>
                             <Image style={styles.img1} source={require('./img/man.png')}/>
                             </View>

                             <View style={styles.db2}>
                             <Text style={styles.hdetail}>{obj.Date}</Text>
                             <Text style={styles.detail}>Time :     In {obj.CheckIN}</Text>
                             <Text style={styles.detail}>Out {obj.CheckOUT}</Text>
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

   },
   textBtn: {
       fontSize: 15,
       color: '#fff',
       textAlign: 'center',
       fontWeight: '700',

   },
   Container1: {
       flex: 1,
       marginTop:350,
       //marginBottom:20,
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
 //backgroundColor:'rgb(147, 108, 108)',
 flexDirection:'row',
 borderWidth: 1,
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
 modalHead:{
   height:40
 },
Text1: {
fontSize: 20,
padding:10,
width:100,
color: ' rgb(128, 128, 128)',
fontWeight: '700',
},
s2: {
margin : 10,
padding:15,
//backgroundColor:'rgb(147, 108, 108)',
flexDirection:'row',
//borderWidth: 1,
},
db2:{
flex:2
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
});

AppRegistry.registerComponent(
  'reactNativeBeaconExample',
  () => reactNativeBeaconExample
);
