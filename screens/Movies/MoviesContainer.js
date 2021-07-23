import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { movieApi } from "../../api";
import MoviesPresenter from "./MoviesPresenter";

export default () => {
  //api.js에있는 movies함수를 불러와서 request하여 사용.
  // const [nowPlaying, setNowPlaying] = useState({
   
  //   movies: [],
  //    //nowplaying이 movies를 default하는 array를 가진다.
  //   error: null
  // });
  const [refreshing, setRefresing] = useState(false);
  const [movies, setMovies] = useState({
      //array로 정의해준다.
      loading: true,
      nowPlaying: [],
      popular: [],
      upcoming: [],
      nowPlayingError: null,
      popularError: null,
      upcomingError: null
    });
  //render를 여러번 하지않게 하려면 큰 규모의 useState를 만든다.
  const getData = async () => {
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
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    //hooks랑 비슷하게 생겼지만 아니다.
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();
    setMovies({
      //elements들을 다 넣어주어 하나의 state로 전부 render해준다.
      loading: false,
      nowPlaying,
      popular,
      upcoming,
      nowPlayingError,
      popularError,
      upcomingError
    });
  };
  useEffect(() => {
      //getdata를 call하는데
    //component가 mount됐을때만 사용된다.
    getData();
  }, []);

  return <MoviesPresenter refreshFn={getData} {...movies} />;
    // <View style={{ flex: 1, backgroundColor: "black" }}>
    //   <Text style={{ color: "white" }}>{movies.nowPlaying?.length}</Text>
    //    {/* <Button title="Movie" onPress={() => navigation.navigate("Detail")} /> */}
    // </View>
};