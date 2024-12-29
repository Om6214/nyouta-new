import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import weddingwebsiteReducer from "./slices/weddingwebsiteSlice";
import weddingtemplateReducer from "./slices/weddingtemplateSlice";
import addressReducer from "./slices/addressSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    weddingwebsite: weddingwebsiteReducer,
    weddingtemplates: weddingtemplateReducer,
    address: addressReducer,
});

export default rootReducer;

