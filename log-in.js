import React from 'react';
import {AsyncStorage,Alert, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';


export default class Home extends React.Component {

  constructor(props){

    super(props);
    //this.database = firebase.database();
    this.state = {
      username:"",
      password:"",
      id_token:[],
      hasToken: false,
      id:""
    }


    this.login = this.login.bind(this);

  }

  static navigationOptions = {
        title: 'Log-out',
        headerLeft: null,
        //tabBarLabel:'Log-out',

    };
  //   login(){

  //    var {navigate} = this.props.navigation;

  //     console.log(this.state.role);

  //     // this.currentUser.transaction((currentUser) => {
  //     // if (!currentUser) {
  //     //   currentUser = [];
  //     // }
  //     // //currentUser.push({role: this.state.role});
  //     // this.leaveRequestRef.child(this.state.i).remove();;


  //     // return currentUser;
  //     // });

  //     this.currentUser.child(0).update({ role: this.state.role });;

  //     navigate("CheckIn")

  // }
  componentWillMount() {
    AsyncStorage.getItem('id').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
      if (this.state.hasToken == true) {
        this.userLogout();
        console.log("log-out");

    }
    else{
        console.log("not log in yet");
    }
    });


  }

async userLogout() {
  let keys = ["id"];
    try {
      //await AsyncStorage.removeItem('id');
     await AsyncStorage.multiRemove(keys, (err) => {
    ('Local storage user info removed!');
});
      Alert.alert('Logout Success!');
      //Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }


  async saveItem(info) {
    try {
      //await AsyncStorage.setItem('id', JSON.stringify(selectedValue));
      console.log(info);
      await AsyncStorage.setItem('id', JSON.stringify(info));
      console.log("log-in");

    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }


login(){
    var {navigate} = this.props.navigation;
    //fetch('http://192.168.1.47:8008/api/v1.0/getlogin')
    fetch('http://172.20.10.3:8008/api/v1.0/getlogin', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uemail: this.state.username,
              upasscode: this.state.password,
            })
          })
    .then((response) => response.json())
    .then((responseData) => {
    //this.saveItem('id_token', responseData.id_token),
    //Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
    //Actions.HomePage();
    if (responseData.length > 0){
    console.log("login id ="+parseInt(responseData[0].IdentificationNo));

    this.saveItem(parseInt(responseData[0].IdentificationNo));
    //this.saveItem(responseData),
    navigate("CheckIn");
    }
    else {
      console.log("fail");
    }

  })
//
  .done();

    }


    userLogin() {

          // if (!this.state.username || !this.state.password) return;
          // // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
          // fetch('http://192.168.XXX.XXX:3001/sessions/create', {
          //   method: 'POST',
          //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     username: this.state.username,
          //     password: this.state.password,
          //   })
          // })
          // .then((response) => response.json())
          // .then((responseData) => {
          //   this.saveItem('id_token', responseData.id_token),
          //   Alert.alert('Login Success!', 'Click the button to get a Chuck Norris quote!'),
            Actions.HomePage();
          // })
          // .done();
        }

    render() {
        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        //source={require('./Octocat.png')}
                        />
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={"Username"}
                        placeholderTextColor={'rgba(255, 255, 255,0.6)'}
                        returnKeyType={'next'}
                        onChangeText={(t) => this.setState({username: t})}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        enablesReturnKeyAutomatically={true}
                    />
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={"Password"}
                        placeholderTextColor={'rgba(255, 255, 255,0.6)'}
                        returnKeyType={'go'}
                        onChangeText={(t) => this.setState({password: t})}
                        secureTextEntry={true}
                        ref={(input) => this.passwordInput = input}
                    />
                    <TouchableOpacity onPress={this.login}>
                        <Text style={{fontSize: 12}}>Forget password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor: '#D95E54'}]}  onPress={this.login}>
                        <Text style={styles.textBtn}>Login</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(175, 214, 240,1.0)',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: 40
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
        padding: 20,
        marginBottom:100
    }
});
