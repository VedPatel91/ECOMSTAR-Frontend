import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, View, StyleSheet, SafeAreaView, Pressable, TextInput, Text, ScrollView, Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Carousel from 'react-native-reanimated-carousel';
import Loader from '@/components/Loader';
import axios from 'axios';
import ProductItem from '@/components/ProductItem';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from 'expo-router';
import Modal from "react-native-modal";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { UserContext } from '@/context/userContext';
import { getAddresses } from '@/api/userAPI';

const { width } = Dimensions.get('window');

const HomeScreen = () => {

  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];

  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];

  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];

  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("jewelery")
  const [product, setProduct] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" },
  ]);
  const navigation = useNavigation<any>();
  const { user } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState<any>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        debugger
        const products = await axios.get("https://fakestoreapi.com/products");
        setProduct(products.data)
      } catch (error) {
        console.log("error message:", error)
      }
    }

    fetchProducts();
  }, [])

  useEffect(() => {
    if (user.id) {
      fetchAddresses();
    }
  }, [user, isModalVisible]);

  const fetchAddresses = async () => {
    try {
      const data = await getAddresses(user.id)
      if (data && data.success) setAddresses(data.data)
    } catch (error) {
      console.log("error", error);
    }
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fff' }}
      >
        {isLoading && <Loader />}
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
          <Pressable onPress={toggleModal} style={{ flexDirection: "row", alignItems: 'center', gap: 5, padding: 10, backgroundColor: 'orange' }}>
            <SimpleLineIcons name="location-pin" size={24} color="black" />
            <Pressable>
              <Text>Delivert To {selectedAddress?.name || 'Ved'} - {selectedAddress?.city || 'Ahmedabad'} {selectedAddress?.postalCode || '7777777'}</Text>
            </Pressable>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              list.map((item, index) => (
                <Pressable key={index} style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
                  <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={{ uri: item.image }} />
                  <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{item?.name}</Text>
                </Pressable>
              ))
            }
          </ScrollView>
          {/* carousel container */}
          <View>
            <Carousel
              loop
              width={width}
              height={200}
              autoPlay={true}
              data={images}
              scrollAnimationDuration={2000}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
              )}
            />
          </View>

          {/* Trending deals container */}
          <View>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Trending Deals of the week</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {deals.map((item, index) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate("Info", { ...item })
                  }}
                  key={index}
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 180, height: 180, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />
                </Pressable>
              ))}
            </View>
            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 2,
                marginTop: 15,
              }}
            />

            <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
              Today's Deals
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {offers.map((item, index) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate("Info", { ...item })
                  }}
                  key={index}
                  style={{
                    marginVertical: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />

                  <View
                    style={{
                      backgroundColor: "#E31837",
                      paddingVertical: 5,
                      width: 130,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      Upto {item?.offer}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>

            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 2,
                marginTop: 15,
              }}
            />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "50%",
            }}
          >
            <RNPickerSelect
              style={{
                inputIOS: {
                  borderWidth: 1,
                  borderColor: '#B7B7B7',
                  borderRadius: 5,
                  paddingRight: 30,
                  paddingLeft: 10,
                  color: 'black',
                },
                inputAndroid: {
                  borderWidth: 1,
                  borderColor: '#B7B7B7',
                  borderRadius: 5,
                  paddingRight: 30,
                  paddingLeft: 10,
                  color: 'black',
                },
                iconContainer: {
                  top: 12,
                  right: 10,
                },
              }}
              value={category}
              placeholder={{}}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => setCategory(value)}
              items={items}
              Icon={() => {
                return <Ionicons name="chevron-down" size={20} color="#888" />;
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {product?.filter((item: any) => item.category === category).map((item, index) => (
              <ProductItem key={index} product={item} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.centeredView}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          onSwipeComplete={toggleModal}
          swipeDirection="down"
          backdropTransitionOutTiming={1}
          style={styles.bottomModal}
        >
          <View style={styles.modalView}>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Choose your Location
              </Text>

              <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
                Select a delivery location to see product availabilty and delivery
                options
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* already added addresses */}
              {addresses?.map((item:any, index) => (
                <Pressable
                  onPress={() => setSelectedAdress(item)}
                  key={index}
                  style={{
                    width: 140,
                    height: 140,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    marginRight: 15,
                    marginTop: 10,
                    backgroundColor: selectedAddress._id === item._id ? "#FBCEB1" : "white"
                  }}
                >
                  <View
                    style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    {item?.houseNo},{item?.landmark}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    {item?.street}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    {item?.country}, {item?.city}
                  </Text>
                </Pressable>
              ))}

              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Address");
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  marginTop: 10,
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#0066b2",
                    fontWeight: "500",
                  }}
                >
                  Add an Address or pick-up point
                </Text>
              </Pressable>
            </ScrollView>
            <View style={{ flexDirection: "column", gap: 7, marginBottom: 30, marginTop: 20 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Entypo name="location-pin" size={22} color="#0066b2" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Enter an Indian pincode
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Ionicons name="locate-sharp" size={22} color="#0066b2" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Use My Currect location
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <AntDesign name="earth" size={22} color="#0066b2" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Deliver outside India
                </Text>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 200
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

});