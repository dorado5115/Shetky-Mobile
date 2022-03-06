import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React from 'react';
import Auth0 from 'react-native-auth0';
import SInfo from 'react-native-sensitive-info';
import DeviceInfo from 'react-native-device-info';

const auth0 = new Auth0({
    domain: 'dev-e5pv8qrt.us.auth0.com',
    clientId: '6nW97SjfCp6k1xuqgkaZCDFyOc26fxsz',
});

export default function SignInScreen({ navigation }){
    const [accessToken, setAccessToken] = React.useState(null);
    const [initialize, setInitialize] = React.useState(null);

    React.useEffect(() => {
        SInfo.getItem('accessToken', {})
        .then(accessToken => {
            if (accessToken) {
                auth0.auth
                    .userInfo({ token: accessToken })
                    .then(userInfo => {
                        console.log(userInfo);
                        setAccessToken(accessToken);
                        setInitialize(true);
                        navigation.navigate('Card');
                    })
                    .catch(error => {
                        console.log(error);
                        setAccessToken(null);
                        setInitialize(false);
                    });
            } else {
                setAccessToken(null);
                setInitialize(false);
            }
        });
    }, []);

    const logIn = async () => {
        auth0.webAuth
            .authorize({scope: 'openid profile email'})
            .then(credentials =>
            // Successfully authenticated
            setAccessToken(credentials.accessToken),
            setInitialize(true)
        )
        .catch(error => console.log(error));
        SInfo.setItem('accessToken', credentials.accessToken, {})
        SInfo.setItem('refreshToken', credentials.refreshToken, {})
        navigation.navigate('Card');
    }

    const logOut = async () => {
        auth0.webAuth
        .clearSession({})
        .then(success => {
            Alert.alert(
                'Logged out!'
            );
            setAccessToken(null);
            setInitialize(false);

            SInfo.deleteItem("accessToken", {});
            SInfo.deleteItem("refreshToken", {});
        })
        .catch(error => {
            console.log('Log out cancelled');
        });
    }


    return (
        <View >
            <Image/>
            <Text>Sign in app!</Text>
            <Text>Sign in app!</Text>
            <Text>Sign in app!</Text>
            <Button title="Sign in" onPress={logIn} />
            <Button title="Sign out" onPress={logOut} />
        </View>
    );
}