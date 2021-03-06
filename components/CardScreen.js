import {StyleSheet, View, Text, Image, Button, SafeAreaView, Alert} from 'react-native'
import { Icon, Divider } from 'react-native-elements';
import React from 'react'

import Auth0 from "react-native-auth0"; // for using Auth0 within React Native
import SInfo from "react-native-sensitive-info"; // for securely storing the access and refresh tokens returned by Auth0
import RNRestart from "react-native-restart"; // for restarting the app after acquiring a new access token
import { NavigationContainer, useNavigationContainerRef  } from "@react-navigation/native"; // for implementing navigation
import Config from "react-native-config"; // for getting the Auth0 domain and client ID from the config file

import BottomnMenu from './BottomnMenu';

export default function CardScrenn({navigation}) {
  const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID,
  });

  const [accessToken, setAccessToken] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  const navigationRef = useNavigationContainerRef();

  React.useEffect(() => {
    // Check if the access token is stored in the SecureStore
    SInfo.getItem("accessToken", {}).then(accessToken => {
      if (accessToken) {
        // If the access token is stored, get the user info
        auth0.auth
          .userInfo({ token: accessToken })
          .then(userInfo => {
            console.log(userInfo);
            setUserInfo(userInfo);
            setAccessToken(accessToken);
          })
          .catch(error => {
            console.log(error);
            setAccessToken(null);
            setUserInfo(null);
          });
      } else {
        // If the access token is not stored, redirect to the Auth0 login page
        setAccessToken(null);
        setUserInfo(null);
        auth0.webAuth
          .authorize({ scope: "openid profile email" })
          .then(credentials => {
            // Successfully authenticated
            setAccessToken(credentials.accessToken);
            setUserInfo(null);
            SInfo.setItem("accessToken", credentials.accessToken, {});
            SInfo.setItem("refreshToken", credentials.refreshToken, {});
            RNRestart.Restart();
          }
        )
      }
    });
  }, []);

  return (
    <SafeAreaView>
    <View style={styles.general}>
      <View>
      <Image 
        source={require('../assets/cardImgPng.png')}
        style={styles.img}
      />

      </View>
      <View style={styles.card}>
        <Text style={styles.money}>$10.50</Text>
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text styles={styles.keyString}>ID 709bc049-2280-43d6-b82c-605b4ba09c11</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          title="Unlock Card"
          onPress={() => Alert.alert('Card unlocked!')}
        />
        <Button
          title="Add Credit"
          onPress={() => Alert.alert('+50 Credits added!')}
        />
      </View>
      <Text style={styles.title}>
        Your Shetky QR automatically canges every time you open the app
      </Text>
    
      <Divider style={{ color: '#E9F0F3', }} />
      <View style={styles.bottommenu}>
        <Icon name="credit-card" size={35} type="font-awesome" color="#AEC4D0" onPress={() => navigation.push('Card')}/>
        <Icon name="qrcode" size={35} type="font-awesome" color="#AEC4D0" onPress={() => navigation.push('Qr')}/>
        <Icon name="fastfood" size={35} type="materialicons" color="#AEC4D0" onPress={() => navigation.push('Food')}/>
        <Icon name="account-circle" size={35} type="materialicons" color="#AEC4D0" onPress={() => navigation.push('Account')}/>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    title: {
        paddingLeft:40,
        paddingRight:40,
        position: 'absolute',
        top: 300,
        color: '#AEC4D0',
        textAlign:'center'
    },

    img: {
        justifyContent: 'center',
        height:200,
        width:304,
        marginBottom:250,
        marginLeft:50,
        marginRight:50
    },

    general: {
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        justifyContent: 'space-around',
    },

    bottommenu: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    card: {
        justifyContent: 'flex-start',
    },

    money: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7900FF',
    },

    card: {
      position: 'absolute',
      top: 70,
      left: 80,
      width: 200,
      height: 150,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    
    keyString: {
      color: '#AEC4D0',
      fontSize: 12,
    }, 

    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    }
});