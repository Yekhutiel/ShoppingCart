import {FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";

const ItemList = ({data, sendToParent}) => {
    // data
    // const numberOfItems = Object.entries(data).length;

    const numberOfItems = data.length;

    // functions
    const itemPressed = (itemID) => {
        sendToParent(itemID);

        // test
        console.log('-ItemList ~ itemPressed id: ', itemID, '\n...');
    }

    return (

        <ScrollView id={'scrollView'}>

            <View style={styles.cartContainer} id={'data-container'}>
                {data.map((item, /*index*/ ) => (
                    <Pressable
                        key={/*index*/ item.id} // using item's id instead of key
                        onPress={() => itemPressed(item.id)}
                        style={[styles.cartItem, numberOfItems === 1 ? {width: 300} : {width: 150,}]} id={'item'}>
                        <Text style={[styles.Text, item.crossedOut && styles.crossedOut]}>{item.text}</Text>
                    </Pressable>
                ))}
            </View>
        </ScrollView>

    );
}

export default ItemList;

const styles = StyleSheet.create({
    cartItem: {
        backgroundColor: '#f8efef',
        height: 60,
        overflow: 'hidden',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    cartContainer: {
        width: '100%',

        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    Text: {
        alignSelf: 'center',
    },
    crossedOut: {
        textDecorationLine: 'line-through',
    }

})