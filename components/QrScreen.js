import {StyleSheet, View, Text, Image, Button, SafeAreaView} from 'react-native'
import { Icon, Divider } from 'react-native-elements';
import React from 'react'

import QRCode from 'react-native-qrcode-svg';

export default function QrScreen() {
  return (
    <View style={styles.generalView}>
        <View style={styles.divTop}>
            <Image style={{width:100, height:100, marginLeft:50, marginRight:50}} source={require('../assets/shetkyLogo.png')}/>
            <View style={styles.qr}>
                <QRCode
                    value='some string value'
                    color={'#000000'}
                    backgroundColor={'white'}
                    size={150}
                />
            </View>
            <Text style={{width:200, height:20, color:'#AEC4D0'}}> 709bc049-2280-43d6-b82c-605b4ba09c11</Text>
        </View>
        <View style={styles.divMidle}>
            <Text style={{fontWeight:'bold', width:450, height:30, fontSize: 20}}>Latest activity</Text>
            <View style={styles.orderSec}>
                <Image style={{width:40, height:40}} source={require('../assets/order66.png')}/>
                <View style={styles.infoOrder}>
                    <Text style={{fontWeight: 'bold'}}>Meal</Text>
                    <Text>1 day ago</Text>
                </View>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: '#7900FF'}}>-$14.99</Text>
            </View>
        </View>
        <Divider style={{ color: '#E9F0F3', }} />
        <View style={styles.bottomMenu}>
            <Icon name="credit-card" size={35} type="font-awesome" color="#AEC4D0" onPress={() => navigation.push('Card')}/>
            <Icon name="qrcode" size={35} type="font-awesome" color="#AEC4D0" onPress={() => navigation.push('Qr')}/>
            <Icon name="fastfood" size={35} type="materialicons" color="#AEC4D0" onPress={() => navigation.push('Food')}/>
            <Icon name="account-circle" size={35} type="materialicons" color="#AEC4D0" onPress={() => navigation.push('Account')}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    generalView:{
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'space-around',
    },

    divTop: {
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    },

    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    divMidle: {
        width: '100%',
        marginLeft: 20,
        marginRight: 20,
    },

    orderSec: {
        marginTop:10,
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 40
    },

    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    qr: {
        padding: 25,
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: '#E9F0F3',
        borderWidth: 2,
    }
});