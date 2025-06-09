
# 📱 Netflix Clone React Native App (Expo)

A mobile app built with React Native and Expo to browse, search, and save movies using a third-party API.

---

## 🧱 Project Structure
```bash
.
├── app/
│   ├── (app)/
│   │   ├── index.tsx          # Home screen
│   │   ├── profile.tsx        # Profile screen
│   │   ├── saved.tsx          # Saved movies
│   │   ├── search.tsx         # Search screen
│   │   └── _layout.tsx        # App layout
│   ├── movies/[id].tsx        # Movie detail screen
│   ├── _layout.tsx            # Root layout
│   └── global.css
├── compoonent/
│   ├── FlatListComponent.tsx
│   ├── HorizontalFlatList.tsx
│   └── SearchBoxComponent.tsx
├── store/
│   ├── index.ts
│   └── savedMoviesSlice.ts
├── services/
│   ├── api.ts
│   └── useFetch.ts
├── constants/
│   ├── icons.ts
│   └── images.ts
├── interfaces/
│   └── interfaces.d.ts
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── android/
├── .env
├── metro.config.js
├── babel.config.js
├── tsconfig.json
├── tailwind.config.js
└── nativewind-env.d.ts
```

---

## ⚙️ Key Technologies

| Purpose              | Tool                          |
|----------------------|-------------------------------|
| UI Framework         | React Native + Expo           |
| Routing              | Expo Router (File-based)      |
| State Management     | Redux Toolkit                 |
| Styling              | NativeWind (Tailwind CSS)     |
| API Requests         | Axios (`services/api.ts`)     |
| Data Fetching        | `useFetch.ts` (Custom Hook)   |
| Typing               | TypeScript                    |
| Dev Server / Bundler | Metro (Expo Default)          |

---

## 🧠 Architecture Overview

1. User interacts with UI components.
2. Component dispatches Redux actions.
3. Redux slices or hooks send API requests.
4. Data is returned → Redux updates store.
5. UI listens to state → re-renders.

---

## 🗺️ Routing

- All `.tsx` files under `app/(app)/` are screens.
- `_layout.tsx` provides shared layout structure.
- `[id].tsx` handles dynamic routes (movie details).

---

## 📡 External Services

- Movie data comes from a third-party API.
- API key stored securely in `.env`.

---

## 🖼️ UI Components

| Component             | Role                                  |
|-----------------------|---------------------------------------|
| FlatListComponent     | Vertical movie list                   |
| HorizontalFlatList    | Horizontal scrollable list            |
| SearchBoxComponent    | Input for movie title search          |

---

## 🧬 State Management

- `store/index.ts`: Redux store config.
- `savedMoviesSlice.ts`: Handles saving/removing movies.

---

## 🔐 Secrets & Config

- `.env`: Contains API key (`MOVIE_API_KEY=your_key_here`)
- `metro.config.js`, `babel.config.js`: Dev configs.
- `tailwind.config.js`: Tailwind/NativeWind setup.

---

## 🛠️ Build & Runtime

- Expo handles native builds.
- Metro Bundler serves assets and JS to the device.
- Hot reloading via Expo dev server.

---

## 🔍 How to Run the App

```bash
# 1. Install dependencies
npm install

# 2. Add API key
# Create `.env` and add:
MOVIE_API_KEY=your_key_here

# 3. Start development server
npx expo start
```

---

## 🔄 Suggested Improvements

- Add Firebase Auth
- Add offline movie caching
- Add ratings or reviews

---

## 📌 Notes

- Native code is fully managed by Expo.
- No backend included — all logic is client-side.
- Works on both Android and iOS.
