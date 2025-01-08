import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";
import { toast } from "react-toastify";
import { logout } from "./authSlice";

const initialState = {
    products: [],
    cart: [],
    loading: false,
    error: null,
}

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/products/products`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getCart = createAsyncThunk(
    "products/getCart",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/cart/get-cart`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            if (error.response.status === 401 || error.response.status === 403) {
                thunkAPI.dispatch(logout()); // Use `thunkAPI.dispatch` 
            }
            return thunkAPI.rejectWithValue(error.response.data.message || "Something went wrong");
        }
    }
);

export const addtoCart = createAsyncThunk(
    "products/addtoCart",
    async (product, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/cart/add-to-cart`, product,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const removeFromCart = createAsyncThunk(
    "products/removeFromCart",
    async (productId, thunkAPI) => {
        try {
            const response = await axios.delete(`${BASE_URL}/cart/remove-from-cart/${productId}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const updateCartQuantity = createAsyncThunk(
    "products/updateCartQuantity",
    async (product, thunkAPI) => {
        try {
            const response = await axios.put(`${BASE_URL}/cart/update-quantity`, product,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addtoCartReducer(state, action) {
            state.cart = [...state.cart, action.payload];
        },
        emptyCart(state) {
            state.cart = [];
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Add to Cart  
        .addCase(getCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
        })
        .addCase(getCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(addtoCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(addtoCart.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload.message);
            state.cart = action.payload.cart;
        })
        .addCase(addtoCart.rejected, (state, action) => {
            state.loading = false;
            toast.error(action.payload);
            state.error = action.payload;
        })

        // Remove from Cart
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload.message);
            state.cart = action.payload.cart;
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Update Cart Quantity
        .addCase(updateCartQuantity.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
        })
        .addCase(updateCartQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { addtoCartReducer ,emptyCart} = productSlice.actions;
export default productSlice.reducer;
