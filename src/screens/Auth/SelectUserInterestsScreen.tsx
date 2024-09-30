import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ScreenStyles, TextStyles} from "../../assets/styles/AppStyles";
import {colors} from "../../assets/styles/colors";
import {AddIcon, CloseCircleIcon, Icon} from "@gluestack-ui/themed";
import {DefaultButton} from "../../components/Buttons";


// Define the type for interests
type Interest = 'Technology' | 'Business' | 'Health' | 'Science' | 'Sports' | 'Entertainment';

const SelectUserInterestsScreen = ({navigation}: any) => {

    const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);

    const toggleInterest = (interest: Interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const interests: Interest[] = ["Technology", "Business", "Health", "Science", "Sports", "Entertainment"];

    return (
        <SafeAreaView style={[ScreenStyles.container, {backgroundColor: colors.BLUE_900}]}>
            <ScrollView contentContainerStyle={[ScreenStyles.subContainer, {flexGrow: 1}]}>
                <Text style={[TextStyles.MAIN_3]}>Your Interests</Text>
                <Text style={[TextStyles.P]}>Select your interests fields to explore more news.</Text>

                <View style={[styles.interestContainer]}>
                    <Text style={[styles.interestTitle]}>Select the type of news categories which you are interested
                        in.</Text>

                    <View style={[styles.interestList]}>
                        {interests.map(interest => (
                            <TouchableOpacity
                                key={interest}
                                style={[
                                    styles.interestButton,
                                    selectedInterests.includes(interest) && styles.selectedButton,
                                    selectedInterests.includes(interest) && {borderColor: colors.BLUE_400}
                                ]}
                                onPress={() => toggleInterest(interest)}>
                                <Text style={[
                                    styles.interestText,
                                    selectedInterests.includes(interest) && styles.selectedText
                                ]}>
                                    {interest}
                                </Text>
                                <Icon as={selectedInterests.includes(interest) ? CloseCircleIcon : AddIcon}
                                      color={selectedInterests.includes(interest) ? colors.BLACK : colors.WHITE} w="$4"
                                      h="$4"/>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={[{
                    marginTop: 20
                }]}>
                    <DefaultButton text="Continue" onPress={navigation.navigate("Home")}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    interestContainer: {
        padding: 16,
        backgroundColor: "rgba(49,51,51,0.5)",
        borderRadius: 10,
        marginTop: 20
    },
    interestTitle: {
        color: colors.WHITE,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    interestList: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 10,
        gap: 10
    },
    interestButton: {
        borderColor: colors.GRAY_400,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: "row",
        gap: 6,
        borderRadius: 32,
        alignItems: "center"
    },
    selectedButton: {
        backgroundColor: colors.BLUE_400,
    },
    interestText: {
        color: colors.WHITE,
    },
    selectedText: {
        color: colors.BLACK,
    }
});

export default SelectUserInterestsScreen;
