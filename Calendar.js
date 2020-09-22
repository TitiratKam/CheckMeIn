import React from 'react';
import {AsyncStorage, ScrollView, AppRegistry, StyleSheet, Text, View,Alert, TextInput, TouchableOpacity, ImagePickerIOS, Image, KeyboardAvoidingView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon,Button,Container,Header,Content,Left} from 'native-base';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


export default class Calendars extends React.Component {


    constructor(props) {
    super(props);
    this.state = {
    };
  }

    static navigationOptions = {
        headerLeft: null,
        tabBarLabel:'Calendar',
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                name="perm-contact-calendar"
                size={24}
                style={{color: tintColor}}>
                </MaterialIcons>
                ///
                );
        }
    };

   

    render() {
        return (
            

               <Container>
                    <Header>
                        <Left>
                            <Icon name="ios-menu" onPress={() =>
                                this.props.navigation.navigate('DrawerOpen')}/>
                        </Left>
                    </Header>
                    <View style={styles.container}>
                    <Agenda
                    items={
                        {'2018-04-22': [{text: 'item 1 - any js object'}],
                         '2018-04-23': [{text: 'item 2 - any js object'}],
                         '2018-04-24': [],
                         '2018-04-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
                        }}
                     // specify how each item should be rendered in agenda
                      renderItem={(item, firstItemInDay) => {return (<View />);}}
                      // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                      renderDay={(day, item) => {return (<View />);}}
                      // specify how empty date content with no items should be rendered
                      renderEmptyDate={() => {return (<View />);}}
                      // specify how agenda knob should look like
                      renderKnob={() => {return (<View />);}}
                      // specify what should be rendered instead of ActivityIndicator
                      renderEmptyData = {() => {return (<View />);}}
                      // specify your item comparison function for increased performance
                      rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
                    theme={{
                    agendaDayTextColor: 'yellow',
                    agendaDayNumColor: 'green',
                    agendaTodayColor: 'red',
                    agendaKnobColor: 'blue'
                  }}
                  // agenda container style
                  style={styles.container}
                    />
                    </View>
            </Container>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'rgba(175, 214, 240,1.0)',
    },
    

});