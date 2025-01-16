import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

const initialState = {
    weddingWebsite: null,
    weddingwebsiteData: null,
    loading: false,
    error: null,
};

export const getWeddingWebsite = createAsyncThunk(
    "weddingwebsite/getWeddingWebsite",
    async (slug, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/weddingwebsite/getWeddingWebsite/${slug}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: error.message,
                status: error.response ? error.response.status : null,
            });
        }
    }
);

export const verifyWeddingWebsite = createAsyncThunk(
    "weddingwebsite/verifyWeddingWebsite",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/weddingwebsite/verify-wedding-website`, data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: error.message,
                status: error.response ? error.response.status : null,
            });
        }
    }
);

export const updateWeddingWebsitedata = createAsyncThunk(
    "weddingwebsite/updateWeddingWebsitedata",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`${BASE_URL}/weddingwebsite/updateWeddingWebsitedata/${data.id}`, data,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getWeddingWebsitedata = createAsyncThunk(
    "weddingwebsite/getWeddingWebsitedata",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/weddingwebsite/getweddingWebsitedata`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const weddingwebsiteSlice = createSlice({
    name: "weddingwebsite",
    initialState,
    reducers: {
        resetState: (state) => {
            state.weddingWebsite = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getWeddingWebsite.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getWeddingWebsite.fulfilled, (state, action) => {
            state.loading = false;
            state.weddingWebsite = action.payload;
        });
        builder.addCase(getWeddingWebsite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateWeddingWebsitedata.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateWeddingWebsitedata.fulfilled, (state, action) => {
            state.loading = false;
            state.weddingWebsite = action.payload.weddingWebsite;
        });
        builder.addCase(updateWeddingWebsitedata.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getWeddingWebsitedata.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getWeddingWebsitedata.fulfilled, (state, action) => {
            state.loading = false;
            state.weddingwebsiteData = action.payload;
        });
        builder.addCase(getWeddingWebsitedata.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(verifyWeddingWebsite.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyWeddingWebsite.fulfilled, (state, action) => {
            state.loading = false;
            state.weddingWebsite = action.payload.data;
        });
        builder.addCase(verifyWeddingWebsite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { resetState } = weddingwebsiteSlice.actions;
export default weddingwebsiteSlice.reducer;