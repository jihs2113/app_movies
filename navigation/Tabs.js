import React, { useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";

const Tabs = createBottomTabNavigator();

const getHeaderName = route =>
 route?.state?.routeNames[route.state.index] || "Movies";

export default ({navigation, route}) => {
  
  useLayoutEffect(() => {
//useEffect대신 쓰고, 레이아웃 변경이 다 끝난뒤에 작동한다.
    navigation.setOptions({
      title: getHeaderName(route)
       //title index값이 undefined라면 or movies로 movies를 칭해준다.
    });
  }, [route]);

  return(
  <Tabs.Navigator>
    <Tabs.Screen name="Movies" component={Movies} />
    <Tabs.Screen name="Tv" component={Tv} />
    <Tabs.Screen name="Search" component={Search} />
    <Tabs.Screen name="Favorite" component={Favs} />
  </Tabs.Navigator>
  )
}