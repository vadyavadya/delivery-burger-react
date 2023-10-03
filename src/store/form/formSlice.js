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
    validation: {},
    touch: false,
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
            state.response = '';
        },
        validationFormAction: (state, action) => {
            state.validation = action.payload;
        },
        touchFormAction: state => {
            state.touch = true;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(submitForm.pending, state => {
                state.response = null;
                state.response = '';
            })
            .addCase(submitForm.fulfilled, (state, action) => {
                state.response = action.payload

            })
            .addCase(submitForm.rejected, (state, action) => {
                state.response = action.payload;
            })
    }
})

export const { changeForm, validationFormAction, touchFormAction } = formSlice.actions;
export default formSlice.reducer

export const validationForm = () => (dispatch, getState) => {
    const form = getState().form;
    const errorsValidation = {};
    if (form.touch) {
        if (!form.name) {
            errorsValidation.name = 'Name is empty.';
        }

        let regPhone = /^[+][0-9] [(][0-9]{3}[)] [0-9]{3}[-][0-9]{2}[-][0-9]{2}$/
        if (!regPhone.test(form.phone)) {
            errorsValidation.phone = 'Формат телефона +7 (777)-777-77-77'
        }
        if (!form.phone) {
            errorsValidation.phone = 'Phone is empty.';
        }

        if (form.format === 'delivery') {
            if (!form.address) {
                errorsValidation.address = 'Address is empty.';
            }
            if (!form.floor) {
                errorsValidation.floor = 'Floor is empty.';
            }
            if (!form.intercom) {
                errorsValidation.intercom = 'Intercom is empty.';
            }
        }
    }
    dispatch(validationFormAction(errorsValidation));
}