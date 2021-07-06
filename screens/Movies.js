import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { movieApi } from "../Api";

export default () => {
  //api.js에있는 movies함수를 불러와서 request하여 사용.
  // const [nowPlaying, setNowPlaying] = useState({
   
  //   movies: [],
  //    //nowplaying이 movies를 default하는 array를 가진다.
  //   error: null
  // });
  const getData = async () =>{
    // const respose = await fetch()
    // const json = await Response.json()
    //위에 부분들을 axios가 대신 다해준다.
    // try{
    //   const { data : {results} } = await movieApi.nowPlaying();
    //   setNowPlaying({
    //     movies: results,
    //     error: null
    //   });
    // } catch (e){
    //   setNowPlaying({
    //     error: e
    //   });
    // }
    //위에 부분들을 api.js에 함수를 만들어 사용한다.
    const [nowPlaying, error] = await movieApi,nowPlaying();
    
  };
  useEffect(() => {
    //getdata를 call하는데
    //component가 mount됐을때만 사용된다.
    getData()
  }, [])
  return(
    <View style={{flex:1 , backgroundColor: "black"}}>
    <Text>Movies</Text>
    {/* <Button title="Movie" onPress={() => navigation.navigate("Detail")} /> */}
  </View>
  )
}