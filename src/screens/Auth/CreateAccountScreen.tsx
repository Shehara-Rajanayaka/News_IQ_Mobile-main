import React, {useState} from "react";
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ChevronDownIcon,
    Icon,
    SafeAreaView,
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger
} from "@gluestack-ui/themed";
import {ScreenStyles, TextStyles} from "../../assets/styles/AppStyles";
import {colors} from "../../assets/styles/colors";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DefaultPasswordInput, DefaultTextInput} from "../../components/TextInputs";
import {DefaultButton} from "../../components/Buttons";

interface country {
    id: string,
    name: string
}

let countryData = [
    {
        id: " 1",
        name: "Sri Lanka"
    }
];

const CreateAccountScreen = ({navigation}: any) => {

    const [countries, setCountries] = useState<country[]>(countryData);

    return (
        <SafeAreaView style={[ScreenStyles.container, {backgroundColor: colors.BLUE_900}]}>
            <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={[ScreenStyles.subContainer, {flexGrow: 1}]}>
                <Text style={[TextStyles.MAIN_4]}>Create Account</Text>
                <Text style={[TextStyles.P, {color: colors.GRAY_200}]}>Lorem ipsum dolor sit amet, consectetur
                    adipiscing
                    elit. Lacus, eget erat bibendum in magna pretium rhoncus ut.
                </Text>
                <View style={[{paddingVertical: 30, gap: 16}]}>
                    <View style={[{gap: 6}]}>
                        <Text style={[TextStyles.P, {color: colors.WHITE, lineHeight: 24}]}>Name</Text>
                        <DefaultTextInput placeholder={"Enter Your Name"} onChangeText={() => {
                        }}/>
                    </View>
                    <View style={[{gap: 6}]}>
                        <Text style={[TextStyles.P, {color: colors.WHITE, lineHeight: 24}]}>Username</Text>
                        <DefaultTextInput placeholder={"Enter Username"} onChangeText={() => {
                        }}/>
                    </View>
                    <View style={[{gap: 6}]}>
                        <Text style={[TextStyles.P, {color: colors.WHITE, lineHeight: 24}]}>Password</Text>
                        <DefaultPasswordInput placeholder={"Enter Your Password"} onChangeText={() => {
                        }}/>
                    </View>
                    <View style={[{gap: 6}]}>
                        <Text style={[TextStyles.P, {color: colors.WHITE, lineHeight: 24}]}>Confirm Password</Text>
                        <DefaultPasswordInput placeholder={"Re Enter Password"} onChangeText={() => {
                        }}/>
                    </View>
                    <View style={[{gap: 6}]}>
                        <Text style={[TextStyles.P, {color: colors.WHITE, lineHeight: 24}]}>Select Country</Text>
                        <Select>
                            <SelectTrigger
                                variant="outline"
                                style={{
                                    backgroundColor: colors.BLUE_800,
                                    borderColor: colors.BLUE_800,
                                    height: 54,
                                    borderRadius: 8
                                }}>
                                <SelectInput style={{
                                    color: colors.WHITE,
                                }} placeholder="Select Country"/>
                                {/*@ts-ignore*/}
                                <SelectIcon mr="$3">
                                    <Icon as={ChevronDownIcon}/>
                                </SelectIcon>
                            </SelectTrigger>
                            <SelectPortal>
                                <SelectBackdrop/>
                                <SelectContent>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator/>
                                    </SelectDragIndicatorWrapper>
                                    {
                                        countries.map((country, index) => (
                                            <SelectItem label={country.name} key={index} value={country.id}/>
                                        ))
                                    }
                                </SelectContent>
                            </SelectPortal>
                        </Select>

                    </View>
                    <TouchableOpacity style={[{
                        flexDirection: "row",
                        gap: 8
                    }]}>
                        {/*Agree to terms and conditions*/}
                        <Text style={[TextStyles.P, {color: colors.WHITE, lineHeight: 24}]}>By signing up, you agree to
                            our Terms
                            & Conditions</Text>
                    </TouchableOpacity>
                </View>

                <DefaultButton onPress={navigation.navigate("SelectUserInterests")} text={"Complete Account"}/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    actionsheetDescription: {
        fontSize: 16,
        color: colors.BLUE_900,
        fontFamily: "SFPRODISPLAYREGULAR",
        textAlign: "center",
        lineHeight: 24,
        marginVertical: 16

    },
    actionsheetTitile: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        fontFamily: "SFPRODISPLAYBOLD",
        textAlign: "center"
    },
    actionsheetMainContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 16,
        paddingBottom: 16
    },
    containerStyle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.BLUE_900,
        padding: 16
    },
    nextBtn: {
        padding: 16,
        borderRadius: 60,
        backgroundColor: colors.WHITE,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    }
});
export default CreateAccountScreen;
