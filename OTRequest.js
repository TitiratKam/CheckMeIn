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
  Alert
}                             from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon,Button,Container,Header,Content,Left,Title,Body,Right} from 'native-base';


export default class OTRequest extends React.Component {

constructor(props) {
   super(props);
   this.state = {
       chosenDate: new Date(),
       chosenTime: new Date(),
       modalDateFrom: false,
       modalSTime: false,
       modalETime: false,
       date: false,
       strdate : new Date(),
       sTime: new Date(),
       eTime: new Date(),
       userid:null,
       reportto:"",
       comment: null,
   };

   this.setDateFrom = this.setDateFrom.bind(this);
   this.setDate = this.setDate.bind(this);
   this.setTime = this.setTime.bind(this);
   this.setSTime = this.setSTime.bind(this);
   this.setETime = this.setETime.bind(this);
   this.addOTrequest = this.addOTrequest.bind(this);
 }

 componentDidMount() {
   var {navigate} = this.props.navigation;

    AsyncStorage.getItem('id').then((token) => {
     this.setState({ hasToken: token !== null, isLoaded: true })
     if (this.state.hasToken == true) {
       this.setState({ userid: token});
       console.log("id ="+ this.state.userid);
       this.userinfo();
     }
       else{
           }
   });

   //  AsyncStorage.multiGet(['email', 'password']).then((data) => {
   //     let email = data[0][1];
   //     let password = data[1][1];

   //     if (email !== null)
   //         //Your logic
   // });
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
          console.log("reportto"+responseData);
        this.setState({reportto:responseData[0].Reportto});
         //Alert.alert('Sent');

      })
    //
      .done();
}

 setDate(newDate) {
   this.setState({chosenDate: newDate})
 }

 setTime(newDate) {
   this.setState({chosenTime: newDate})
 }

 setDateFrom() {



   var date = this.state.chosenDate.getDate();
   var month = this.state.chosenDate.getMonth() + 1;
   var year = this.state.chosenDate.getFullYear();

   this.setState({strdate: year + '-' + month + '-' + date});
   this.setState({chosenDate: new Date() });

   this.setState({modalDateFrom:false});


 }

 setSTime() {
   let hour = this.state.chosenTime.getHours();
   let minutes = this.state.chosenTime.getMinutes();
   let seconds = this.state.chosenTime.getSeconds();
    if( minutes < 10 )
       {
           minutes = '0' + minutes;
       }

       if( seconds < 10 )
       {
           seconds = '0' + seconds;
       }
  var time = hour + ':' + minutes;
    this.setState({ sTime:time});
   console.log("OTTime"+time);
   this.setState({modalSTime:false});

 }

 setETime() {
   let hour = this.state.chosenTime.getHours();
   let minutes = this.state.chosenTime.getMinutes();
   let seconds = this.state.chosenTime.getSeconds();
    if( minutes < 10 )
       {
           minutes = '0' + minutes;
       }

       if( seconds < 10 )
       {
           seconds = '0' + seconds;
       }
  var time = hour + ':' + minutes;
  this.setState({ eTime:time});
    //this.setState({ time: hour + ':' + minutes});
   console.log("OTTime"+time);

   this.setState({modalETime:false});

 }

 openDateFrom() {
   this.setState({modalDateFrom:true});

 }
closeDate() {
   this.setState({modalDateFrom:false});
   this.setState({modalSTime:false});
   this.setState({modalETime:false});
 }
 openSTime() {
   this.setState({modalSTime:true});

 }
 openETime() {
   this.setState({modalETime:true});
 }

 addOTrequest(){


   fetch('http://172.20.10.3:8008/api/v1.0/overtimerequest', {
         method: 'POST',
         headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
         body: JSON.stringify({
            //var userid = request.body.userid;
            //var starttime = request.body.starttime;
            //var endtime = request.body.endtime;
            //var AbsentDuration = request.body.AbsentDuration;
            //var Reason = request.body.Reason;
            //var Reportto = request.body.Reportto;
            //var strdate = request.body.strdate;

             userid : this.state.userid,
             starttime : this.state.sTime,
             endtime : this.state.eTime,
             //Absenttype2e : this.state.user,
             Reason : this.state.comment,
             Reportto : this.state.reportto,
             strdate : this.state.strdate,

             //startdatextime : null



             // var userid = request.body.userid;
             // var strdate = request.body.strdate;
             // var endate = request.body.endate;
             // var leavetype = request.body.leavetype;
             // var comment = request.body.comment;
             // var time = request.body.time;
             // var status = request.body.status;
             // var reportto = request.body.reportto;
         })
       })

         .then((response) => response.json())
         .then((responseData) => {
         console.log("addLRQ"+responseData),
         this.setState({requestid:responseData.generated_keys[0]}),
         console.log(this.state.requestid),
         //this.addNoti(),
          Alert.alert('Sent');

       })
     //
       .done();
 }


