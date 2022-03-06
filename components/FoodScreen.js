import {StyleSheet, TextInput, View, Text, Image, Button, SafeAreaView} from 'react-native'
import React from 'react'

export default function FoodScreen() {
  return (

    <View style={styles.generalView}>
        <View>
            <TextInput 
            style={styles.input}
            placeholder='Search...' />
            <View style={styles.input}>
                <View></View>
                <View></View>
            </View>
        </View>
        <View style={styles.foodSelect}>
            <View style={styles.foodSelectGrid}>
                <Button 
                title="Add Tacos"
                onPress={() => Alert.alert('')}/>
                <Button
                title="Add Pizza"
                onPress={() => Alert.alert('')}/>
            </View>
            <View style={styles.foodSelectGrid}>
                <Button
                title="Add Rice"
                onPress={() => Alert.alert('')}/>
                <Button
                title="Add Bread"
                onPress={() => Alert.alert('')}/>
            </View>
        </View>
        <Divider style={{ color: '#E9F0F3', }} />
        <View style={styles.bottomMenu}>
            <Image style={{width:40, height:32}} source={require('../assets/creditCard.png')} onPress={() => navigationRef.navigate('Card')}/>
            <Image style={{width:40, height:40}} source={require('../assets/qrCode.png')}  onPress={() => navigationRef.navigate('Qr')} />
            <Image style={{width:40, height:40}} source={require('../assets/fastFood.png')}   onPress={() => navigationRef.navigate('Food')} />
            <Image style={{width:40, height:40}} source={require('../assets/accountCircle.png')}   onPress={() => navigationRef.navigate('Account')}/>
        </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    generalView:{
        width:'100%',
    },

    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'relative',
        top: 150
    },

    input: {
        borderWidth: 1, 
        borderColor: '#AEC4D0',
        padding: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 300,
        marginBottom: 20
    },

    foodSelectGrid: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom:40
    },

    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});