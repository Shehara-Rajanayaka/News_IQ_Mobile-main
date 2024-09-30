import React, { useEffect, useRef } from "react";
import { ScreenStyles, TextStyles } from "../../assets/styles/AppStyles";
import { colors } from "../../assets/styles/colors";
import { Animated, Easing, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DefaultTextInput } from "../../components/TextInputs";
import { DefaultButton } from "../../components/Buttons";
import GoogleIcon from "../../assets/Vectors/GoogleIcon";
import FacebookIcon from "../../assets/Vectors/FacebookIcon";

function SignUpScreen({ navigation }: any) {

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ]).start();
  }, [opacity, scale]);

  const AnimatedText = () => (
      <View style={[styles.containerStyle, { paddingVertical: 30 }]}>
        <Animated.Text
            style={[
              TextStyles.MAIN_2,
              { color: colors.BLUE_500, opacity, transform: [{ scale }] }
            ]}
        >
          News <Text style={[TextStyles.MAIN_2, { color: colors.WHITE }]}>IQ</Text>
        </Animated.Text>
      </View>
  );


  return (
      <SafeAreaView style={[ScreenStyles.container, { backgroundColor: colors.BLUE_900 }]}>
        <ScrollView contentContainerStyle={[ScreenStyles.subContainer, { flexGrow: 1 }]}>
          <AnimatedText />
          <View style={[styles.containerStyle]}>
            <Text style={[TextStyles.MAIN_4, { color: colors.WHITE }]}>Sign Up</Text>
            <Text style={[TextStyles.P, { color: colors.WHITE, lineHeight: 24 }]}>Welcome! Let's get started.</Text>
          </View>
          <View style={[{
            padding: 16,
            backgroundColor: "rgba(255,255,255,0.08)",
            marginTop: 16,
            borderRadius: 16,
            gap: 16,
            borderColor: colors.BLUE_500,
            borderWidth: 1
          }]}>
            <Text style={[TextStyles.MAIN_4]}>Start using <Text
                style={[{ color: colors.BLUE_500 }]}>News</Text> IQ</Text>
            <View style={[{ gap: 6 }]}>
              <Text style={[TextStyles.P, { color: colors.WHITE, lineHeight: 24 }]}>Email</Text>
              <DefaultTextInput placeholder={"example@example.com"} onChangeText={() => {
              }} />
            </View>
            <Text style={[TextStyles.H4]}>By clicking any of the Sign Up buttons, you agree to the<Text
                style={[{ color: colors.BLUE_500 }]}> Terms Of Service</Text>
            </Text>
            <View>
              <DefaultButton onPress={() => navigation.navigate("EmailVerification")} text={"Sign Up"} />
              <View style={[{ paddingVertical: 0, flexDirection: "row", justifyContent: "flex-start" }]}>
                <Text style={[TextStyles.P, { color: colors.WHITE }]}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => {
                  navigation.navigate("SignIn");
                }}>
                  <Text style={[TextStyles.P, { color: colors.BLUE_500 }]}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={[TextStyles.H5, { textAlign: "center" }]}>OR</Text>
              <View style={[{ paddingVertical: 12 }]}>
                <TouchableOpacity style={[styles.socialButton]}>
                  <GoogleIcon width={25} height={25} />
                  <Text style={[TextStyles.P, { color: colors.GRAY_200, lineHeight: 24 }]}>Sign In With Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton]}>
                  <FacebookIcon width={25} height={25} />
                  <Text style={[TextStyles.P, { color: colors.GRAY_200, lineHeight: 24 }]}>Sign In With Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[{ flexGrow: 1 }]}></View>
          <Text style={[TextStyles.H5, { textAlign: "center" }]}>© 2024 NEWSIQ by Thamoddya</Text>
          <TouchableOpacity activeOpacity={0.1}>
            <Text style={[TextStyles.H5, { textAlign: "center" }]}>Terms & Conditions | Privacy Policy | Legal
              Notice</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  socialButton: {
    borderRadius: 16,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    height: 54,
    flexDirection: "row",
    borderColor: colors.BLUE_500,
    borderWidth: 1,
    gap: 6
  }
});
export default SignUpScreen;
