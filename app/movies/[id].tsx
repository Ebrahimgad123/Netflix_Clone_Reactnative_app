import { MovieDetails } from "@/interfaces/interfaces";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const fetchMovie = useCallback(() => fetchMovieDetails(id), [id]);

  const {
    data: movie,
    loading,
    error,
    refetch,
  } = useFetch<MovieDetails>(fetchMovie, !!id);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ab8bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error : {error.message}</Text>
        <TouchableOpacity onPress={refetch} >
          <Text >Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}> Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

    {movie.poster_path?.trim() ? (
    <Image
      source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
      style={styles.poster}
      resizeMode="cover"
    />
    
  ) : null}

      <Text style={styles.title}>{movie.title}</Text>
      {movie.tagline ? <Text style={styles.subtitle}>{movie.tagline}</Text> : null}

      <View style={styles.card}>
        <Text style={styles.label}>Overview</Text>
        <Text style={styles.text}>{movie.overview || "Not available"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Release Date</Text>
        <Text style={styles.text}>{movie.release_date}</Text>

        <Text style={styles.label}>Duration</Text>
        <Text style={styles.text}>{movie.runtime} minutes</Text>

        <Text style={styles.label}>Original Language</Text>
        <Text style={styles.text}>{movie.original_language.toUpperCase()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Genres</Text>
        <Text style={styles.text}>
          {movie.genres.map((g) => g.name).join(", ")}
        </Text>

        <Text style={styles.label}>Production Countries</Text>
        <Text style={styles.text}>
          {movie.production_countries.map((c) => c.name).join(", ")}
        </Text>

        <Text style={styles.label}>Production Companies</Text>
        <Text style={styles.text}>
          {movie.production_companies.map((c) => c.name).join(", ")}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Rating</Text>
        <Text style={styles.text}>
          {movie.vote_average} ({movie.vote_count} votes)
        </Text>

        <Text style={styles.label}>Popularity</Text>
        <Text style={styles.text}>{movie.popularity}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Budget</Text>
        <Text style={styles.text}>${movie.budget.toLocaleString()}</Text>

        <Text style={styles.label}>Revenue</Text>
        <Text style={styles.text}>${movie.revenue.toLocaleString()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Spoken Languages</Text>
        <Text style={styles.text}>
          {movie.spoken_languages.map((l) => l.english_name).join(", ")}
        </Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.text}>{movie.status}</Text>
      </View>

      {movie.homepage && (
        <View style={styles.card}>
          <Text style={styles.label}>Official Site</Text>
          <Text style={[styles.text, { color: "#ab8bff" }]}>
            {movie.homepage}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#0d0d0d",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d0d0d",
  },
  poster: {
    width: "100%",
    height: 450,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
  },
  label: {
    color: "#ab8bff",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
  },
  text: {
    color: "#e0e0e0",
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default MovieDetailsScreen;
