import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native';

export class DigitalClock extends Component<{}>
{
    constructor()
    {
        super();
        
        this.state = { currentTime: null, currentDay: null }

        this.daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    }

    componentWillMount()
    {
        this.getCurrentTime();
    }

    getCurrentTime = () =>
    {
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        let am_pm = 'PM';

        if( minutes < 10 )
        {
            minutes = '0' + minutes;
        }

        if( seconds < 10 )
        {
            seconds = '0' + seconds;
        }

        if( hour > 12 )
        {
            hour = hour - 12;
        }

        if( hour == 0 )
        {
            hour = 12;
        }        

        if( new Date().getHours() < 12 )
        {
            am_pm = 'AM';
        }

        this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm });

        this.daysArray.map(( item, key ) =>
        {
            if( key == new Date().getDay() )
            {
                this.setState({ currentDay: item.toUpperCase() });
            }
        })        
    }

    componentWillUnmount()
    {
        clearInterval(this.timer);
    }

    componentDidMount()
    {
        this.timer = setInterval(() =>
        {
            this.getCurrentTime();
        }, 1000);
    }

    render()
    {
        return(
            <View style = { styles.container }>
                <View>
                    <Text style = { styles.daysText }>{ this.state.currentDay }</Text>
                    <Text style = { styles.timeText }>{ this.state.currentTime }</Text>                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },

    timeText:
    {
        fontSize: 50,
        color: '#e59400'
    },

    daysText:
    {
        color: '#e59400',
        fontSize: 25,
        paddingBottom: 0
    }
});
export default DigitalClock