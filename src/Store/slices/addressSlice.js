import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";
import { toast } from "react-toastify";

const initialState = {
    addresses: [],
    loading: false,
    error: null,
}

export const getAddresses = createAsyncThunk(
    "addresses/getAddresses",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/address/get-addresses`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || "Something went wrong");
        }
    }
);

export const addAddress = createAsyncThunk(
    "addresses/addAddress", 
    async (address, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/address/add-address`, address,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateAddress = createAsyncThunk(
    "addresses/updateAddress",
    async (address, thunkAPI) => {
        try {
            const response = await axios.put(`${BASE_URL}/address/update-address/${address._id}`, address,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const deleteAddress = createAsyncThunk(
    "addresses/deleteAddress",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${BASE_URL}/address/delete-address/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
          .addCase(getAddresses.pending, (state) => {
            state.loading = true;
          })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload;
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addAddress.pending, (state) => {
                state.loading = true;
            })  
            .addCase(addAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses= [...state.addresses, action.payload.address];
                toast.success(action.payload.message);
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // console.log(action.payload);
                toast.error(action.payload.message);
            })
            .addCase(updateAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.loading = false;
                toast.success(action.payload.message);
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload.message);
            })

            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.loading = false;
                toast.success(action.payload.message);
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload.message);
            })
    }
});

export default addressSlice.reducer;