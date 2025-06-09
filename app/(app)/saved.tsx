// screens/Saved.js
import { RootState } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeMovie } from '../../store/savedMoviesSlice';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Saved = () => {
  const movies = useSelector((state: RootState) => state.savedMovies.movies);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeMovie(id));
  };

  if (movies.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'white',fontSize: 20 }}>لا توجد أفلام محفوظة</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.poster_path ? (
              <Image source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }} style={styles.poster} />
            ) : (
              <View style={[styles.poster, styles.noImage]}>
                <Text style={styles.noImageText}>بدون صورة</Text>
              </View>
            )}
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
               <Ionicons name='trash' size={20} color='white'></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    paddingTop:"30%",
    backgroundColor: '#0d0d0d',
    
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  poster: {
    width: 100,
    height: 150,
  },
  noImage: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#888',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: 90,
    right: 20,
    backgroundColor: 'red',
    color: 'white',
    padding: 8,
    borderRadius: 100,
  },
  removeButtonText: {
    color: 'white',

  },
});

export default Saved;
