import React, {useState, useContext} from "react";
import {View, StatusBar, StyleSheet, Image, Dimensions, Text, ScrollView, TouchableOpacity, ActivityIndicator} from "react-native";
import colors from "../constants/colors";
import moment from 'moment';
import {ConversionInput} from "../components/ConversionInput";
import {Button} from "../components/Button";
import {KeyboardSpacer} from "../components/KeyboardSpacer";
import {Entypo} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {ConversionContext} from "../uitils/ConversionContext";

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        flex: 1
    },
    content: {
        paddingTop: screen.height * 0.1
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    logoBackground: {
        width: screen.width * 0.45,
        height: screen.width * 0.45
    },
    logo: {
        position: "absolute",
        width: screen.width * 0.25,
        height: screen.width * 0.25
    },
    textHeader: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginVertical: 20
    },
    text: {
        color: colors.white,
        textAlign: "center",
        fontSize: 13
    },
    header: {
        alignItems: "flex-end",
        marginHorizontal: 20
    }
});

export default ({navigation}) => {
    const {
        baseCurrency,
        quoteCurrency,
        swapCurrencies,
        date,
        rates,
        isLoading
    } = useContext(ConversionContext);

    const conversionRate = rates[quoteCurrency];
    const currentDate = date;

    const [scrollEnabled, setScrollEnabled] = useState(false);
    const [value, setValue] = useState("100");

    return (
        <View style={styles.container}>
            <ScrollView scrollEnabled={scrollEnabled}>
                <StatusBar barStyle="light-content" backgroundColor={colors.blue}/>
                <SafeAreaView style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.push("Options")}>
                        <Entypo name="cog" size={32} color={colors.white}/>
                    </TouchableOpacity>
                </SafeAreaView>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/images/background.png')} style={styles.logoBackground}
                               resizeMode="contain"/>
                        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
                    </View>

                    <Text style={styles.textHeader}>Currency converter</Text>
                    {isLoading ? (
                        <ActivityIndicator color={colors.white} size="large"/>
                    ) : (
                        <>
                            <ConversionInput
                                onChangeText={(value) => setValue(value)}
                                text={baseCurrency}
                                onButtonPress={() => navigation.push("CurrencyList", {
                                    title: "Base currency",
                                    activeCurrency: baseCurrency,
                                    isBaseCurrency: true
                                })}
                                value={value}
                                keyboardType="numeric"
                            />
                            <ConversionInput
                                text={quoteCurrency}
                                onButtonPress={() => navigation.push("CurrencyList", {
                                    title: "Quote currency",
                                    activeCurrency: quoteCurrency,
                                    isBaseCurrency: false
                                })}
                                editable={false}
                                value={
                                    value && `${(parseFloat(value) * conversionRate).toFixed(2)}`
                                }
                                keyboardType="numeric"
                            />

                            <Text style={styles.text}>
                                {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${currentDate}.`}
                            </Text>

                            <Button text="Reverse Currencies" onPress={() => swapCurrencies()}/>
                        </>
                    )}
                    <KeyboardSpacer onToggle={(isKeyboardVisible) => setScrollEnabled(isKeyboardVisible)}/>
                </View>
            </ScrollView>
        </View>
    );
}