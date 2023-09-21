import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, POSTFIX } from "../../const.js"

const initialState = {
    isOpen: false,
    data: '',
    status: 'idle',
    error: '',
}

export const modalProductFetch = createAsyncThunk(
    'modalProduct/fetch',
    async (id) => {
        const res = await fetch(`${API_URL}${POSTFIX}/${id}`);
        const json = await res.json();
        return json;
    }
)

export const modalProductSlicer = createSlice({
    name: 'modalProduct',
    initialState,
    reducers: {
        openModalProd: state => {
            state.isOpen = true;
        },
        closeModalProd: state => {
            state.isOpen = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(modalProductFetch.pending, state => {
                state.status = 'loading';
            })
            .addCase(modalProductFetch.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(modalProductFetch.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export const { openModalProd, closeModalProd } = modalProductSlicer.actions
export default modalProductSlicer.reducer
