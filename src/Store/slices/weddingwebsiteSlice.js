import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

const initialState = {
    weddingWebsite: null,
    loading: false,
    error: null,
}

export const getWeddingWebsite = createAsyncThunk(
    "weddingwebsite/getWeddingWebsite",
    async (slug, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/weddingwebsite/getWeddingWebsite/${slug}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const weddingwebsiteSlice = createSlice({
    name: "weddingwebsite",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWeddingWebsite.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getWeddingWebsite.fulfilled, (state, action) => {
            state.loading = false;
            state.weddingWebsite = action.payload;
        })
        builder.addCase(getWeddingWebsite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default weddingwebsiteSlice.reducer;