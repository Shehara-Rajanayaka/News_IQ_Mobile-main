import React, { useEffect } from "react";
import { ScreenStyles, TextStyles } from "../../assets/styles/AppStyles";
import { colors } from "../../assets/styles/colors";
import { Animated, StyleSheet, Text, SafeAreaView, View, Dimensions } from "react-native";
import Image = Animated.Image;

const SplashScreen = ({ navigation }: any) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3500);
  })

  return (
    <SafeAreaView style={[ScreenStyles.container, styles.containerStyle]}>
      <Text style={[TextStyles.MAIN_3, { color: colors.BLUE_500 }]}>NEWS <Text
        style={[TextStyles.MAIN_3, { color: colors.BLUE_100 }]}>IQ</Text></Text>
      <Image source={require("../../assets/Images/Bird.png")} style={{ width: 80, height: 80 }} />

      <View style={[{
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
      }]}>
        <Image source={require("../../assets/Images/geminiAnimation.gif")} style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height / 3,
          opacity: 0.3,
          resizeMode: "cover",
          position: "relative",
        }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#090909"
  }
});
export default SplashScreen;
