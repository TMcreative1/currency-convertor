import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    row: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        fontSize: 16,
        color: "#343434"
    },
    separator: {
        backgroundColor: "#E2E2E2",
        height: StyleSheet.hairlineWidth,
        marginLeft: 20
    }
});

export const RowItem = ({title, onPress, icon}) => {
  return (
      <TouchableOpacity onPress={onPress} style={styles.row}>
          <Text style={styles.text}>{title}</Text>
          {icon}
      </TouchableOpacity>
  );
};

export const RowSeparator = () => <View style={styles.separator}/>