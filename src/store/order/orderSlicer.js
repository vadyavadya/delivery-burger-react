import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    orderList: JSON.parse(localStorage.getItem('order') || '[]'),
}

export const localStorageMiddleware = store => next => action => {
    const nextAction = next(action);

    console.log(nextAction.type.startsWith('order/'));
    if (nextAction.type.startsWith('order/')) {
        const orderList = store.getState().order.orderList;
        localStorage.setItem('order', JSON.stringify(orderList))
    }

    return nextAction;
}

const orderSlicer = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const product = state.orderList.find((item) => item.id === action.payload);
            if (product) {
                product.count += 1;
            } else {
                state.orderList.push({ id: action.payload, count: 1 })
            }
        }
    }
});

export const { addProduct } = orderSlicer.actions;
export default orderSlicer.reducer;