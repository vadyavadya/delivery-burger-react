import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, POSTFIX } from "../../const";



export const modalAboutProduct = createSlice({
    name: 'about-product',
    initialState: {
        isOpen: false,
        product: {},
    },
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.product = action.payload;
        },
        closeModal: state => {
            state.isOpen = false;
            state.product = {};
        }
    },
})

export const { openModal, closeModal } = modalAboutProduct.actions;

export default modalAboutProduct.reducer;