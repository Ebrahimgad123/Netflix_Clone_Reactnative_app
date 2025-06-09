import { Movie } from '@/interfaces/interfaces';
import { addMovie, removeMovie } from '@/store/savedMoviesSlice';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  trendingMovies: Movie[];
};

const HorizontalFlatList = ({ trendingMovies }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const savedMovies = useSelector((state: any) => state.savedMovies.movies);

  const toggleSave = (item: Movie) => {
    const isSaved = savedMovies.some((m: Movie) => m.id === item.id);
    if (isSaved) {
      dispatch(removeMovie(item.id));
    } else {
      dispatch(addMovie(item));
    }
  };

  return (
    <FlatList
      data={trendingMovies}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      renderItem={({ item ,index}) => {
        const isSaved = savedMovies.some((m: Movie) => m.id === item.id);
        return (
          <TouchableOpacity onPress={() => router.push(`/movies/${item.id}`)}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={{ width: 140, height: 210, borderRadius: 12 }}
              resizeMode="cover"
            />
            <Text style={Styles.indexStyle}>{index+1}</Text>
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              onPress={() => toggleSave(item)}
              size={24}
              color={isSaved ? "red" : "#fff"}
              style={{ position: "absolute", top: 8, right: 8 }}
            />
            
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                marginTop: 8,
                width: 140,
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const Styles =StyleSheet.create({
  indexStyle: {
    position: "absolute",
    top: 100,
    left: 8,
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
     
  },
})

export default HorizontalFlatList;
