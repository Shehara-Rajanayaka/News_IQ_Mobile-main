import { colors } from "../assets/styles/colors";
import { Text, TouchableOpacity } from "react-native";
import { TextStyles } from "../assets/styles/AppStyles";
import React from "react";

export const DefaultButton=({onPress,text}:any)=>{
  return(
    <TouchableOpacity onPress={onPress} style={{
      backgroundColor: colors.BLUE_500,
      padding: 16,
      borderRadius: 8,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      height: 54
    }}>
      <Text style={[TextStyles.H3, { color: colors.WHITE }]}>{text}</Text>
    </TouchableOpacity>
  );
}
