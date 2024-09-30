import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../assets/styles/colors";
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, Icon } from "@gluestack-ui/themed";

export const DefaultTextInput = ({ placeholder, onChangeText }: any) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={colors.GRAY_300}
      style={[{
        backgroundColor: colors.BLUE_800,
        color: colors.WHITE,
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height:54
      }]} />
  );
};

export const DefaultPasswordInput = ({ placeholder, onChangeText }: any) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const togglePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };
  return (
    <View style={TextFieldStyles.textInputWrapper}>
      <TextInput
        style={[TextFieldStyles.TextInputStyle, { paddingRight: 38, height:54 }]}
        placeholder={placeholder}
        placeholderTextColor={colors.GRAY_300}
        onChangeText={onChangeText}
        secureTextEntry={isPasswordSecure} />
      <TouchableOpacity onPress={togglePasswordVisibility} style={TextFieldStyles.iconButton}>
        {isPasswordSecure ? <Icon as={EyeIcon} color={colors.WHITE}  w="$6" h="$6" /> :
          <Icon as={EyeOffIcon} color={colors.WHITE}   w="$6" h="$6" />
        }
      </TouchableOpacity>
    </View>
  );
};


let TextFieldStyles = StyleSheet.create({
  textInputWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  iconButton: {
    padding: 16,
    position: "absolute",
    right: 0
  },
  TextInputStyle: {
    padding: 16,
    backgroundColor: colors.BLUE_800,
    borderRadius: 8,
    color: "#FFF",
    flexGrow: 1
  },
  dateTextSHow: {
    padding: 16,

    borderRadius: 8,
    color: "#000",
    flexGrow: 1
  }
});
