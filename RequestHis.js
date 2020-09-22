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
import {Icon,Button,Container,Header,Content,Left,Title,Body,Right} from 'native-base';
//mport MapView from 'react-native-maps';
import Swipeout from 'react-native-swipeout';
var {height, width} = Dimensions.get('window');

export default class RequestHis extends React.Component {



constructor(props) {
   super(props);
   this.state = {
       hasToken:false,
       chosenDate: new Date(),
       modalVisible: false,
       modalNoti: false,
       request: false,
       OT: false,
       userid: null,
       AttendanceHis:[],
       name:'',
       requestHis:[],
       OTHis:[],
       i:null,
       startdate:[],
       enddate:[],
       OTdate:[],
   };

   this.setDate = this.setDate.bind(this);
   this.AttendanceHis = this.AttendanceHis.bind(this);
   this.requestHis = this.requestHis.bind(this);
   this.OTHis = this.OTHis.bind(this);
   this.userinfo = this.userinfo.bind(this);
   this.edit = this.edit.bind(this);
   this.delete = this.delete.bind(this);
   this.OTedit = this.OTedit.bind(this);
   this.OTdelete = this.OTdelete.bind(this);
   this.openDrawer = this.openDrawer.bind(this);
   this._add = this._add.bind(this);

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
 openDrawer() {
   this.drawer.open();
 }

 _add(){
      console.log("1");
      var {navigate} = this.props.navigation;
      navigate("editReqForm");
   }

static navigationOptions = {
       title: 'Request History',
       headerLeft: (<Icon name="ios-menu" onPress={()=>{  this.props.navigation.navigate('DrawerOpen') }} style={{paddingLeft:10}}/> ) ,
       //headerRight: (<Text onPress={this._add} style={{paddingRight:10, fontSize:30, color:"rgb(255, 153, 0)"}}>+</Text> ) ,
       tabBarLabel:'Request History',

   };

componentWillMount() {
   AsyncStorage.getItem('id').then((token) => {
     this.setState({ hasToken: token !== null, isLoaded: true })
     if (this.state.hasToken == true) {
       this.setState({ userid: token});
       console.log("id ="+this.state.userid);


         this.requestHis();
         this.OTHis();

     }
       else{

           //navigate("LogIn");
         }
   });

 }

  userinfo(){
    //  fetch('http://172.20.10.11:8003/api/v1.0/userinfo', {
    //        method: 'POST',
    //        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //        body: JSON.stringify({
    //            user_id : 1,
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
    //        console.log(responseData);
    //        this.setState({name:responseData[0].f_name+" "+responseData[0].l_name}),
    //        this.requestHis();
     //
    //      })
    //    //
    //      .done();
   }


requestHis(){
       fetch('http://172.20.10.3:8008/api/v1.0/RequestHis', {
           method: 'POST',
           headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
           body: JSON.stringify({
               userid : this.state.userid,
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
          if (responseData.length >= 1){
            this.setState({requestHis : responseData}),
            this.setState({request : true}),
            console.log('2222'+this.state.requestHis),
            this.setStartDate();
            this.setEndDate();
          //this.checkinCheck2();
          //this.noti();
          }
          else{
              this.setState({requestHis : []})
          }



         })
       //
         .done();

   }
   OTHis(){
          fetch('http://172.20.10.3:8008/api/v1.0/OTRequestHis', {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  userid : this.state.userid,
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


              if (responseData.length >= 1){
                this.setState({OTHis : responseData}),
                console.log('2222'+this.state.OTHis),
                this.setState({OT : true}),
                this.setOTDate();
              //this.checkinCheck2();
              //this.noti();
              }
              else{
                this.setState({OTHis : []});
              }

              //this.setEndDate();


            })
          //
            .done();

      }
      setOTDate() {
        var strdate = this.state.OTHis;
        var strdate2 = strdate.length;
        console.log("startdate"+strdate[0].StartDate);
        console.log("startdate ="+strdate2);
        //for (var x = 0; x < data.length; x++) {
        for (var i=0; i<strdate2; i++){
          var sdt = strdate[i].StartDate;
          var sdt1 = sdt.split("T");
          console.log("sdt"+sdt);
          //this.setState({startdate : sdt1[0]});
          console.log("srtdatess: "+sdt1[0]);
          this.setState({OTdate: [...this.state.OTdate, sdt1[0]]});
          console.log("srtdate: "+this.state.OTdate);

        }
      }

   setStartDate() {
     var strdate = this.state.requestHis;
     var strdate2 = strdate.length;
     console.log("startdate"+strdate[0].StartDate);
     console.log("startdate ="+strdate2);
     //for (var x = 0; x < data.length; x++) {
     for (var i=0; i<strdate2; i++){
       var sdt = strdate[i].StartDate;
       var sdt1 = sdt.split("T");
       console.log("sdt"+sdt);
       //this.setState({startdate : sdt1[0]});
       console.log("srtdatess: "+sdt1[0]);
       this.setState({startdate: [...this.state.startdate, sdt1[0]]});
       console.log("srtdate: "+this.state.startdate);

     }
   }

   setEndDate() {
     var strdate = this.state.requestHis;
     var strdate2 = strdate.length;
     console.log("startdate"+strdate[0].EndDate);
     console.log("startdate ="+strdate2);
     //for (var x = 0; x < data.length; x++) {
     for (var i=0; i<strdate2; i++){
       var sdt = strdate[i].EndDate;
       var sdt1 = sdt.split("T");
       console.log("sdt"+sdt);
       //this.setState({startdate : sdt1[0]});
       console.log("srtdatess: "+sdt1[0]);
       this.setState({enddate: [...this.state.enddate, sdt1[0]]});
       console.log("srtdate: "+this.state.enddate);

     }
   }

   edit(){
      let id = this.state.i;
      console.log(id);
      console.log(this.state.requestHis[id].id);
      //navigate("detail",{title:name,i:id,user:us})
      var {navigate} = this.props.navigation;
      navigate("editReqForm",{id:this.state.requestHis[id].id});
   }


   delete(){
     //let i=i;
       let id = this.state.i;
      console.log("delete = "+this.state.requestHis[id].id);
      let requestid = this.state.requestHis[id].id;
     fetch('http://172.20.10.3:8008/api/v1.0/deleteRequest', {
           method: 'DELETE',
           headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
           body: JSON.stringify({
               id : requestid,


                // "requesttype": requesttype,
                //  "requestid": requestid,
                //  "notiTo": notiTo
           })
         })

           .then((response) => response.json())
           .then((responseData) => {
           console.log(responseData);
           this.requestHis();
         })
       //
         .done();

   }

   OTedit(){
      let id = this.state.i;
      console.log(id);
      console.log(this.state.OTHis[id].id);
      //navigate("detail",{title:name,i:id,user:us})
      var {navigate} = this.props.navigation;
      navigate("editReqForm",{id:this.state.OTHis[id].id});
   }


   OTdelete(){
     //let i=i;
       let id = this.state.i;
      console.log("delete = "+this.state.OTHis[id].id);
      let requestid = this.state.OTHis[id].id;
     fetch('http://172.20.10.3:8008/api/v1.0/deleteRequest', {
           method: 'DELETE',
           headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
           body: JSON.stringify({
               id : requestid,


                // "requesttype": requesttype,
                //  "requestid": requestid,
                //  "notiTo": notiTo
           })
         })

           .then((response) => response.json())
           .then((responseData) => {
           console.log(responseData);
           this.OTHis();
         })
       //
         .done();

   }


 AttendanceHis(){
//    //var {navigate} = this.props.navigation;
//    //fetch('http://192.168.1.49:8003/api/v1.0/checkmein')
//    fetch('http://172.20.10.11:8003/api/v1.0/attendance', {
//            method: 'POST',
//            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//            body: JSON.stringify({
//              userid: this.state.userid,
//
//            })
//          })
//    .then((response) => response.json())
//    .then((responseData) => {
//    //this.saveItem('id_token', responseData.id_token),
//    //Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
//    //Actions.HomePage();
//    //console.log(responseData),
//    this.setState({ AttendanceHis: responseData});
//    //console.log(this.state.AttendanceHis);
//
//  })
// //
//  .done();

   }
   render() {

      let swipeBtns = [
 {
   text: 'EDIT',
   backgroundColor: '#fdb102',
   underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
   onPress: () => { this.edit() }
},
 {
   text: 'DELETE',
   backgroundColor: '#800000',
   underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
   onPress: () => { this.delete() }
}
];
let swipeBtns2 = [
{
text: 'EDIT',
backgroundColor: '#fdb102',
underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
onPress: () => { this.OTedit() }
},
{
text: 'DELETE',
backgroundColor: '#800000',
underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
onPress: () => { this.OTdelete() }
}
];

       return (

       <Container>

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



                           <Text style={styles.Text1}>
                               Lastest
                           </Text>

                             {this.state.requestHis.map((obj, id) =>
                                  <Swipeout right={swipeBtns}
                                    autoClose='true'
                                    onOpen={(i) => {
                                      this.setState({i:id})
                                      //console.log("id"+this.state.i)
                                    }}>
                                      <View style={styles.swipeoutView}>
                                        <View style={styles.db}>
                                          <Text style={styles.detail}>{obj.AnsenceTypeName}</Text>
                                            <Text style={styles.detail1}> {this.state.startdate[id]} to {this.state.enddate[id]}</Text>


                                        </View>

                                        <View style={styles.db2}>

                                            <Text style={styles.status}>{obj.Process_Status}</Text>
                                        </View>
                                      </View>
                                    </Swipeout>
                             )}


                             {this.state.OTHis.map((obj, id) =>
                                  <Swipeout right={swipeBtns2}
                                    autoClose='true'
                                    onOpen={(i) => {
                                      this.setState({i:id})
                                      //console.log("id"+this.state.i)
                                    }}>
                                      <View style={styles.swipeoutView2}>
                                        <View style={styles.db}>
                                          <Text style={styles.detail}>{obj.AbsenceName}</Text>
                                          <Text style={styles.detail1}> {this.state.OTdate[id]}</Text>
                                            <Text style={styles.detail1}> Time : {obj.StartTime} to {obj.EndTime}</Text>

                                        </View>

                                        <View style={styles.db2}>

                                            <Text style={styles.status}>{obj.Process_Status}</Text>
                                        </View>
                                      </View>
                                    </Swipeout>
                             )}







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

  swipeoutView: {
   height: 70,
   backgroundColor: 'white',
   borderBottomWidth: 1,
   borderColor: 'rgb(242, 242, 242)',
   flexDirection:'row',
   padding:10,
 },
 swipeoutView2: {
  height: 90,
  backgroundColor: 'white',
  borderBottomWidth: 1,
  borderColor: 'rgb(242, 242, 242)',
  flexDirection:'row',
  padding:10,
},
 db:{
   flex:2
 },
 db2:{
   flex:1
 },
 detail:{
   textAlign:'left',
   color:'#132639',
   fontSize:18,
   padding:3,
   fontWeight: '700',
 },
 detail1:{
   textAlign:'left',
   color:'#293d3d',
   fontSize:15,
   padding:3
 },
 status:{
   textAlign:'right',
   color:'#990033',
   fontSize:20,
   fontWeight: '700',

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
   flex:1
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
   menu: {
       paddingLeft: 5,
   },
});

AppRegistry.registerComponent(
  'reactNativeBeaconExample',
  () => reactNativeBeaconExample
);
