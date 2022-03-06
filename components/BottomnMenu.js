import { Icon, Divider } from 'react-native-elements';
import {View, Button, StyleSheet} from 'react-native'

export default function BottomnMenu({navigation}){
    return(
        <>
            <Divider style={{ color: '#E9F0F3', }} />
            <View style={styles.container}>
                <Icon name="credit-card" size={35} type="font-awesome" color="#AEC4D0" onPress={() => navigation.push('Card')}/>
                <Icon name="qrcode" size={35} type="font-awesome" color="#AEC4D0" onPress={() => navigation.push('Qr')}/>
                <Icon name="fastfood" size={35} type="materialicons" color="#AEC4D0" onPress={() => navigation.push('Food')}/>
                <Icon name="account-circle" size={35} type="materialicons" color="#AEC4D0" onPress={() => navigation.push('Account')}/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});