// app/_layout.tsx
import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store"; // ← تأكد أن المسار صحيح حسب مكان store/index.ts

export default function Layout() {
  return (
    <Provider store={store}>
      <StatusBar hidden={true}/>
      <Slot />
    </Provider>
  );
}
