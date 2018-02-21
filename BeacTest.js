 'use strict';
  import React, {
   Component
} from 'react';
 import {
   AppRegistry,
   StyleSheet,
   View,
   Text,
   ListView,
   DeviceEventEmitter,
   KeyboardAvoidingView
 }                             from 'react-native';
 import Beacons                from 'react-native-beacons-manager';
 import BluetoothState         from 'react-native-bluetooth-state';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon,Button,Container,Header,Content,Left} from 'native-base';


export default class BeaconsTest extends React.Component {

    constructor(props) {
     super(props);
     // Create our dataSource which will be displayed in the ListView
     var ds = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2 }
     );
     this.state = {
       bluetoothState: '',
       // region information
       identifier: 'GemTot for iOS',
       uuid: '7b44b47b-52a1-5381-90c2-f09b6838c5d4',
       // React Native ListView datasource initialization
       dataSource: ds.cloneWithRows([])
     };
    //this.Beacons.requestWhenInUseAuthorization = this.Beacons.requestWhenInUseAuthorization.bind(this);
   }

      componentWillMount(){
        //console.log(this.state.bluetoothState);
        

     //
     // ONLY non component state aware here in componentWillMount
     //
     // Request for authorization while the app is open
     this.Beacons && this.Beacons.requestWhenInUseAuthorization();
     // Define a region which can be identifier + uuid,
     // identifier + uuid + major or identifier + uuid + major + minor
     // (minor and major properties are numbers)
     const region = {
       identifier: this.state.identifier,
       uuid: this.state.uuid
     };
     // Range for beacons inside the region
     this.Beacons && this.startRangingBeaconsInRegion(region);
     this.Beacons && this.Beacons.startUpdatingLocation();
   }

   componentDidMount() {
     //
     // component state aware here - attach events
     //
     // Ranging: Listen for beacon changes
     console.log(this.state.bluetoothState);
     this.beaconsDidRange = DeviceEventEmitter.addListener(
       'beaconsDidRange',
       (data) => {
         this.setState({
           dataSource: this.state.dataSource.cloneWithRows(data.beacons)
         });
       }
     );

     // listen bluetooth state change event
     BluetoothState.subscribe(
       bluetoothState => {
         this.setState({ bluetoothState: bluetoothState });
         console.log(this.state.bluetoothState);
       }
     );
     this.BluetoothState && this.BluetoothState.initialize();
   }

   componentWillUnMount(){
     console.log('123');
     this.beaconsDidRange = null;
     
   }




static navigationOptions = {
        title: 'Bluetooth Test',
        headerLeft: null,
        tabBarLabel:'Bluetooth Test',
        drawerIcon: ({tintColor}) => {
            return (
                <MaterialIcons
                name="settings-bluetooth"
                size={24}
                style={{color: tintColor}}>
                </MaterialIcons>
                );
        }
    };

    render() {
        const { bluetoothState, dataSource } =  this.state;
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

                <Text style={styles.btleConnectionStatus}>
                    Bluetooth connection status: { bluetoothState ? bluetoothState  : 'NA' }
                </Text>

                <Text style={styles.headline}>
                    All beacons in the area
                </Text>

                <ListView
                    dataSource={ dataSource }
                    enableEmptySections={ true }
                    renderRow={this.renderRow}
                />

            </Content>
       </Container>
        );
    }


    renderRow = rowData => {
     return (
       <View style={styles.row}>
         <Text style={styles.smallText}>
           UUID: {rowData.uuid ? rowData.uuid  : 'NA'}
         </Text>
         <Text style={styles.smallText}>
           Major: {rowData.major ? rowData.major : 'NA'}
         </Text>
         <Text style={styles.smallText}>
           Minor: {rowData.minor ? rowData.minor : 'NA'}
         </Text>
         <Text>
           RSSI: {rowData.rssi ? rowData.rssi : 'NA'}
         </Text>
         <Text>
           Proximity: {rowData.proximity ? rowData.proximity : 'NA'}
         </Text>
         <Text>
           Distance: {rowData.accuracy ? rowData.accuracy.toFixed(2) : 'NA'}m
         </Text>
       </View>
     );
   }
 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'rgba(175, 214, 240,1.0)',
    },
     container1: {
     flex: 1,
     paddingTop: 60,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
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
     smallText: {
     fontSize: 11
   }
});

 AppRegistry.registerComponent(
   'reactNativeBeaconExample',
   () => reactNativeBeaconExample
);