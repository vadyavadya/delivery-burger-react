import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { closeModal } from "../modalDelivery/modalDelivery"
import { removeOrder } from "../order/orderSlicer"

const initialState = {
    name: '',
    phone: '',
    format: 'delivery',
    address: '',
    floor: '',
    intercom: '',
}

export const submitForm = createAsyncThunk('form/submit',
    async (data, { dispatch, rejectWithValue }) => {
        try {

            const response = await fetch(
                'https://cloudy-slash-rubidium.glitch.me/api/order',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            )

            if (!response.ok) {
                console.log('zd');
                throw new Error(`Ошибка: ${response.statusText}`)
            }

            dispatch(closeModal());
            dispatch(removeOrder());

            return await response.json();

        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        changeForm: (state, action) => {
            state[action.payload.field] = action.payload.value;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(submitForm.pending, state => {
                state.response = null
            })
            .addCase(submitForm.fulfilled, (state, action) => {
                state.response = action.payload

            })
            .addCase(submitForm.rejected, (state, action) => {
                state.response = action.payload;
            })
    }
})

export const { changeForm } = formSlice.actions;
export default formSlice.reducer