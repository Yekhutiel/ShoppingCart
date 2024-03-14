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
            top: 70,
            right: 100,

            width: 200,
            height: 200,
        },
        image: {
            width: '100%',
            height: '100%',
        },
    resultContainer: {
        position: 'absolute',
        top: 450,
        width: '100%',
        height: 280,
        alignItems: 'center',
        alignContent: 'center',
    }
    });

export default styles;