import {
    Image,
    Pressable,
    Text,
    TextInput,
    Touchable,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from "react-native";
import styles from "./styles";
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemList from "../ItemList";

const MainDisplay = (props) => {
    // data and hooks
    const [text, setText] = useState('');
    const [cartItems, setCartItems] = useState([])

    ///// functions

    // empty cart
    const doneWithCart = () => {
        // delete entire array
    }

    // handle text input
    const handleText = (text) => {
        setText(text);
    }

    // record text input to array and asyncstorage
    const receiveInput = (text) => {

        if(text === undefined){
            alert('You did not write anything!!!')
            setText('');
        } else {
            setCartItems(prevCartItems => [...prevCartItems, {text}]);

            storeData(cartItems)
                .then(() => {
                    console.log('Data saved successfully!');
                })
                .catch((error) => {
                    console.log('Error saving data: ', error);
                });

            setText('');
        }
    }

    // load from AsyncStorage
    useEffect(() => {
        getData()
            .then(() =>{
                console.log('getData called')
            })
            .catch((e) => {
                console.log('Error: ', e)
            })
    }, []);

    ///// asyncstorage functions

    // store into storage
    const storeData = async (item) => {
        try{
            await AsyncStorage.setItem('shoppingCart', JSON.stringify(item));
        } catch (e) {
            console.log('Error storing data: ', e);
        }
    };

    // load from storage
    const getData = async () => {
        try{
            AsyncStorage.getItem('items')
                .then(value => {
                    if (value != null){
                        const tempVar  = JSON.parse(value);
                        cartItems.push(...tempVar);
                    }
                })
        } catch (e) {
        console.log(e)
    }
}
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('./../../assets/Media/Cart.png')}/>
            </View>

            <TextInput
                placeholder={'Type here ...'}
                value={text}
                onChangeText={text => handleText(text)}

                style={{
                    position: 'absolute',
                    top: 290, backgroundColor: '#bbbaba',
                    width: 300, height: 60, textAlign: 'center',
                    borderRadius: 15
                }}
            />

            <Pressable style={{
                borderRadius: 15, overflow: 'hidden', backgroundColor: '#c02e2e',
                position: 'absolute', top: 360, width: 300, height: 60, alignItems: 'center',
                justifyContent: 'center',
            }} onPress={() => receiveInput(text)}>
                <Text style={{ color: 'white', paddingHorizontal: 5}}>ADD TO CART</Text>
            </Pressable>

            <View

                // style to add `justifyContent: 'Top'`
                style={[
                    styles.resultContainer,
                    cartItems.length !== 0 ? { justifyContent: 'flex-start' } : { justifyContent: 'middle' }]}
            >
                {
                    cartItems.length !== 0 ? <ItemList data={cartItems}/> :
                        <View
                            style={{
                                position: 'absolute', width: '80%', height: '80%',
                                justifyContent: 'center', alignItems: 'center'
                            }}
                        ><Text>There is nothing in your cart</Text></View>
                }
            </View>
        </View>
    );
}

export default MainDisplay;