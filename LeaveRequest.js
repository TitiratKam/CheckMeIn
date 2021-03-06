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
  Picker,
  AsyncStorage,
  Alert
}                             from 'react-native';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';
import {Icon,Button,Container,Header,Content,Left,Title,Body,Right} from 'native-base';


export default class LeaveRequest extends React.Component {

constructor(props) {
   super(props);
   this.state = {
       hasToken:false,
       userid:null,
       chosenDate: new Date(),
        modalDateFrom: false,
       modalDateTo: false,
       strdate: null,
       endate: null,
       time: null,
       comment: null,
       leavetype: null,
       LTpicker:false,
       user: null,
       reportto:"",
       requestid:""
   };

   this.setDate = this.setDate.bind(this);
   this.leavetypepicker = this.leavetypepicker.bind(this);
   this.send = this.send.bind(this);
   this.setDateFrom = this.setDateFrom.bind(this);
   this.setDateTo = this.setDateTo.bind(this);
   this.openDateFrom = this.openDateFrom.bind(this);
   this.openDateTo = this.openDateTo.bind(this);
   this.addLeaverequest = this.addLeaverequest.bind(this);
   this.addNoti = this.addNoti.bind(this);
   this.userinfo = this.userinfo.bind(this);

 }



static navigationOptions = {
        title: 'Leave Request',
        headerLeft: null,
        tabBarLabel:'Leave Request',
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
////

setDate(newDate) {
   this.setState({chosenDate: newDate});
   console.log(this.state.chosenDate);
 }
 setDateFrom() {



   var date = this.state.chosenDate.getDate();
   var month = this.state.chosenDate.getMonth() + 1;
   var year = this.state.chosenDate.getFullYear();

   this.setState({strdate: year + '-' + month + '-' + date});
   this.setState({chosenDate: new Date() });

   this.setState({modalDateFrom:false});


 }

 setDateTo() {
   var date = this.state.chosenDate.getDate();
   var month = this.state.chosenDate.getMonth() + 1;
   var year = this.state.chosenDate.getFullYear();

   this.setState({endate: year + '-' + month + '-' + date});
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

 componentDidMount() {
   var {navigate} = this.props.navigation;

    AsyncStorage.getItem('id').then((token) => {
     this.setState({ hasToken: token !== null, isLoaded: true })
     if (this.state.hasToken == true) {
       var id = token;
       console.log("asdfg"+id);
       this.setState({ userid: id});
       console.log("idLRE ="+ this.state.userid);
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

   leavetypepicker(){
      if (this.state.LTpicker == false){
       this.setState({LTpicker:true})
     }
     else{
       this.setState({LTpicker:false})
     }
   }

    updateUser = (user) => {
     this.setState({ user: user })
  }

  send(){
      this.addLeaverequest()
  }

   addLeaverequest(){
     fetch('http://172.20.10.3:8008/api/v1.0/Request', {
           method: 'POST',
           headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
           body: JSON.stringify({
             //var userid = request.body.userid;
             //var AnsenceTypeName = request.body.AnsenceTypeName;
             //var startdatetime = request.body.startdatetime;
             //var AbsentDuration = request.body.AbsentDuration;
             //var Reason = request.body.Reason;
             //var Reportto = request.body.Reportto;
             //var startdatextime = request.body.startdatextime;
             //var enddatetime = request.body.enddatetime;
             //var Absenttype2 = request.body.Absenttype2e;
               userid : this.state.userid,
               AnsenceTypeName : this.state.user,
               startdatetime : this.state.strdate,
               enddatetime : this.state.endate,
               AbsentDuration : null,
               Reason : this.state.comment,
               Reportto : this.state.reportto,
               AbsentDuration : null,
               startdatextime : null,
               Absenttype2e : null
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

   addNoti(){
    //  fetch('http://172.20.10.11:8003/api/v1.0/Noti', {
    //        method: 'POST',
    //        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //        body: JSON.stringify({
    //            requesttype : "leaverequest",
    //            requestid : this.state.requestid,
    //            notiTo : this.state.reportto
     //
     //
    //             // "requesttype": requesttype,
    //             //  "requestid": requestid,
    //             //  "notiTo": notiTo
    //        })
    //      })
     //
    //        .then((response) => response.json())
    //        .then((responseData) => {
    //        //console.log(responseData);
     //
    //         //Alert.alert('Sent');
     //
    //      })
    //    //
    //      .done();
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
           <Body  style={styles.body}>
               <Title>Leave Request</Title>
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


             <Modal
             state={styles.modal}
             visible={this.state.LTpicker}
             animationType={'slide'}
             onRequestClose={() => this.leavetypepicker()}
             transparent={'true'}
            >
             <View style={styles.Container1}>
               <Header style={styles.modalHead}>
               <Left>
                  <TouchableOpacity onPress = {() => this.leavetypepicker()}>
                   <Text>
                       Cancle
                   </Text>
                  </TouchableOpacity>
               </Left>
               <Right>
                   <TouchableOpacity onPress = {() => this.leavetypepicker()}>
                   <Text>
                       Confirm
                   </Text>
                  </TouchableOpacity>
               </Right>
               </Header>
                           <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>

                              {data.map((obj, i) =>
                               <Picker.Item label ={obj.value} value = {obj.value} />
                            )}
                           </Picker>
               </View>

            </Modal>

                   <View style={styles.formContainer}>
                           <Text style={styles.hdetail}>Absent Type</Text>
                          <View style={styles.formDate}>
                                <Text style={styles.Text}>
                                     Type
                                 </Text>
                                 <TouchableOpacity style={[styles.input,{backgroundColor: 'rgb(240, 245, 245)'}]} onPress={this.leavetypepicker}>

                                     <Text style={styles.LT}>
                                       {this.state.user || "Select"}
                                     </Text>

                               </TouchableOpacity>

                         </View>


                           <Text style={styles.hdetail}>Date</Text>

                           <View style={styles.formDate}>


                           <Text style={styles.Text}>
                               From
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
                           <Icon name="calendar" style={styles.icon} onPress={this.openDateFrom}/>
                           </View>
                           <View style={styles.formDate}>


                           <Text style={styles.Text}>
                               To
                           </Text>

                           <TextInput
                               style={styles.input}
                               placeholder={this.state.endate}
                               autoCorrect={false}
                               autoCapitalize={'none'}
                               placeholderTextColor={'rgb(179, 179, 179)'}
                               returnKeyType={'next'}
                               onSubmitEditing={() => this.passwordInput.focus()}
                               enablesReturnKeyAutomatically={true}
                           />
                           <Icon name="calendar" style={styles.icon} onPress={this.openDateTo}/>
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


                           <TouchableOpacity style={[styles.button,{backgroundColor: '#D95E54'}]} onPress={this.send}>
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
   LT: {
       fontSize: 15,
       color: '  rgb(179, 179, 179)',
       textAlign: 'center',
       paddingVertical: 8,
       marginVertical: 5,

   },
   Container1: {
       flex: 1,
       marginTop:320,
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
