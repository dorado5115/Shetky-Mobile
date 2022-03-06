import {StyleSheet, View, Text, Image, Button, SafeAreaView, Alert} from 'react-native'
import React from 'react'

import Auth0 from "react-native-auth0"; // for using Auth0 within React Native
import SInfo from "react-native-sensitive-info"; // for securely storing the access and refresh tokens returned by Auth0
import RNRestart from "react-native-restart"; // for restarting the app after acquiring a new access token
import Config from "react-native-config"; // for getting the Auth0 domain and client ID from the config file

import BottomnMenu from './BottomnMenu';

export default function AccountScreen({navigation}) {
  const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID,
  });

  const [accessToken, setAccessToken] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);


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
         {userInfo ? (
           <View>
             <Text>{userInfo.name}</Text>
              <Text>{userInfo.email}</Text>
              <Text>{userInfo.picture}</Text>
              <Text>{userInfo.sub}</Text>
            </View>
            ) : (
              <Text>Loading...</Text>
            )
          }
       </View>
       <BottomnMenu navigation={navigation}/>
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

    fixToText: {
        width:'100%',
        color:'#ffffff',
        fontSize:20,
        paddingBottom:20,
        paddingTop:20,
        // backgroundColor: '#7000c2',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
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
        justifyContent: 'center'
    },

    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});