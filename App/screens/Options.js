import React from "react";
import {SafeAreaView, StyleSheet, View, ScrollView, StatusBar} from "react-native";
import colors from "../constants/colors";
import {RowItem, RowSeparator} from "../components/RowItem"
import {Entypo} from "@expo/vector-icons";

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    }
});

export default () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white}/>
            <ScrollView>
                <View style={styles.container}>
                    <RowItem
                        title="Themes"
                        icon=<Entypo name="chevron-right" size={20} color={colors.blue}/>
                    />
                    <RowSeparator/>
                    <RowItem
                        title="React"
                        icon=<Entypo name="export" size={20} color={colors.blue}/>
                    />
                    <RowSeparator/>
                    <RowItem
                        title="React Native by Example"
                        icon=<Entypo name="export" size={20} color={colors.blue}/>
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}