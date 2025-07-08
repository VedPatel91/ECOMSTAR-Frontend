import { Dimensions, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/slices/CartSlice';
import { RootState } from '@/store';

type Product = {
    id: string;
    title: string;
    offer: string;
    oldPrice: number;
    price: number;
    image: string;
    carouselImages: string[];
    color: string;
    size: string;
};
type ProductRouteParamList = {
    ProductInfo: Product;
};

const ProductInfoScreen = () => {

    const route = useRoute<RouteProp<ProductRouteParamList, "ProductInfo">>();
    const product = route.params;
    const { width } = Dimensions.get("window");
    const height = (width * 100) / 100;
    const [addedToCart, setAddedToCart] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector((state:RootState) => state.cart.cart)
    console.log(cart,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: 'black', padding: 10 }}>
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            gap: 10,
                            borderRadius: 3,
                            height: 38,
                            marginHorizontal: 7
                        }}
                    >
                        <Ionicons style={{ paddingLeft: 10 }} name="search" size={22} color="black" />
                        <TextInput style={{ flex: 1 }} placeholder='Please Search here for Items' />
                    </Pressable>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {product?.carouselImages.map((item, index) => (
                        <ImageBackground
                            style={{ width, height, marginTop: 0 }}
                            source={{ uri: item }}
                            key={index}
                            resizeMode="contain"
                        >
                            <View
                                style={{
                                    padding: 20,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: "#C60C30",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "white",
                                            textAlign: "center",
                                            fontWeight: "600",
                                            fontSize: 12,
                                        }}
                                    >
                                        20% off
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: "#E0E0E0",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "row",
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="share-variant"
                                        size={24}
                                        color="black"
                                    />
                                </View>
                            </View>

                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: "#E0E0E0",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    marginTop: "auto",
                                    marginLeft: 20,
                                    marginBottom: 20,
                                }}
                            >
                                <AntDesign name="hearto" size={24} color="black" />
                            </View>
                        </ImageBackground>
                    ))}
                </ScrollView>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        {product?.title}
                    </Text>

                    <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
                        ₹{product?.price}
                    </Text>
                </View>

                <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

                <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                    <Text>Color: </Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        {product?.color}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                    <Text>Size: </Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        {product?.size}
                    </Text>
                </View>

                <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
                        Total : ₹{route.params.price}
                    </Text>
                    <Text style={{ color: "#00CED1" }}>
                        FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: 5,
                            alignItems: "center",
                            gap: 5,
                        }}
                    >
                        <Ionicons name="location" size={24} color="black" />

                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                            Deliver To Sujan - Bangalore 560019
                        </Text>
                    </View>
                </View>

                <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
                    IN Stock
                </Text>

                <Pressable
                    onPress={() => {
                        if(!addedToCart){
                            dispatch(addToCart(product));
                            setAddedToCart(true);
                        }
                    }} 
                    style={{
                        backgroundColor: "orange",
                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 10,
                        marginVertical: 10,
                    }}
                >
                    {addedToCart ? (
                        <View>
                            <Text>Added to Cart</Text>
                        </View>
                    ) : (
                        <Text>Add to Cart</Text>
                    )}
                </Pressable>

                <Pressable
                    style={{
                        backgroundColor: "orange",
                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 10,
                        marginVertical: 10,
                    }}
                >
                    <Text>Buy Now</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductInfoScreen

const styles = StyleSheet.create({})