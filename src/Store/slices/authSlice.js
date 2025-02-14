import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";
import { toast } from "react-toastify";

const initialState = {
    loading: false,
    error: null,
    user: {},
}

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        // console.log(data);
        const res = await axios.post(`${BASE_URL}/auth/login`, data);
        // console.log(res);
        localStorage.setItem("token",res.data.token);  
        localStorage.setItem("user",JSON.stringify(res.data.user));
        return res.data;
    } catch (error) {
        // console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
    try {
        // console.log(data);
        const res = await axios.post(`${BASE_URL}/auth/register`, data);
        // console.log(res);
        localStorage.setItem("token",res.data.token);  
        localStorage.setItem("user",JSON.stringify(res.data.user));
        return res.data;
    } catch (error) {
        // console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const googleSignup = createAsyncThunk("auth/googleSignup", async (response, thunkAPI) => {
    try {
        // console.log(response);
        const res = await axios.post(`${BASE_URL}/auth/google-signup`, response);
        // console.log(res);
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const verifyEmail = createAsyncThunk("auth/verifyEmail", async (data, thunkAPI) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/verify-email`, data);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getUser = createAsyncThunk(
    "auth/getUser", 
    async (id, thunkAPI) => {
        try {
            // console.log(id);    
            const res = await axios.get(`${BASE_URL}/auth/getUser/${id}`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },  
            });
            return res.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {};
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                toast.success(action.payload.message);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload.message);
            })

            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                toast.success(action.payload.message);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload.message);
            })
            .addCase(googleSignup.pending, (state) => {
                state.loading = true;
            })
            .addCase(googleSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                toast.success(action.payload.message);
            })
            .addCase(googleSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload.message);
            })

            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false;
                toast.success(action.payload.message);
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload.message);
            })

            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
