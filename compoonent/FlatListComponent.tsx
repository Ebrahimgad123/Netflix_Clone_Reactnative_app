import { Movie } from "@/interfaces/interfaces";
import { addMovie, removeMovie } from "@/store/savedMoviesSlice";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const numColumns = 3;
const gap = 10;
const horizontalPadding = 30;
const itemWidth =
  (width - gap * (numColumns - 1) - horizontalPadding) / numColumns;

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const FlatListComponent = ({ movie }: { movie: Movie[] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const savedMovies = useSelector((state: any) => state.savedMovies.movies);

  return (
    <FlatList
      data={movie}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      columnWrapperStyle={{
        justifyContent: "flex-start",
        marginBottom: gap,
        gap,
      }}
      renderItem={({ item }) => {
        const isSaved = savedMovies.some((m: Movie) => m.id === item.id);

        const toggleSave = () => {
          if (isSaved) {
            dispatch(removeMovie(item.id));
          } else {
            dispatch(addMovie(item));
          }
        };

        return (
          <View style={{ width: itemWidth }}>
            <TouchableOpacity
              onPress={() => router.push(`/movies/${item.id}`)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </TouchableOpacity>

            {/* أيقونة الحفظ */}
            <TouchableOpacity
              onPress={toggleSave}
              style={styles.heartIcon}
            >
              <Ionicons
                name={isSaved ? "heart" : "heart-outline"}
                size={18}
                color={isSaved ? "red" : "white"}
              />
            </TouchableOpacity>

            <Text
              style={styles.movieTitle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
           <View style={{ flexDirection: "row", marginTop: 4 }}>
            {Array.from({ length: 5 }).map((_, index) => {
              const rating = item.vote_average / 2; // من 10 إلى 5 نجوم
              return (
                <Ionicons
                  key={index}
                  name={index < Math.floor(rating) ? "star" : "star-outline"}
                  size={12}
                  color="yellow"
                  style={{ marginRight: 2 }}
                />
              );
            })}
          </View>



          </View>
        );
      }}
      contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 15 }}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: 170,
    borderRadius: 12,
  },
  heartIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 4,
    zIndex: 10,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6,
    textAlign: "left",
  },
});

export default FlatListComponent;
