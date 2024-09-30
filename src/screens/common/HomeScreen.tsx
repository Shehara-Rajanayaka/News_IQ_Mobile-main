import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet, Pressable } from 'react-native';
import { ScreenStyles, TextStyles } from "../../assets/styles/AppStyles";
import { colors } from "../../assets/styles/colors";
import { ArchiveAdd, ArrowCircleRight, Notification, SearchNormal, SearchNormal1 } from "iconsax-react-native";
import { useFocusEffect } from '@react-navigation/native';
import { APIEndpoint } from '../../helpers/APIEndpoints';
import { getNewsById, getNewsForCategory, getRecentNews } from '../../services/newsService';
import ContentLoader, { Instagram, Code } from 'react-content-loader/native'
import { Skeleton } from 'react-native-skeletons';


type news = {
    id: string,
    title: string,
    image: string,
    content?: string,
    video?: string,
}


const categories = ['Politics', 'Sports', 'Technology', 'Health', 'Business'];

const HomeScreen = ({ navigation }: any) => {

    const [news, setNews] = React.useState<news[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [categoryNews, setCategoryNews] = React.useState<news[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                await loadNewsFromAPI();
                await loadNewsForCategory("Headlines");
                setLoading(false);
            };

            loadData();
            return () => { };
        }, [])
    );

    const loadNewsFromAPI = async () => {
        try {
            const articles = await getRecentNews();
            articles?.slice(0, 4).forEach((item: any) => {
                const imageElement = item.elements.find((element: { type: string; }) => element.type === 'image');
                const imageUrl = imageElement ? imageElement.assets[0].file : null;

                setNews((prev) => [...prev, {
                    id: item.id,
                    title: item.webTitle,
                    image: imageUrl,
                    content: item.content
                }]);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const loadNewsForCategory = async (category: any) => {
        setSelectedCategory(category)
        try {
            const articles = await getNewsForCategory(category);
            setCategoryNews([]);
            articles?.slice(0, 4).forEach((item: any) => {
                const imageElement = item.elements.find((element: { type: string; }) => element.type === 'image');
                const imageUrl = imageElement ? imageElement.assets[0].file : null;

                setCategoryNews((prev) => [...prev, {
                    id: item.id,
                    title: item.webTitle,
                    image: imageUrl,
                    content: item.content
                }]);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const loadNewsByID = (item: any) => {

        navigation.navigate("NewsContent", {
            data: item
        })
    }

    return (
        <SafeAreaView style={[ScreenStyles.container, { backgroundColor: colors.GRAY_900 }]}>
            <ScrollView contentContainerStyle={[ScreenStyles.subContainer,]}>
                <View style={[styles.headingContainer]}>
                    <Image source={require("../../assets/Images/Bird.png")} style={{ width: 35, height: 35 }} />
                    <View style={[styles.searchBarContainer]}>
                        <SearchNormal1 style={[{
                            start: 0,
                            position: "absolute",
                            left: 10,
                        }]} color={colors.GRAY_500} size={20} />
                        <TextInput
                            style={[styles.searchBar]}
                            placeholder={"Search"}
                            placeholderTextColor={colors.GRAY_800}
                        />
                    </View>
                    <TouchableOpacity>
                        <Notification color={colors.WHITE} size={30} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.newsHeadingContainer]}>
                    <Text style={[TextStyles.MAIN_3]}>Latest News</Text>
                    <TouchableOpacity>
                        <ArrowCircleRight
                            size="32"
                            color={colors.WHITE}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={[{
                    gap: 20,
                }]}>

                    {
                        loading ? (
                            <View style={[{
                                flexDirection: "column",
                                gap: 20,
                                alignItems: "center",
                            }]}>
                                <Skeleton style={[{
                                    width: Dimensions.get("window").width * 0.9,
                                    height: Dimensions.get("screen").height * 0.2,
                                    borderRadius: 12,
                                    marginBottom: 10,
                                    backgroundColor: colors.GRAY_600
                                }]} />
                                <View style={[{
                                    flexDirection: "row",
                                    gap: 5,
                                }]}>
                                    <Skeleton style={[{
                                        width: Dimensions.get("window").width * 0.2,
                                        borderRadius: 12,
                                        marginBottom: 10,
                                        backgroundColor: colors.GRAY_600
                                    }]} />
                                    <Skeleton style={[{
                                        width: Dimensions.get("window").width * 0.7,
                                        borderRadius: 12,
                                        marginBottom: 10,
                                        backgroundColor: colors.GRAY_600
                                    }]} />
                                </View>
                                <Skeleton style={[{
                                    width: Dimensions.get("window").width * 0.9,
                                    borderRadius: 12,
                                    marginBottom: 10,
                                    backgroundColor: colors.GRAY_600
                                }]} />
                            </View>
                        ) : (
                            news?.slice(0, 4).map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        loadNewsByID(item);
                                    }}>
                                    <View style={[{
                                        width: Dimensions.get("screen").width * 0.7,
                                    }]}>
                                        <Image
                                            source={{ uri: item.image }} style={{ width: "100%", height: 150 }} />
                                        <Text numberOfLines={2} style={[TextStyles.H6, {
                                            marginTop: 10,
                                            textAlign: "left",
                                            color: colors.WHITE,
                                            lineHeight: 22,

                                        }]}>{item.title}</Text>
                                    </View>
                                    <View style={[{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: 10,
                                        alignItems: "center"

                                    }]}>
                                        <Text style={[{
                                            color: colors.BLUE_500,
                                            fontSize: 12,
                                            textDecorationLine: "underline"
                                        }]}>Read More</Text>
                                        <TouchableOpacity>
                                            <ArchiveAdd
                                                size="25"
                                                color={colors.WHITE}
                                                variant="TwoTone"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )
                    }

                </ScrollView>
                <View style={[styles.newsHeadingContainer, {
                    marginTop: 20
                }]}>
                    <Text style={[TextStyles.MAIN_3]}>Explore Categories</Text>
                    <TouchableOpacity>
                        <ArrowCircleRight
                            size="32"
                            color={colors.WHITE}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={[{
                    gap: 6,
                }]}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.selectedCategoryButton,
                            ]}
                            onPress={() => loadNewsForCategory(category)}>
                            <Text
                                style={[
                                    TextStyles.P,
                                    { color: selectedCategory === category ? colors.BLUE_500 : colors.WHITE },
                                ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={[{
                    marginTop: 20,
                    marginBottom: 20
                }]}>

                    {
                        loading ? (
                            <>
                                <Skeleton style={[{
                                    width: "100%",
                                    height: Dimensions.get("screen").height * 0.2,
                                    borderRadius: 12,
                                    marginBottom: 10,
                                    backgroundColor: colors.GRAY_600
                                }]} />
                                <Skeleton style={[{
                                    width: "100%",
                                    borderRadius: 12,
                                    marginBottom: 10,
                                    backgroundColor: colors.GRAY_600
                                }]} />
                            </>
                        ) : (
                            categoryNews?.slice(0, 4).map((item, index) => (
                                <TouchableOpacity
                                    style={[{
                                        marginTop: 20,
                                    }]}
                                    key={index}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        loadNewsByID(item);
                                    }}>
                                    <View>
                                        <Image source={{ uri: item.image }} style={{ width: "100%", height: Dimensions.get("screen").height * 0.2, borderRadius: 12 }} />
                                        <Text numberOfLines={2} style={[TextStyles.H6, {
                                            marginTop: 10,
                                            textAlign: "justify",
                                            color: colors.WHITE,
                                            lineHeight: 22,
                                        }]}>{item.title}</Text>
                                    </View>
                                    <View style={[{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: 10,
                                        alignItems: "center"

                                    }]}>
                                        <Text style={[{
                                            color: colors.BLUE_500,
                                            fontSize: 12,
                                            textDecorationLine: "underline"
                                        }]}>Read More</Text>
                                        <TouchableOpacity>
                                            <ArchiveAdd
                                                size="25"
                                                color={colors.WHITE}
                                                variant="TwoTone"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )
                    }

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        width: Dimensions.get("screen").width * 0.5,
        height: 48,
    },
    searchBar: {
        borderColor: colors.GRAY_700,
        borderWidth: 1,
        padding: 10,
        borderRadius: 32,
        flexGrow: 1,
        color: colors.WHITE,
        paddingLeft: 40
    },
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 18,
        alignItems: "center",
        marginBottom: 20
    },
    newsHeadingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    categoryButton: {
        borderColor: colors.BLUE_500,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
    },
    selectedCategoryButton: {
        backgroundColor: "rgba(0, 125, 178, 0.15)",
    },
});
export default HomeScreen;
