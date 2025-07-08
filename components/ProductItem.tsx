import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/CartSlice";

const ProductItem = (props: { product: any }) => {
  const { product } = props;
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <Pressable style={{ marginHorizontal: 15, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: product?.image }}
      />

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {product?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{product?.price}</Text>
        <Text style={{ color: "orange", fontWeight: "bold" }}>
          {product?.rating?.rate} ratings
        </Text>
      </View>

      <Pressable
        onPress={() => {
          if (!addedToCart) {
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
          marginTop: 10,
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
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});