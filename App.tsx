import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import splashScreen from "./src/screens/common/splashScreen";
import { colors } from "./src/assets/styles/colors";
import OnboardUiScreen from "./src/screens/common/OnboardUIScreen";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";


import SignInScreen from "./src/screens/common/SignInScreen";
import SignUpScreen from "./src/screens/common/SignUpScreen";
import EmailVerificationScreen from "./src/screens/Auth/EmailVerificationScreen";
import CreateAccountScreen from "./src/screens/Auth/CreateAccountScreen";
import HomeScreen from "./src/screens/common/HomeScreen";
import SelectUserInterestsScreen from "./src/screens/Auth/SelectUserInterestsScreen";
import NewsContentScreen from "./src/screens/common/NewsContentScreen";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <GluestackUIProvider config={config}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">

                    <Stack.Screen name="Splash"
                        component={splashScreen}
                        options={{
                            headerShown: false,
                            statusBarColor: "transparent",
                            statusBarStyle: "light",
                            statusBarTranslucent: true
                        }}
                    />

                    <Stack.Screen name="OnboardUI"
                        component={OnboardUiScreen}
                        options={{
                            headerShown: false,
                            statusBarColor: colors.BLUE_900,
                            statusBarStyle: "light",
                            statusBarTranslucent: true
                        }}
                    />

                    <Stack.Screen name="SignIn"
                        component={SignInScreen}
                        options={{
                            headerShown: false,
                            statusBarColor: colors.BLUE_900,
                            statusBarStyle: "light",
                            statusBarTranslucent: true
                        }}
                    />

                    <Stack.Screen name="SignUp"
                        component={SignUpScreen}
                        options={{
                            headerShown: false,
                            statusBarColor: colors.BLUE_900,
                            statusBarStyle: "light",
                            statusBarTranslucent: true
                        }}
                    />

                    <Stack.Screen name="EmailVerification"
                        component={EmailVerificationScreen}
                        options={{
                            headerShown: false,
                            statusBarColor: colors.BLUE_900,
                            statusBarStyle: "light",
                            statusBarTranslucent: true
                        }}
                    />

                    <Stack.Screen name="CreateAccount"
                        component={CreateAccountScreen}
                        options={{
                            headerTitle: "",
                            headerBackTitleVisible: false,
                            headerTintColor: "#FFF",
                            headerTitleAlign: "center",
                            statusBarColor: colors.BLUE_900,
                            headerShadowVisible: false,
                            statusBarStyle: "dark",
                            headerStyle: { backgroundColor: colors.BLUE_900 }
                        }}
                    />

                    <Stack.Screen name="SelectUserInterests"
                        component={SelectUserInterestsScreen}
                        options={{
                            headerShown: false,
                            headerTitle: "",
                            headerBackTitleVisible: false,
                            headerTintColor: "#FFF",
                            headerTitleAlign: "center",
                            statusBarColor: colors.BLUE_900,
                            headerShadowVisible: false,
                            statusBarStyle: "dark",
                            headerStyle: { backgroundColor: colors.BLUE_900 },
                        }}
                    />

                    <Stack.Screen name="Home"
                        component={HomeScreen}
                        options={{
                            headerShown: false,
                            headerTitle: "",
                            headerBackTitleVisible: false,
                            headerTintColor: "#FFF",
                            headerTitleAlign: "center",
                            statusBarColor: colors.GRAY_900,
                            headerShadowVisible: false,
                            statusBarStyle: "dark",
                            headerStyle: { backgroundColor: colors.BLUE_900 },
                        }}
                    />

                    <Stack.Screen name="NewsContent"
                        component={NewsContentScreen}
                        options={{
                            headerShown: true,
                            headerTitle: "",
                            headerBackTitleVisible: true,
                            headerTintColor: "#FFF",
                            headerTitleAlign: "center",
                            statusBarColor: colors.GRAY_900,
                            headerShadowVisible: false,
                            statusBarStyle: "dark",
                            headerStyle: { backgroundColor: colors.GRAY_900 },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </GluestackUIProvider>
    );
}

export default App;
