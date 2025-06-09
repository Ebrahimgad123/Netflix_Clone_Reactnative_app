📱 Netflix Clone React Native App (Expo)
A mobile application built with React Native and Expo, allowing users to browse, search, and save movies via a third-party movie API. The app uses file-based routing, Redux Toolkit for state management, and NativeWind (Tailwind CSS) for styling.

🧱 Project Structure
bash
Copy
Edit
.
├── app/                       # File-based routing (each file = screen)
│   ├── (app)/                # Main screens
│   │   ├── index.tsx         # Home screen (movie list)
│   │   ├── profile.tsx       # User profile
│   │   ├── saved.tsx         # Saved movies
│   │   ├── search.tsx        # Search screen
│   │   └── _layout.tsx       # App layout
│   ├── movies/[id].tsx       # Movie detail screen
│   ├── _layout.tsx           # Root layout
│   └── global.css            # Global styles
│
├── compoonent/               # Reusable UI components
│   ├── FlatListComponent.tsx
│   ├── HorizontalFlatList.tsx
│   └── SearchBoxComponent.tsx
│
├── store/                    # Redux store
│   ├── index.ts              # Store setup
│   └── savedMoviesSlice.ts   # Slice for saved movies
│
├── services/                 # API & data fetching
│   ├── api.ts                # API client
│   └── useFetch.ts           # Custom data-fetching hook
│
├── constants/                # Static references
│   ├── icons.ts
│   └── images.ts
│
├── interfaces/               # TypeScript interfaces
│   └── interfaces.d.ts
│
├── assets/                   # Fonts, icons, images
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── android/                  # Expo-managed native Android project
│
├── .env                      # API keys and environment variables
├── metro.config.js           # Metro bundler config
├── babel.config.js           # Babel config
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind / NativeWind config
└── nativewind-env.d.ts       # NativeWind typings
⚙️ Key Technologies
Purpose	Library / Tool
UI Framework	React Native + Expo
Navigation & Routing	Expo Router (file-based)
State Management	Redux Toolkit
Styling	NativeWind (Tailwind CSS)
API Communication	Axios in services/api.ts
Data Fetching	Custom hook useFetch.ts
Type Safety	TypeScript
Development Bundler	Metro (Expo default)

🧠 Architecture Overview
🔄 Unidirectional Data Flow
User taps a component in a screen.

Component dispatches an action to Redux.

Redux slice or useFetch hook calls API via api.ts.

API returns data → Redux updates state.

UI re-renders with new state.

🗺️ Routing
Each .tsx file under app/(app)/ becomes a screen.

Layouts like _layout.tsx provide shared UI structure.

Dynamic route [id].tsx is used for individual movie details.

📡 External Services
The app fetches movie data from a third-party API (key stored in .env).

No backend — all logic is on the client side.

🖼️ UI Components
Component	Purpose
FlatListComponent	Displays vertical list of movies
HorizontalFlatList	Displays horizontal scrollable movie list
SearchBoxComponent	Search input for movie titles

🧬 State Management
store/index.ts: Initializes the Redux store.

savedMoviesSlice.ts: Manages the logic for saving/removing movies.

🔐 Secrets & Config
.env: Stores the API key securely.

metro.config.js, babel.config.js: Configure Metro bundler and Babel.

tsconfig.json: TypeScript setup.

tailwind.config.js: Tailwind CSS setup for NativeWind.

🛠️ Build & Runtime
Expo Runtime bundles the JavaScript and handles hot reloading.

The Android directory is managed automatically by Expo for native builds.

Metro Bundler serves fonts, images, and code to the device.

🔍 How to Run the App
bash
Copy
Edit
# 1. Install dependencies
npm install

# 2. Add API key
Create a `.env` file and add:
MOVIE_API_KEY=your_key_here

# 3. Start the Expo development server
npx expo start
🔄 Suggested Improvements
Add authentication (e.g., Firebase Auth).

Add movie caching for offline support.

Add rating or review features.

📌 Notes
All native code is handled by Expo.

No backend server is included.

The app is fully cross-platform (Android + iOS).
