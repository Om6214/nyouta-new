import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

const initialState = {
    weddingTemplates: [],
    slug: null,
    loading: false,
    error: null,
}

const token = localStorage.getItem('token');
console.log(token);

export const getWeddingTemplates = createAsyncThunk("weddingtemplates/getWeddingTemplates", 
    async (_, thunkAPI) => {
        try {
            console.log("gvdubehvnjer");
            const response = await axios.get(`${BASE_URL}/templates/getAllTemplates`,
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(response.data.templates);
            return response.data.templates;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createWeddingWebsite = createAsyncThunk("weddingtemplates/createWeddingWebsite", 
    async (templateId, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/weddingwebsite/createWeddingWebsite/${templateId}`,
                {},
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateWeddingWebsite = createAsyncThunk("weddingtemplates/updateWeddingWebsite", 
    async (templateId, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${BASE_URL}/weddingwebsite/updateWeddingWebsite/${templateId}`,
                {},
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateWeddingWebsitedata = createAsyncThunk("weddingtemplates/updateWeddingWebsitedata", 
    async (formData, thunkAPI) => {
        try {
            const response = await axios.put(`${BASE_URL}/weddingwebsite/updateWeddingWebsitedata`, formData,
                {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const weddingtemplatesSlice = createSlice({
    name: "weddingtemplates",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWeddingTemplates.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getWeddingTemplates.fulfilled, (state, action) => {
            state.loading = false;
            state.weddingTemplates = action.payload;
        })
        builder.addCase(getWeddingTemplates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(createWeddingWebsite.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createWeddingWebsite.fulfilled, (state, action) => {
            state.loading = false;
            state.slug = action.payload.slug;
        })
        builder.addCase(createWeddingWebsite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(updateWeddingWebsite.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateWeddingWebsite.fulfilled, (state, action) => {
            state.loading = false;
            state.slug= action.payload;
        })
        builder.addCase(updateWeddingWebsite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(updateWeddingWebsitedata.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateWeddingWebsitedata.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(updateWeddingWebsitedata.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default weddingtemplatesSlice.reducer;