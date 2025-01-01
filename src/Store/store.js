import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import weddingwebsiteReducer from "./slices/weddingwebsiteSlice";
import weddingtemplateReducer from "./slices/weddingtemplateSlice";
import addressReducer from "./slices/addressSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    weddingwebsite: weddingwebsiteReducer,
    weddingtemplates: weddingtemplateReducer,
    address: addressReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});
const persistor = persistStore(store);

export { store, persistor };

