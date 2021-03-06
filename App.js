import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Stack from "./navigation/Stack";
const cacheImages = images =>
  images.map(image => {
     //이떄 image는 url이 된다.
      //images는 이미지들의 array고
  //url을 보내거나 module을 보낼수있다
    if (typeof image === "string") {
      return Image.prefetch(image);
        //prefetch는 promise를 준다.
    //native의 prefetch함수 이미지를 미리 가져오는것
    } else {
      return Asset.fromModule(image).downloadAsync();
       //asset.fromModule은 promise를 준다.
    }
     //return asset 하고 module에서 이미지를 downloadAsync한다.
  });
const cacheFonts = fonts =>
  fonts.map(font => [Font.loadAsync(font), Font.loadAsync(font)]);
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = () => {
     //url을 통하거나 require해서 이미지들을 cache하여 미리 로드하는 함수
    const images = cacheImages([
      "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=673&q=80",
      require("./assets/splash.png")
       //require부분이 module이다.
    ]);
    const fonts = cacheFonts([Ionicons.font, FontAwesome.font]);
    //Ionicons의 폰트를 미리 로드한다.
    return Promise.all([...images, ...fonts]);
    //loadAssets은 promise를 return 해줘야한다.
    //Promise.all이 promise array를 가진다
  };
  const onFinish = () => setIsReady(true);
  return isReady ? (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    />
  );
}