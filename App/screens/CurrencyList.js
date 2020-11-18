import React, {useContext} from 'react';
import {StatusBar, FlatList, View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Entypo} from "@expo/vector-icons";

import currencies from '../data/currencies.json';
import {RowItem, RowSeparator} from '../components/RowItem';
import colors from '../constants/colors';
import {ConversionContext} from "../uitils/ConversionContext";

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        backgroundColor: colors.blue,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ({navigation, route = {}}) => {
    const insets = useSafeAreaInsets();
    const {setBaseCurrency, setQuoteCurrency, baseCurrency, quoteCurrency} = useContext(ConversionContext);

    const params = route.params || {};
    const {activeCurrency} = params;
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <StatusBar barStyle="dark-content" backgroundColor={colors.white}/>
            <FlatList
                data={currencies}
                renderItem={({item}) => {
                    let selected = false;
                    if (params.isBaseCurrency && item === baseCurrency) {
                        selected = true;
                    } else if (!params.isBaseCurrency && item === quoteCurrency) {
                        selected = true;
                    }
                    return (
                        <RowItem
                            title={item}
                            onPress={() => {
                                if (params.isBaseCurrency) {
                                    setBaseCurrency(item);
                                } else {
                                    setQuoteCurrency(item);
                                }
                                navigation.pop();
                            }}
                            icon={
                                selected && (
                                    <View style={styles.icon}>
                                        <Entypo name="check" size={20} color={colors.white}/>
                                    </View>
                                )
                            }
                        />
                    );
                }}
                keyExtractor={(item) => item}
                ItemSeparatorComponent={() => <RowSeparator/>}
                ListFooterComponent={() => (
                    <View style={{paddingBottom: insets.bottom}}/>
                )}
            />
        </View>
    );
};