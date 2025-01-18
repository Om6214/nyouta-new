import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import weddingwebsiteReducer from "./slices/weddingwebsiteSlice";
import weddingtemplateReducer from "./slices/weddingtemplateSlice";
import addressReducer from "./slices/addressSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from "@reduxjs/toolkit";
import { getWeddingWebsite } from './slices/weddingwebsiteSlice';
import { isPlain } from 'lodash';


const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    weddingwebsite: weddingwebsiteReducer,
    weddingtemplates: weddingtemplateReducer,
    address: addressReducer,
});

const persistConfig = {
    key: 'nyouta',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const forceGetWeddingWebsiteMiddleware = store => next => action => {
    if (action.type === 'weddingwebsite/forceFetch') {
        if (isPlain(action.payload)) {
            store.dispatch(getWeddingWebsite(action.payload));
        } else {
            console.warn('Non-serializable value detected in action payload:', action.payload);
        }
    }
    return next(action);
};

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(forceGetWeddingWebsiteMiddleware),
});
const persistor = persistStore(store);

export { store, persistor };

