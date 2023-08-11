import { createSlice } from "@reduxjs/toolkit";


export const modalDelivery = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
    },
    reducers: {
        openModal: state => {
            state.isOpen = true;
        },
        closeModal: state => {
            state.isOpen = false;
        }
    }
});

export const { openModal, closeModal } = modalDelivery.actions;

export default modalDelivery.reducer;