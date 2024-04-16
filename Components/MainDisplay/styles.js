import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',

            backgroundColor: '#dadada',
            alignItems: 'center',
            justifyContent: 'center',
        },
        imageContainer:{
            position: "absolute", 
            top: '10%',
            

            width: 200,
            height: 200,
        },
        image: {
            width: '100%',
            height: '100%',
        },
    resultContainer: {

        position: 'absolute',
        top: '53%',
        width: '90%',
        height: '45%',
        alignItems: 'center',
        alignContent: 'center',
    }
    });

export default styles;