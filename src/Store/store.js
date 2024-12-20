import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import weddingwebsiteReducer from "./slices/weddingwebsiteSlice";
import weddingtemplateReducer from "./slices/weddingtemplateSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    weddingwebsite: weddingwebsiteReducer,
    weddingtemplates: weddingtemplateReducer,
});

export default rootReducer;

