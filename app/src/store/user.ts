import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface UserState {
  email: string;
  username: string;
  password: string;
  nbr_games: number;
  winner: string[];
  token: string;
  role: string;
}

const initialState: UserState = {
  email: '',
  username: '',
  password: '',
  nbr_games: 0,
  winner: [],
  token: '',
  role: 'user',
};

// Création du slice pour l'utilisateur avec les reducers pour définir et effacer l'utilisateur
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser prend un UserState et le fusionne avec l'état actuel
    setUser: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
    // clearUser réinitialise l'état de l'utilisateur à l'état initial
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Configuration de la persistance des données
const persistConfig = {
  key: 'root',
  storage,
};

// Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

// Configuration du store avec le reducer persistant
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
