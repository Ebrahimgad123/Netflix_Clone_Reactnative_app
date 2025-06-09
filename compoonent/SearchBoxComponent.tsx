import { icons } from "@/constants/icons";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  placeholder: string;
  onPress?: () => void;
};

const SearchBoxComponent = ({ placeholder, onPress }: Props) => {
  const [search, setSearch] = useState("");

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View style={styles.container}>
        <Image
          source={icons.search}
          style={styles.icon}
          resizeMode="contain"
        />
        <TextInput
          editable={false}
          placeholder={placeholder}
          placeholderTextColor="black"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 999, // شكل دائري
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 12,
    tintColor: "#ab8bff",
  },
  input: {
    flex: 1,
    color: "black",
    height: 35,
  },
});

export default SearchBoxComponent;
