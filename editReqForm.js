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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';
import {Icon,Button,Container,Header,Content,Left,Right} from 'native-base';

// Buttons


export default class App extends Component {

 constructor(props) {
   super(props);
   this.state = {
       requestid:null,
       chosenDate: new Date(),
       modalDateFrom: false,
       modalDateTo: false,
       strdate: null,
       endate: null,
       time: null,
       comment: null,
       leavetype: null,
       LTpicker:false,
       requestDetail:[],
       reqid:null
   };

   this.setDate = this.setDate.bind(this);
   this.leavetypepicker = this.leavetypepicker.bind(this);
   this.send = this.send.bind(this);
   this.setDateFrom = this.setDateFrom.bind(this);
   this.setDateTo = this.setDateTo.bind(this);
   this.openDateFrom = this.openDateFrom.bind(this);
   this.openDateTo = this.openDateTo.bind(this);
   this.editLeaverequest = this.editLeaverequest.bind(this);
   this.requestDetail = this.requestDetail.bind(this);

 }


 componentDidMount() {
     var {params} = this.props.navigation.state;
     var id = params.id;
     this.setState({reqid: id});
     console.log("111"+id);
     console.log("222"+this.state.reqid);
     //this.requestDetail();

 }


   requestDetail(){
      //  fetch('http://172.20.10.11:8003/api/v1.0/requestDetail', {
      //      method: 'POST',
      //      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      //      body: JSON.stringify({
      //          requestid : this.state.reqid,
      //  //       username: this.state.username,
      //  //       password: this.state.password,
      //      })
      //    })
       //
      //      .then((response) => response.json())
      //      .then((responseData) => {
      //      //this.saveItem('id_token', responseData.id_token),
      //      //Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
      //      //Actions.HomePage();
      //      console.log(responseData);
      //      // this.setState({strdate : responseData[0].strdate}),
      //      // this.setState({endate : responseData[0].endate}),
      //      // this.setState({leavetype : responseData[0].leavetype}),
      //      // this.setState({comment : responseData[0].comment}),
      //      // console.log('2222'+this.state.requestDetail);
      //      //this.checkinCheck2();
      //      //console.log(responseData[0].user_id),
       //
       //
      //    })
      //  //
      //    .done();

   }

   editLeaverequest(){
    //  fetch('http://172.20.10.11:8003/api/v1.0/updateLeaveReq', {
    //        method: 'POST',
    //        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //        body: JSON.stringify({
    //            requestid : this.id,
    //            strdate : this.state.strdate,
    //            endate : this.state.endate,
    //            leavetype : this.state.leavetype,
    //            comment : this.state.comment,
    //            time : this.state.time,
     //
     //
    //        })
    //      })
     //
    //        .then((response) => response.json())
    //        .then((responseData) => {
    //        console.log(responseData),
    //        this.setState({requestid:responseData.generated_keys[0]}),
    //        console.log(this.state.requestid),
    //        this.addNoti(),
    //         Alert.alert('Sent');
     //
    //      })
    //    //
    //      .done();
   }


   setDate(newDate) {
   this.setState({chosenDate: newDate});
   console.log(this.state.chosenDate);
 }
 setDateFrom() {



   var date = this.state.chosenDate.getDate();
   var month = this.state.chosenDate.getMonth() + 1;
   var year = this.state.chosenDate.getFullYear();

   this.setState({strdate: date + '-' + month + '-' + year});
   this.setState({chosenDate: new Date() });

   this.setState({modalDateFrom:false});


 }

 setDateTo() {
   var date = this.state.chosenDate.getDate();
   var month = this.state.chosenDate.getMonth() + 1;
   var year = this.state.chosenDate.getFullYear();

   this.setState({endate: date + '-' + month + '-' + year});
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


   leavetypepicker(){
      if (this.state.LTpicker == false){
       this.setState({LTpicker:true})
     }
     else{
       this.setState({LTpicker:false})
     }
   }

   updateUser = (user) => {
     this.setState({ leavetype: user })
  }

  send(){
      this.editLeaverequest()
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
                                       {this.state.leavetype || "Select"}
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


                           <Text style={styles.hdetail}>Comment</Text>
                           <TextInput
                               style={styles.comment}
                               autoCorrect={false}
                               autoCapitalize={'none'}
                               placeholder={this.state.comment}
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
