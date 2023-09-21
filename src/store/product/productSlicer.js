import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL, POSTFIX } from "../../const"


const initialState = {
    product: [],
    status:'idle',
    error: '',
}

export const productFetch = createAsyncThunk('product/fetch',
    async (category) => fetch(`${API_URL}${POSTFIX}?category=${category}`)
        .then(res => res.json())
        .catch(error => ({ error }))
)

export const productSlicer = createSlice({
    name: 'product',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(productFetch.pending, state => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(productFetch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
            })
            .addCase(productFetch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            })
    },
})

export default productSlicer.reducer;