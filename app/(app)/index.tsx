import FlatListComponent from "@/compoonent/FlatListComponent";
import HorizontalFlatList from "@/compoonent/HorizontalFlatList";
import SearchBoxComponent from "@/compoonent/SearchBoxComponent";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Movie } from "@/interfaces/interfaces";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { addMovie, removeMovie } from "@/store/savedMoviesSlice";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const savedMovies = useSelector((state: any) => state.savedMovies.movies);

  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
    refetch: movieRefetch,
  } = useFetch(() => fetchMovies({ query: "" }), false);

  useEffect(() => {
    movieRefetch();
  }, []);

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
    refetch: trendingRefetch,
  } = useFetch(() => fetchMovies({ query: "avengers" }), false);

  useEffect(() => {
    trendingRefetch();
  }, []);

  const toggleSave = (movie: Movie) => {
    const isSaved = savedMovies.some((m: Movie) => m.id === movie.id);
    if (isSaved) {
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(addMovie(movie));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={images.bg}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={icons.logo} style={styles.logo} />

        {movieLoading ? (
          <ActivityIndicator size="large" color="#ab8bff" style={styles.loader} />
        ) : movieError ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>خطأ: {movieError.message}</Text>
          </View>
        ) : (
          <>
            <SearchBoxComponent
              onPress={() => router.push("/search")}
              placeholder="Search for Movie.."
            />
            <Text style={styles.sectionTitle}>Trending Movies</Text>

            <HorizontalFlatList trendingMovies={trendingMovies} />

            <Text style={styles.sectionTitle}>Latest movies</Text>
            <FlatListComponent movie={movies} />
              
          </>
        )}
       
      </ScrollView>
    </View>
  );
};

export default Index;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 40,
  },
  logo: {
    width: 48,
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  loader: {
    marginTop: 50,
    alignSelf: "center",
  },
  center: {
    marginTop: 40,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  textStyle:{
    color:"white"
  }
});
