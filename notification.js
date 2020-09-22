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
  AsyncStorage,
  Alert
}                             from 'react-native';
import {Icon,Button,Container,Header,Content,Left,Title,Body,Right} from 'native-base';


export default class Notification extends React.Component {

constructor(props) {
   super(props);
   this.state = {
     modalNoti: false,
     name:'',
     requestHis:[],
     PositionID:null,
     LeaveRequest:[],
     OTRequest:[],
     userid:null,
     noti:false


   };
   this.noti = this.noti.bind(this);
   //this.requestHis = this.requestHis.bind(this);
   this.userinfo = this.userinfo.bind(this);
   this.LeaveRequest = this.LeaveRequest.bind(this);
   this.OTRequest = this.OTRequest.bind(this);
   this.Approve = this.Approve.bind(this);
   this.Deny = this.Deny.bind(this);

 }
 Approve(){
   this.setState({noti:true});
 }
 Deny(){
   this.setState({noti:true});
 }
 noti(){

    this.setState({modalNoti:true});

 }
 back(){

    this.setState({modalNoti:false});

 }

componentWillMount() {
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
           if (responseData != 0){
           console.log("noti :"+responseData);
         this.setState({PositionID:responseData[0].PositionID});
         this.LeaveRequest();
         this.OTRequest();
          Alert.alert('Sent'+this.state.PositionID);
           console.log("noti :"+this.state.PositionID);
          }
          else {
            console.log("noinfo");
            console.log("noti user :"+this.state.userid);
          }

       })
     //
       .done();
 }



 LeaveRequest(){
       fetch('http://172.20.10.3:8008/api/v1.0/LNoti', {
           method: 'POST',
           headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
           body: JSON.stringify({
               userid : this.state.PositionID
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
           //this.checkinCheck2();
           if(responseData.length != 0){
             this.setState({LeaveRequest : responseData}),
             console.log('LNoti'+responseData);
            //this.checkinCheck2();
          }
          else {
            this.setState({LeaveRequest : []});
            Alert.alert('LNoti fail');
          }


         })
       //
         .done();

   }
   OTRequest(){
         fetch('http://172.20.10.3:8008/api/v1.0/OTNoti', {
             method: 'POST',
             headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
             body: JSON.stringify({
                 userid : this.state.PositionID
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
            if(responseData.length != 0){
             this.setState({OTRequest : responseData}),
             console.log('OTNoti'+responseData);
             //this.checkinCheck2();
           }
           else {
             this.setState({OTRequest : []});
            Alert.alert('OTNoti fail');
           }


           })
         //
           .done();

     }



    //  requestHis(){
    //         fetch('http://192.168.1.47:8008/api/v1.0/RequestHis', {
    //             method: 'POST',
    //             headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 userid : this.state.userid,
    //         //       username: this.state.username,
    //         //       password: this.state.password,
    //             })
    //           })
     //
    //             .then((response) => response.json())
    //             .then((responseData) => {
    //             //this.saveItem('id_token', responseData.id_token),
    //             //Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
    //             //Actions.HomePage();
    //            // console.log(responseData[0]),
    //            if (responseData.length >= 1){
    //              this.setState({requestHis : responseData}),
    //              this.setState({request : true}),
    //              console.log('2222'+this.state.requestHis),
    //              this.setStartDate();
    //              this.setEndDate();
    //            //this.checkinCheck2();
    //            //this.noti();
    //            }
    //            else{
    //                this.setState({requestHis : []})
    //            }
     //
     //
     //
    //           })
    //         //
    //           .done();
     //
    //     }
    //     OTHis(){
    //            fetch('http://192.168.1.47:8008/api/v1.0/OTRequestHis', {
    //                method: 'POST',
    //                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //                body: JSON.stringify({
    //                    userid : this.state.userid,
    //            //       username: this.state.username,
    //            //       password: this.state.password,
    //                })
    //              })
     //
    //                .then((response) => response.json())
    //                .then((responseData) => {
    //                //this.saveItem('id_token', responseData.id_token),
    //                //Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
    //                //Actions.HomePage();
    //               // console.log(responseData[0]),
     //
     //
    //                if (responseData.length >= 1){
    //                  this.setState({OTHis : responseData}),
    //                  console.log('2222'+this.state.OTHis),
    //                  this.setState({OT : true}),
    //                  this.setOTDate();
    //                //this.checkinCheck2();
    //                //this.noti();
    //                }
    //                else{
    //                  this.setState({OTHis : []});
    //                }
     //
    //                //this.setEndDate();
     //
     //
    //              })
    //            //
    //              .done();
     //
    //        }



static navigationOptions = {
       title: 'Notification',
       headerLeft: null,
       tabBarLabel:'Notification',

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
               <Title>Notification</Title>
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
                    <Text style={styles.hmodaltext}>สถาพร รัตนานุภาพ</Text>
                    <Text style={styles.modaltext}>2018-05-20 to 2018-05-20</Text>
                    <Text style={styles.modaltext}>Leave type :Family care leave</Text>
                   </View>
                       <View style={styles.formButton}>
                           <View style={styles.db}>
                               <TouchableOpacity style={[styles.button,{backgroundColor: 'rgb(0, 153, 115)'}]} onPress={this.Approve}>
                                   <Text style={styles.Approve} onPress={this.App}>
                                     Approve
                                   </Text>

                               </TouchableOpacity>
                           </View>
                           <View style={styles.db}>
                               <TouchableOpacity style={[styles.button,{backgroundColor: '#D95E54'}]} onPress={this.Deny}>
                                   <Text style={styles.Deny}>
                                     Deny
                                   </Text>

                               </TouchableOpacity>
                           </View>
                       </View>
                   </View>
               </Content>
             </Container>
            </Modal>
           
            {this.state.LeaveRequest.map((obj, id) =>
              <TouchableOpacity style={[styles.s1,{backgroundColor: 'rgb(61, 107, 245)'}]} onPress={this.noti}>
                <View style={styles.db}>
                <Image style={styles.img1} source={require('./img/man.png')}/>
                </View>

                <View style={styles.db2}>
                <Text style={styles.hdetail}>สถาพร รัตนานุภาพ</Text>
                <Text style={styles.detail}> 2018-05-18 to 2018-05-18</Text>
                <Text style={styles.detail}>{obj.AnsenceTypeName}</Text>
                </View>

              </TouchableOpacity>)}

            {this.state.OTRequest.map((obj, id) =>
              <TouchableOpacity style={[styles.s1,{backgroundColor: 'rgb(61, 107, 245)'}]} onPress={this.noti}>
                <View style={styles.db}>
                <Image style={styles.img1} source={require('./img/man.png')}/>
                </View>

                <View style={styles.db2}>
                <Text style={styles.hdetail}>สถาพร รัตนานุภาพ</Text>
                <Text style={styles.detail}> 2018-05-18 to 2018-05-18</Text>
                <Text style={styles.detail}>{obj.AnsenceTypeName}</Text>
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
 },
 db:{
   flex:1,
   //alignItems:'center',
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
});

AppRegistry.registerComponent(
  'reactNativeBeaconExample',
  () => reactNativeBeaconExample
);
