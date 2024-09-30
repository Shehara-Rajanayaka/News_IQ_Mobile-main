import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenStyles, TextStyles } from "../../assets/styles/AppStyles";
import { colors } from "../../assets/styles/colors";
import { DefaultPasswordInput, DefaultTextInput } from "../../components/TextInputs";
import { DefaultButton } from "../../components/Buttons";
import GoogleIcon from "../../assets/Vectors/GoogleIcon";
import FacebookIcon from "../../assets/Vectors/FacebookIcon";

const SignInScreen = ({ navigation }: any) => {

  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <SafeAreaView style={[ScreenStyles.container, { backgroundColor: colors.BLUE_900 }]}>
      <ScrollView contentContainerStyle={[ScreenStyles.subContainer, { flexGrow: 1 }]}>
        <View style={[styles.containerStyle, { paddingVertical: 30 }]}>
          <Text style={[TextStyles.MAIN_2, { color: colors.BLUE_500 }]}>News <Text
            style={[TextStyles.MAIN_2, { color: colors.WHITE }]}>IQ</Text> </Text>
        </View>
        <View style={[styles.containerStyle]}>
          <Text style={[TextStyles.MAIN_4, { color: colors.WHITE }]}>Sign In</Text>
          <Text style={[TextStyles.P, { color: colors.WHITE, lineHeight: 24 }]}>Welcome! Let's dive into your
            account.</Text>
        </View>
        <View style={[{ paddingVertical: 30, gap: 16 }]}>
          <View style={[{ gap: 6 }]}>
            <Text style={[TextStyles.P, { color: colors.WHITE, lineHeight: 24 }]}>Username</Text>
            <DefaultTextInput placeholder={"Enter Your Username"} onChangeText={() => {
            }} />
          </View>
          <View style={[{ gap: 6 }]}>
            <Text style={[TextStyles.P, { color: colors.WHITE, lineHeight: 24 }]}>Password</Text>
            <DefaultPasswordInput placeholder={"Enter Your Password"} onChangeText={() => {
            }} />
          </View>
          <TouchableOpacity>
            <Text style={[TextStyles.P, { color: colors.WHITE, lineHeight: 24 }]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View>
          <DefaultButton onPress={() => navigation.navigate("Home")} text={"SIgn In"} />
        </View>
        <View style={[{ paddingVertical: 8, flexDirection: "row", justifyContent: "center" }]}>
          <Text style={[TextStyles.P, { color: colors.WHITE, lineHeight: 24 }]}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate("SignUp");
          }}>
            <Text style={[TextStyles.P, { color: colors.BLUE_500, lineHeight: 24 }]}> Sign Up</Text>
          </TouchableOpacity>
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
        <View style={[{ flexGrow: 1 }]}></View>
        <Text style={[TextStyles.H5, { textAlign: "center" }]}>© 2024 NEWSIQ by Thamoddya</Text>
        <TouchableOpacity>
          <Text style={[TextStyles.H5, { textAlign: "center" }]}>Terms & Conditions | Privacy Policy | Legal
            Notice</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

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
export default SignInScreen;
