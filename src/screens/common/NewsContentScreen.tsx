import React, { useCallback, useState, useRef, useEffect } from "react";
import { SafeAreaView, ScrollView, Image, Text, View, TouchableOpacity, Animated, Easing, ActivityIndicator } from "react-native";
import { ScreenStyles } from "../../assets/styles/AppStyles";
import { colors } from "../../assets/styles/colors";
import { useFocusEffect } from "@react-navigation/native";
import { getNewsById } from "../../services/newsService";
import { format } from 'date-fns';
import { generateData } from "../../services/geminiService";
import Tts from 'react-native-tts';
import { Icon, Microphone, MicrophoneSlash } from "iconsax-react-native";

const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "MMMM do, yyyy");
};

const NewsContentScreen = ({ navigation, route }: any) => {
    const [newsContent, setNewsContent] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [textLoading, setTextLoading] = useState(true);
    const [contentText, setContentText] = useState<string>("");
    const [displayedText, setDisplayedText] = useState<string>("");
    const [status, setStatus] = useState<boolean>(false);
    const [speakContent, setspeakContent] = useState<string>("");
    const [isSpeacking, setIsSpeaking] = useState<boolean>(false);

    const charIndex = useRef(0);

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                await loadNewsByID(route.params.data);
                setLoading(false);
                setTextLoading(false);
            };
            loadData();
            return () => { };
        }, [])
    );

    let spinValue = new Animated.Value(0);

    const speakText = async () => {

        if (speakContent === "") {
            console.log("stop speaking");
            return;
        }

        setIsSpeaking(!isSpeacking);
        Tts.setDefaultLanguage('en-IE');
        Tts.setDefaultRate(0.6);
        Tts.setDefaultPitch(1);
        Tts.setDefaultRate(0.5);

        Tts.getInitStatus().then(() => {
            Tts.speak(speakContent, {
                iosVoiceId: 'cmn-tw-x-ctd-local',
                rate: 0.5,
                androidParams: {
                    KEY_PARAM_PAN: -1,
                    KEY_PARAM_VOLUME: 0.9,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }, (err) => {
            if (err.code === 'no_engine') {
                Tts.requestInstallEngine();
            }
        });
    };

    const stopSpeak = () => {
        Tts.stop();
        setIsSpeaking(!isSpeacking);
    };


    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();

    const loadNewsByID = async (item: any) => {
        let newsID = item?.id;
        let news = await getNewsById(newsID);
        setNewsContent(news.response);

        let content = news.response.results[0].blocks.body[0]?.bodyTextSummary || '';

        if (content.length > 2000) {
            content = content.substring(0, 2000);
        }

        setContentText(content);
        setspeakContent(content);
    };

    const paraphaceText = async () => {
        setStatus(true);
        setTextLoading(true);
        let text = await generateData(contentText);
        setTextLoading(false);
        setContentText("");
        charIndex.current = 0;
        setDisplayedText("");
        setspeakContent(text);
        setContentText(text);
    };

    return (
        <SafeAreaView style={[ScreenStyles.container, { backgroundColor: colors.GRAY_900 }]}>
            <ScrollView contentContainerStyle={[ScreenStyles.subContainer]}>
                <Image style={{
                    width: "100%",
                    height: 200,
                    resizeMode: "contain",
                    borderRadius: 10,
                    marginBottom: 10,
                    marginVertical: 10
                }} source={{
                    uri: newsContent?.results[0].elements[0].assets[0].file || "https://via.placeholder.com/150"
                }} />

                <Text style={{
                    color: colors.WHITE,
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 10
                }}>
                    {newsContent?.results[0]?.webTitle}
                </Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10
                }}>
                    <Text style={{ color: colors.WHITE }}>
                        {formatDate(newsContent?.results[0]?.webPublicationDate || "2024-06-30T15:46:00Z")}
                    </Text>
                    <Text style={{
                        color: colors.BLUE_600,
                        fontSize: 15,
                        fontWeight: "bold",
                        marginBottom: 10
                    }}>
                        #{newsContent?.results[0]?.sectionName}
                    </Text>
                </View>

                <View style={[{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10
                }]}>
                    {
                        isSpeacking ? (
                            <TouchableOpacity
                                onPress={stopSpeak} style={{
                                    paddingHorizontal: 15,
                                    borderRadius: 16,
                                    marginBottom: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderColor: colors.BLUE_600,
                                    borderWidth: 1,
                                    paddingVertical: 10
                                }}>
                                <MicrophoneSlash color={colors.WHITE} />
                                <Text style={{
                                    color: colors.WHITE,
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    marginLeft: 10
                                }}>
                                    Stop
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={speakText} style={{
                                    paddingHorizontal: 15,
                                    borderRadius: 16,
                                    marginBottom: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderColor: colors.BLUE_600,
                                    borderWidth: 1,
                                    paddingVertical: 10
                                }}>
                                <Microphone color={colors.WHITE} />
                                <Text style={{
                                    color: colors.WHITE,
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    marginLeft: 10
                                }}>
                                    Speak
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                    <TouchableOpacity
                        disabled={status}
                        onPress={paraphaceText} style={{
                            paddingHorizontal: 15,
                            borderRadius: 16,
                            marginBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            borderColor: "#9b72cb",
                            borderWidth: 1,
                            paddingVertical: 10
                        }}>
                        <Animated.Image
                            style={{
                                transform: [{ rotate: spin }],
                                width: 20,
                                height: 20,
                                alignSelf: "center"
                            }}
                            source={require("../../assets/Images/geminiIcon.png")}
                        />
                        <Animated.Text style={{
                            color: colors.WHITE,
                            fontSize: 15,
                            fontWeight: "bold",
                            marginLeft: 10
                        }}>
                            {status ? "Generated" : " Generate AI"}
                        </Animated.Text>
                    </TouchableOpacity>
                </View>
                {
                    textLoading ? (
                        <ActivityIndicator size="large" color={colors.BLUE_600} />
                    ) : (
                        <Text style={{
                            color: colors.WHITE,
                            fontSize: 15,
                            marginBottom: 10,
                            lineHeight: 25,
                            textAlign: "justify"
                        }}>
                            {displayedText || contentText}
                        </Text>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default NewsContentScreen;