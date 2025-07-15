// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_API_SECRET_KEY || "Aritra Routh",
      onError: function (error: any) {
        console.error("Encryption error:", error);
      },
    }),
  ],
};

const persistedReducer = persistReducer<typeof rootReducer extends (...args: any[]) => infer R ? R : any>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
