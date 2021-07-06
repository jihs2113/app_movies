import React, { useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import { Platform } from "react-native";

const Tabs = createBottomTabNavigator();

const getHeaderName = route =>
 route?.state?.routeNames[route.state.index] || "Movies";

export default ({navigation, route}) => {
//   useLayoutEffect(() => {
// //useEffect대신 쓰고, 레이아웃 변경이 다 끝난뒤에 작동한다.
//     const name = getHeaderName(route);
//     navigation.setOptions({
//       //setOptions가 주는부분이 제일 generic(강력히) 적용된다.
//       title: name,
//        //title index값이 undefined라면 or movies로 movies를 칭해준다.
//       headerStyle: {
//         //이름 말고도 스타일도 바꿀수있다.
//         backgroundColor: name === "Tv" ? "blue" : "white"
//       } 
//     });
//   }, [route]);
    useLayoutEffect(() => {
    //useEffect대신 쓰고, 레이아웃 변경이 다 끝난뒤에 작동한다.
      
      navigation.setOptions({
        //setOptions가 주는부분이 제일 generic(강력히) 적용된다.
        title: getHeaderName(route)
      });
    }, [route]);

  return(
  <Tabs.Navigator 
    screenOptions={({ route }) => ({
      //즉시 object를 return하는 방법
      tabBarIcon: ({ focused }) => {
        //이 함수는 Reac,Node를 return해준다.
        //focused는 true 이거나 false이다.
        let iconName = Platform.OS === "ios" ? "ios-" : "md-";
        if(route.name === "Movies"){
          iconName += "film";
        }else if(route.name === "Tv"){
          iconName += "tv";
        }else if(route.name === "Search"){
          iconName += "search";
        }else if(route.name === "Favorite"){
          iconName += "heart";
        }
        return(
        <Ionicons 
          name={iconName}
          color={focused ? "white" : "grey"} 
          size={26} 
          />
        )
      }
    })}
    tabBarOptions={{
    //탭 바들을 각각 스타일 줄수있다.
    showLabel: false,
      style:{
        backgroundColor: "black",
        borderTopColor: "black"
      }
    }}
  >
    <Tabs.Screen name="Movies" component={Movies} />
    <Tabs.Screen name="Tv" component={Tv} />
    <Tabs.Screen name="Search" component={Search} />
    <Tabs.Screen name="Favorite" component={Favs} />
  </Tabs.Navigator>
  )
}