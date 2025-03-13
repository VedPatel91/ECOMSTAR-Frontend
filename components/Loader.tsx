import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loader = () => {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="black" />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
    },
});

export default Loader;
