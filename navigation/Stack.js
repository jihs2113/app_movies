import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../screens/Detail";
import Tabs from "./Tabs";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator 
    screenOptions ={{
    //navigator에서 모든 screen에 대한 style정의 가능
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black",
        shadowColor: "black"
      },
      headerTintColor: "white",
      headerBackTitleVisible: false
    }}
  >
    <Stack.Screen name="Tab" component={Tabs} />
    <Stack.Screen name="Detail" component={Detail} />
  </Stack.Navigator>
);