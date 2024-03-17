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
    const [cartItems, setCartItems] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);

    // Define a state variable to track the last assigned item ID
    const [lastItemId, setLastItemId] = useState(0);

    // keeping track of crossed items
    const [crossedItems, setCrossedItems] = useState(0);

    // load from AsyncStorage
    useEffect(() => {
        getData()
            .then(() =>{
                console.log('getData called')
            })
            .catch((e) => {
                console.log('Error: ', e)
            })

        setFirstLoad(false);
    }, []);

    useEffect(() => {
        // test
        console.log('useRffect of  clearCart() called\n...')

        if (crossedItems === cartItems.length && firstLoad === false) {
            clearCart();

            // test
            console.log('clearCart in useEffeect called\n...')
        }
    }, [crossedItems]);

    useEffect(() => {
        setCrossedItems(cartItems.filter(item => item.crossedOut).length);

        // test 
        console.log('setCrossedItems called\n...')
    }, [cartItems]);

    // store data to async
    useEffect(() => {

        storeData(cartItems)
        .then(() => {
            console.log('Data saved successfully!');
        })
        .catch((error) => {
            console.log('Error saving data: ', error);
        });

    }, [cartItems])


    ///// functions

    //code to change `crossedOut` of a specified item
    const handleFromChild = (data) => {

        // test
        console.log('handleFromChild called called, itemID: ', data);

        // Find the index of the carItem with the given ID
        const itemIndex = cartItems.findIndex(item => item.id === data);

        // test
        console.log(`~MainDisplay  itemIndex: ${itemIndex}`);
        console.log('~cartItem data: ', cartItems);

        if (itemIndex !== -1) {
            // Create a copy of the items array
            const updatedItems = [...cartItems];
            console.log('updatedItems: ', updatedItems);

            // Update the "crossedOut" property of the item at the found index
            updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                crossedOut: !updatedItems[itemIndex].crossedOut
            };

            setCartItems(updatedItems);
            // setCrossedItems(updatedItems.filter(item => item.crossedOut).length);
            // test
            console.log(`crossedItems: ${crossedItems} \nnumber of items: ${cartItems.length}`)
        }
    }

    // clear cart
    const clearCart = () => {
        // clear array
        setCartItems([]);

        // clear asyncstorage
        clearAsync()
            .then(() => {
                alert('You are done shopping!!!')
            })
            .catch((e) =>{
                console.log('Error clearing storage: ', e)
            })
    }

    // handle text input
    const handleText = (text) => {
        setText(text);
    }

    // record text input to array and asyncstorage
    const receiveInput = (text) => {

        if(text === undefined || !text.trim()){
            alert('Please writing something')
            setText('');
        } else {

            const newItem = { text, id: cartItems.length, crossedOut: false };
            setCartItems(prevCartItems => [...prevCartItems, newItem]);

            /*
            storeData(cartItems)
            .then(() => {
                console.log('Data saved successfully!');
            })
            .catch((error) => {
                console.log('Error saving data: ', error);
            });
            */

            setText('');
        }
    }

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
            const value = await  AsyncStorage.getItem('shoppingCart');
            if(value !==null) {
                const tempVar = JSON.parse(value);
                setCartItems(tempVar);
                setCrossedItems(tempVar.filter(item => item.crossedOut).length);
            }
        } catch (e) {
            console.log('Error loading getting data: ', e)
        }
    }

    // clear async
    const clearAsync = async () => {
        try {
            await AsyncStorage.removeItem('shoppingCart');
        } catch (e) {
            console.log('Error clearing storage: ', e);
        }
    }
    return (
        <View style={styles.container} id={'container-MainDisplay'}>
            <View style={styles.imageContainer} id={'img-container'}>
                <Image style={styles.image} source={require('./../../assets/Media/Cart.png')}/>
            </View>

            <TextInput id={'user-input'}
                placeholder={'Type here ...'}
                value={text}
                onChangeText={text => handleText(text)}

                style={{
                    position: 'absolute', top: '33%',
                    backgroundColor: '#bbbaba',
                    width: '80%', height: '8%', textAlign: 'center',
                    borderRadius: 15
                }}
            />

            <Pressable id={'button'} style={{
                borderRadius: 15, overflow: 'hidden', backgroundColor: '#c02e2e',
                position: 'absolute', top: '42%', width: '80%', height: '8%', alignItems: 'center',
                justifyContent: 'center',
            }} onPress={() => receiveInput(text)}>
                <Text style={{ color: 'white', paddingHorizontal: 5}}>ADD TO CART</Text>
            </Pressable>

            <View
                id={'result-container'}
                // style to add `justifyContent: 'Top'`
                style={[
                    styles.resultContainer]}
            >
                {
                    cartItems.length !== 0 ? <ItemList data={cartItems} sendToParent={handleFromChild}/> :
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