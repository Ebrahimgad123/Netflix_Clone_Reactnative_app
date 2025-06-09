import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

 const fetchMoviesFun = useCallback(() => {
  if (!query.trim()) return Promise.resolve({ results: [] });
  return fetchMovies({ query });
}, [query]);

const {
  data,
  loading,
  error,
  refetch,
} = useFetch(fetchMoviesFun, false);

  const handleSearch = () => {
    if (query.trim()) {
      refetch();
    }
  };

 const movies = data ?? [];


  return (
    <View style={styles.container}>
      <View >
        <TextInput
        placeholder="Search for a movie..."
        placeholderTextColor="black"
        value={query}
        onChangeText={setQuery}
        onChange={handleSearch}
        style={styles.input}
     
      />
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#ab8bff" style={styles.center} />
      )}

      {error &&  (
        <View style={styles.center}>
          <Text style={styles.errorText}>حدث خطأ أثناء البحث: {error.message}</Text>
          <TouchableOpacity onPress={refetch} style={styles.retryButton}>
            <Text style={styles.retryText}>إعادة المحاولة</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && movies.length === 0 && query.trim() !== "" && (
        <View style={styles.center}>
          <Text style={styles.noResultsText}>لا توجد نتائج</Text>
        </View>
      )}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/movies/${item.id}`)}
          >
            {item.poster_path ? (
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                style={styles.poster}
              />
            ) : (
              <View style={[styles.poster, styles.noImage]}>
                <Text style={styles.noImageText}>بدون صورة</Text>
              </View>
            )}
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.release_date || "غير معروف"}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    padding: 16,
  },
  input: {
    backgroundColor: "white",
    color: "black",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 16,
    marginBottom: 12,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
  },
  poster: {
    width: 100,
    height: 150,
  },
  noImage: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#888",
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    color: "#999",
    marginTop: 6,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 8,
  },
  retryButton: {
    padding: 10,
    backgroundColor: "#ab8bff",
    borderRadius: 6,
  },
  retryText: {
    color: "#0d0d0d",
    fontWeight: "bold",
  },
  noResultsText: {
    color: "#aaa",
    fontSize: 16,
  },
});

export default SearchScreen;
