import React, {useEffect, useRef, useState} from "react";
import {SafeAreaView} from "@gluestack-ui/themed";
import {Animated, Dimensions, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ScreenStyles, TextStyles} from "../../assets/styles/AppStyles";
import {colors} from "../../assets/styles/colors";
import {DefaultButton} from "../../components/Buttons";
import {OtpInput} from "react-native-otp-entry";

function EmailVerificationScreen({navigation}: any) {

    const [color, setColor] = useState(colors.BLUE_500);

    const AnimatedText = () => (
        <View style={[styles.containerStyle, {paddingVertical: 30}]}>
            <Text
                style={[
                    TextStyles.MAIN_2,
                    {color: colors.BLUE_500}
                ]}>
                News <Text style={[TextStyles.MAIN_2, {color: colors.WHITE}]}>IQ</Text>
            </Text>
        </View>
    );

    const verifyCode = (text: any) => {
        if (text === "12345") {
            setColor(colors.GREEN);
        } else {
            setColor(colors.BLUE_500);
        }
    };


    return (
        <SafeAreaView style={[ScreenStyles.container, {backgroundColor: colors.BLUE_900}]}>
            <ScrollView contentContainerStyle={[ScreenStyles.subContainer, {flexGrow: 1}]}>
                <AnimatedText/>
                <View style={[styles.containerStyle]}>
                    <Text style={[TextStyles.MAIN_4, {color: colors.WHITE}]}>Sign Up</Text>
                    <Text style={[TextStyles.P, {color: colors.WHITE, lineHeight: 24}]}>Welcome! Let's get
                        started.</Text>
                </View>
                <View style={[{
                    padding: 16,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    marginTop: 16,
                    borderRadius: 16,
                    gap: 16,
                    borderColor: colors.BLUE_500,
                    borderWidth: 1,
                    height: Dimensions.get("window").height / 2
                }]}>
                    <Text style={[TextStyles.MAIN_4]}>Email Verification</Text>
                    <Text style={[TextStyles.H4]}>We’ve sent an Email with an activation code to <Text
                        style={[{color: colors.BLUE_500}]}>example@example.com</Text>
                    </Text>
                    <View>
                        <OtpInput theme={{
                            pinCodeContainerStyle: {
                                borderWidth: 1,
                                borderRadius: 8,
                                borderColor: color,
                                padding: 8,
                                margin: 8,
                                width: Dimensions.get("window").width / 8
                            },
                            filledPinCodeContainerStyle: {
                                borderColor: color
                            },
                            pinCodeTextStyle: {
                                color: colors.WHITE,
                                fontSize: 24
                            },
                            focusedPinCodeContainerStyle: {
                                borderColor: colors.BLUE_100
                            }
                        }} numberOfDigits={5} onTextChange={(text) => verifyCode(text)}/>
                    </View>
                    <View>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 4
                        }}>
                            <Text style={[TextStyles.P, {color: colors.GRAY_200}]}>Didn't receive the code?</Text>
                            <Text style={[TextStyles.P, {color: colors.BLUE_500}]}>Resend Code</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[{flexGrow: 1}]}></View>
                    <DefaultButton onPress={() => navigation.navigate("CreateAccount")} text={"Verify Code"}/>
                    {/*<ActivityIndicator style={{*/}
                    {/*  position: "absolute",*/}
                    {/*  bottom: 16,*/}
                    {/*  alignSelf: "center"*/}
                    {/*}} size="large" color={colors.BLUE_500} />*/}
                </View>
                <View style={[{flexGrow: 1}]}></View>
                <Text style={[TextStyles.H5, {textAlign: "center"}]}>© 2024 NEWSIQ by Thamoddya</Text>
                <TouchableOpacity activeOpacity={0.1}>
                    <Text style={[TextStyles.H5, {textAlign: "center"}]}>Terms & Conditions | Privacy Policy | Legal
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
    }
});

export default EmailVerificationScreen;