static navigationOptions = {
       title: 'OTRequest',
       headerLeft: null,
       tabBarLabel:'OTRequest',
   };

   render() {
       return (
       <Container>

           <Header>
               <Left>
                   <Icon name="ios-menu" onPress={() =>
                       this.props.navigation.navigate('DrawerOpen')}/>
               </Left>
               <Body  style={styles.body}>
                   <Title>OT Request</Title>
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
             visible={this.state.modalSTime}
             animationType={'slide'}
             onRequestClose={() => this.openSTime()}
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
                   <TouchableOpacity onPress = {() => this.setSTime()}>
                   <Text>
                       Confirm
                   </Text>
                  </TouchableOpacity>
               </Right>
               </Header>
               <DatePickerIOS
                   date={this.state.chosenTime}
                   onDateChange={this.setTime}
                   mode ='time'
                   />
               </View>
            </Modal>

            <Modal
             state={styles.modal}
             visible={this.state.modalETime}
             animationType={'slide'}
             onRequestClose={() => this.openETime()}
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
                   <TouchableOpacity onPress = {() => this.setETime()}>
                   <Text>
                       Confirm
                   </Text>
                  </TouchableOpacity>
               </Right>
               </Header>
               <DatePickerIOS
                   date={this.state.chosenTime}
                   onDateChange={this.setTime}
                   mode ='time'
                   />
               </View>
            </Modal>



                   <View style={styles.formContainer}>

                           <Text style={styles.hdetail}>Date</Text>
                           <View style={styles.formDate}>


                           <Text style={styles.Text}>
                               Date
                           </Text>

                           <TextInput
                               style={styles.input}
                               placeholder={this.state.strdate}
                               autoCorrect={false}
                               autoCapitalize={'none'}
                               placeholderTextColor={'rgb(179, 179, 179)'}
                               returnKeyType={'next'}
                               onSubmitEditing={() => this.passwordInput.focus()}
                               enablesReturnKeyAutomatically={true}
                           />
                           <Icon name="calendar" style={styles.icon} onPress={() => this.openDateFrom()}/>
                           </View>

                           <Text style={styles.hdetail}>Time</Text>
                           <View style={styles.formDate}>

                           <Text style={styles.Text}>
                               From
                           </Text>

                           <TextInput
                               style={styles.input}
                               placeholder={this.state.sTime}
                               autoCorrect={false}
                               autoCapitalize={'none'}
                               placeholderTextColor={'rgb(179, 179, 179)'}
                               returnKeyType={'next'}
                               onSubmitEditing={() => this.passwordInput.focus()}
                               enablesReturnKeyAutomatically={true}
                           />
                           <Icon name="clock" style={styles.icon} onPress={() => this.openSTime()}/>
                           </View>

                           <View style={styles.formDate}>
                           <Text style={styles.Text}>
                               To
                           </Text>

                           <TextInput
                               style={styles.input}
                               placeholder={this.state.eTime}
                               autoCorrect={false}
                               autoCapitalize={'none'}
                               placeholderTextColor={'rgb(179, 179, 179)'}
                               returnKeyType={'next'}
                               onSubmitEditing={() => this.passwordInput.focus()}
                               enablesReturnKeyAutomatically={true}
                           />
                           <Icon name="clock" style={styles.icon} onPress={() => this.openETime()}/>
                           </View>
                           <Text style={styles.hdetail}>Reason</Text>
                           <TextInput
                               style={styles.comment}
                               autoCorrect={false}
                               autoCapitalize={'none'}
                               placeholder={"Comment"}
                               placeholderTextColor={'rgb(179, 179, 179)'}
                               onChangeText={(comment) => this.setState({comment})}
                               returnKeyType={'go'}
                               ref={(input) => this.passwordInput = input}
                           />


                           <TouchableOpacity style={[styles.button,{backgroundColor: '#D95E54'}]} onPress={() => this.addOTrequest()}>
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
 detail:{
   textAlign:'right',
   color:'white',
   fontSize:13,
 },
 hdetail:{
   textAlign:'left',
   fontSize: 15,
   color: '#000',
   fontWeight: '700',
   marginBottom: 10
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
