import React, { Component } from 'react';
import { AsyncStorage,Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import Swipeout from 'react-native-swipeout'; // 2.1.5
import editReqForm from './editReqForm.js';
import {StackNavigator} from 'react-navigation';
// Buttons

const test = StackNavigator({
  editReqForm: { screen: editReqForm }
});

export default class App extends Component {

  

  constructor(props) {
    super(props);
    this.state = { 
        hasToken:false,
        chosenDate: new Date(),
        modalVisible: false,
        modalNoti: false,
        userid: null,
        AttendanceHis:[],
        name:'',
        requestHis:[],
        i:null
    };

    //this.setDate = this.setDate.bind(this);
    //this.AttendanceHis = this.AttendanceHis.bind(this);
    this.requestHis = this.requestHis.bind(this);
    this.userinfo = this.userinfo.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);

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
      fetch('http://172.20.10.11:8003/api/v1.0/userinfo', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id : 1,


                 // "requesttype": requesttype,
                 //  "requestid": requestid,
                 //  "notiTo": notiTo
            })
          })

            .then((response) => response.json())
            .then((responseData) => {
            console.log(responseData);
            this.setState({name:responseData[0].f_name+" "+responseData[0].l_name}),
            this.requestHis();
            
          })
        //
          .done();
    }

    requestHis(){
        fetch('http://172.20.10.11:8003/api/v1.0/requestHis', {
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
            this.setState({requestHis : responseData}),
            console.log('2222'+this.state.requestHis);
            //this.checkinCheck2();

            
            
          })
        //
          .done();   

    }


    edit(){
       console.log("1");
       //var {navigate} = this.props.navigation;
       this.props.navigation.navigate('editReqForm');
    }

    delete(){
      //let i=i;
        let id = this.state.i;
       console.log(this.state.requestHis[id].id);
       let requestid = this.state.requestHis[id].id;
      fetch('http://192.168.1.50:8003/api/v1.0/requestHisDel', {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                requestid : requestid,


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

    return (
      <View style={styles.container}>

        {this.state.requestHis.map((obj, id) => 

        <Swipeout right={swipeBtns}
        autoClose='true'
        onOpen={(i) => {
          this.setState({i:id})
          //console.log("id"+this.state.i)
        }}>
          <View style={styles.swipeoutView}>
            <View style={styles.db}>
              <Text style={styles.detail}>{obj.leavetype}</Text>
                <Text style={styles.detail1}> {obj.strdate} to {obj.endate}</Text>

                 
            </View>

            <View style={styles.db2}>
                              
                <Text style={styles.status}>{obj.status}</Text>
            </View>
          </View>
        </Swipeout>
        )}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  swipeoutView: {
    height: 70,
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
});
