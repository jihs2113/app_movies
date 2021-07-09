import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import { movieApi } from "../api";

export default () => {
  const [movies, setMovies] = useState({
    results: [],
    error: null
  });
  const getData = async () => {
    const [results, error] = await movieApi.discover();
    setMovies({
      results,
      error
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <Text>{movies.results.length}</Text>
    </View>
  );
};