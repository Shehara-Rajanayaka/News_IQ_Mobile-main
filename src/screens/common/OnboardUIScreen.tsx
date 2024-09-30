import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../assets/styles/colors";
import { ScreenStyles, TextStyles } from "../../assets/styles/AppStyles";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ChevronRightIcon,
  Icon
} from "@gluestack-ui/themed";

const OnboardUiScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("Stay Informed with Personalized News");
  const [description, setDescription] = useState("Get the latest news from your favorite sources and topics. Personalize your news feed to see only the news that you care about.");
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [clickedEvents, setClickedEvents] = React.useState(1);

  function handleNext() {
    if (clickedEvents === 1) {
      setTitle("Choose Your Interests");
      setDescription("Select your favorite topics and get personalized news recommendations. NewsIQ learns from your preferences to bring you the news that matters most");
      setClickedEvents(2);
    } else {
      handleActionSheet();
    }
  }

  const handleActionSheet = () => {
    setShowActionsheet(!showActionsheet);
  };

  const handleGetStarted = () => {
    setShowActionsheet(!showActionsheet);
    navigation.reset(
      {
        index: 0,
        routes: [{ name: "SignIn" }]
      }
    );
  };

  const ActionSheet = () => (
    <Actionsheet
      isOpen={showActionsheet}
      onClose={handleActionSheet}
      zIndex={999}
      useRNModal={false}
      closeOnOverlayClick={true}
      // @ts-ignore
      closeOnDragDown={true}
      dragFromTopOnly={true}>
      <ActionsheetBackdrop />
      <ActionsheetContent style={[{
        padding: 16
      }]}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <View style={[styles.actionsheetMainContainer]}>
          <Text style={[styles.actionsheetTitile]}>Welcome to <Text
            style={[styles.actionsheetTitile, { color: colors.BLUE_500 }]}>News</Text> IQ</Text>
          <Text style={[styles.actionsheetDescription]}>
            your smart news companion that delivers personalized, real-time news updates right to your fingertips. Stay
            informed, stay ahead!
          </Text>
        </View>
        <TouchableOpacity onPress={handleGetStarted} style={{
          backgroundColor: colors.BLUE_500,
          padding: 16,
          borderRadius: 8,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 16
        }}>
          <Text style={[TextStyles.H3, { color: colors.WHITE }]}>Get Started</Text>
        </TouchableOpacity>
      </ActionsheetContent>
    </Actionsheet>
  );


  return (
    <ImageBackground
      source={require("../../assets/Images/bgVector.png")} // Ensure you have a correct path and format for the vector
      style={[ScreenStyles.container, styles.containerStyle]}
    >
      <View style={{ flexGrow: 1 }}></View>
      <Text style={[TextStyles.MAIN_4, { textAlign: "justify" }]}>
        {title}
      </Text>
      <Text style={[TextStyles.H3, { textAlign: "center" }]}>
        {description}
      </Text>
      <View style={{ flexGrow: 1 }}></View>
      <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
        <Icon as={ChevronRightIcon} size="xl" color={colors.BLUE_900} />
      </TouchableOpacity>
      <ActionSheet />
    </ImageBackground>
  );
};

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

export default OnboardUiScreen;
