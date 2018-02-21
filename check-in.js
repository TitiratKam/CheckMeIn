import React from 'react';
import {ScrollView, AppRegistry, StyleSheet, Text, View,Alert, TextInput, TouchableOpacity, ImagePickerIOS, Image, KeyboardAvoidingView } from 'react-native';
import AnalogClock from './AnalogClock';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon,Button,Container,Header,Content,Left} from 'native-base';


export default class CheckIn extends React.Component {


    constructor(props) {
    super(props);
    this.state = {
      image: null,
      chosenDate: new Date()
    };
    //this.chooseImageFromGallery = this.chooseImageFromGallery.bind(this);
    //this.setDate = this.setDate.bind(this);
    this.chooseImageFromCamera = this.chooseImageFromCamera.bind(this);
    this.ShowCurrentDate = this.ShowCurrentDate.bind(this);
  }

    static navigationOptions = {
        tabBarLabel:'CHECK-IN',
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                name="update"
                size={24}
                style={{color: tintColor}}>
                </MaterialIcons>
                ///
                );
        }
    };

    chooseImageFromCamera() {
    ImagePickerIOS.openCameraDialog({}, imageUri => {
      this.setState({image: imageUri});
      console.log(this.state.image);
    }, error => console.error(error));
  }

    ShowCurrentDate=()=>{
 
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

 
      Alert.alert(date + '-' + month + '-' + year);
 
     }

    render() {
        return (
            

               <Container>
                    <Header>
                        <Left>
                            <Icon name="ios-menu" onPress={() =>
                                this.props.navigation.navigate('DrawerOpen')}/>
                        </Left>
                    </Header>
                    <Content ContentContainerStyle={{
                        flex:1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop:20}}>

                                 <AnalogClock
                                   minuteHandLength={100}
                                 />

                        </View>
                        <View style={styles.formContainer}>
                            <TouchableOpacity style={[styles.button,{backgroundColor: '#D95E54'}]}  onPress={this.chooseImageFromCamera}>
                                <Text style={styles.textBtn}>CHECK IN</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button,{backgroundColor: '#D95E54'}]}  onPress={this.ShowCurrentDate}>
                                <Text style={styles.textBtn}>DATE</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex: 1}}>
                            {this.state.image?
                            <Image style={{flex: 1}} source={{uri: this.state.image}}></Image>:null}
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