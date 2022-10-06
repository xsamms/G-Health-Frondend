import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Input, Icon, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useGetProductsQuery } from "../api/redux/services/productApi";
import ProductDetails from "./ProductDetails";
import { addToCart } from "../api/redux/slice/cartSlice";
import { useToast } from "react-native-toast-notifications";

const topBg = require("../assets/bg-color.png");
const ppBg = require("../assets/bg-lady.png");

function Home({ navigation }) {
  const [image, setImage] = useState(null);
  const { data, error, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();
  const toast = useToast();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigation.navigate("Cart");
    toast.show("Item added to Cart", {
      type: "success",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topHome}>
        <ImageBackground
          source={topBg}
          resizeMode="stretch"
          style={styles.imageBG}
        >
          <View style={styles.topImage}>
            <ImageBackground
              source={ppBg}
              resizeMode="contain"
              style={styles.bgLady}
            >
              <Input
                w={{
                  base: "90%",
                  md: "25%",
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="search" />}
                    size={7}
                    ml="3"
                    color="#fff"
                  />
                }
                ml="5"
                bgColor="#4d4d4d"
                variant="rounded"
                fontSize="md"
                color="#fff"
                placeholder="Search"
              />
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.mainHome}>
        <TouchableOpacity style={styles.uplaodBtn} onPress={pickImage}>
          <View style={styles.uploadGrp}>
            <FontAwesome name="camera" size={24} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}>
              Upload your prescription
            </Text>
          </View>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.categoryCtn}>
          <View style={styles.categoryTlt}>
            <Text style={{ fontSize: 16, fontWeight: "800" }}>
              Shop by Category
            </Text>
            <Text>View all</Text>
          </View>
          <View>
            <ScrollView horizontal={true}>
              {isLoading ? (
                <Text>Loading... </Text>
              ) : error ? (
                <Text>Something wen't wrong </Text>
              ) : (
                data.map((item) => {
                  return (
                    <TouchableOpacity key={item._id} style={styles.category}>
                      <Text style={{ color: "#fff" }}>
                        {item.category.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>
        <View style={styles.products}>
          <View style={styles.categoryTlt}>
            <Text style={{ fontSize: 16, fontWeight: "800" }}>
              Trending Products
            </Text>
            <Text>View all</Text>
          </View>
          <ScrollView contentContainerStyle={styles.productsScrll}>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : (
              data.map((item) => {
                return (
                  <TouchableOpacity
                    key={item._id}
                    style={styles.productCtn}
                    onPress={() =>
                      navigation.navigate("Product Details", { item })
                    }
                  >
                    <Image
                      style={styles.productsImg}
                      source={{ uri: item.productImage }}
                    />
                    <View style={{ marginBottom: 5 }}>
                      <Text style={{ fontWeight: "700" }}>{item.name}</Text>
                    </View>
                    <View style={styles.productBuy}>
                      <Text style={{ fontSize: 16 }}>
                        ₦
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Text>
                      <Button
                        bgColor="#f20c57"
                        onPress={() => handleAddToCart(item)}
                      >
                        Buy
                      </Button>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  imageBG: {
    height: 200,
  },
  bgLady: {
    height: 195,
  },
  topHome: {
    backgroundColor: "#eae9e9",
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#eae9e9",
    borderRadius: 20,
    width: "80%",
    alignSelf: "center",
  },
  mainHome: {
    backgroundColor: "#eae9e9",
    flex: 2,
  },
  uplaodBtn: {
    backgroundColor: "#ff9f32",
    marginHorizontal: 40,
    borderRadius: 10,
    elevation: 20,
    padding: 10,
    marginTop: 20,
  },
  uploadGrp: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
  categoryCtn: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  categoryTlt: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  category: {
    backgroundColor: "#f20c57",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  products: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  productsScrll: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
    marginEnd: 5,
    marginStart: 5,
    marginVertical: 10,
    padding: 10,
    width: "47%",
  },
  productsImg: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  productBuy: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Home;
