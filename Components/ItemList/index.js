import {FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";

const ItemList = ({data}) => {
    // data
    const numberOfItems = Object.entries(data).length;
    console.log(numberOfItems);



    return (

        <ScrollView >

            <View style={styles.cartContainer}>
                {data.map((item, index) => (
                    <View key={index} style={[styles.cartItem, numberOfItems === 1 ? {width: 300} : {width: 150,}]}>
                        <Text style={{ alignSelf: 'center' }}>{item.text}</Text>
                    </View>
                ))}
            </View>

            {/* render Flatlist of above template / might not need
        <FlatList data={data} renderItem={renderListItem} horizontal={true} style={{ width: '90%',}} />
        */
            }
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
    }

})