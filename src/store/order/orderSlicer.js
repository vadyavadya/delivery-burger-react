import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, POSTFIX } from "../../const";
import { calcTotal } from "../../utils/calcTotal";


const initialState = {
    orderList: JSON.parse(localStorage.getItem('order') || '[]'),
    listGoods: [],
    totalCount: 0,
    totalPrice: 0,
    errors: [],
}

export const localStorageMiddleware = store => next => action => {
    const nextAction = next(action);

    if (nextAction.type.startsWith('order/')) {
        const orderList = store.getState().order.orderList;
        localStorage.setItem('order', JSON.stringify(orderList))
    }

    return nextAction;
}

export const requestOrderGoods = createAsyncThunk('order/fetch',
    (_, { getState }) => {
        const listId = getState().order.orderList.map(item => item.id);

        return fetch(`${API_URL}${POSTFIX}?list=${listId}`)
            .then(res => res.json())
            .catch(error => ({ error }))
    })

const orderSlicer = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const productOrderList = state.orderList.find((item) =>
                item.id === action.payload
            );
            if (productOrderList) {
                productOrderList.count += 1;

                const productOrderGoods = state.listGoods.find((item) =>
                    item.id === productOrderList.id
                );
                productOrderGoods.count = productOrderList.count;
                state.totalCount = calcTotal(state.listGoods, 'count');
                state.totalPrice = calcTotal(state.listGoods, 'price');
            } else {
                state.orderList.push({ id: action.payload, count: 1 })
            }
        },
        removeProduct: (state, action) => {
            const productOrderList = state.orderList.find((item) =>
                item.id === action.payload
            );
            if (productOrderList.count > 1) {
                productOrderList.count -= 1;

                const productOrderGoods = state.listGoods.find((item) =>
                    item.id === productOrderList.id
                );
                productOrderGoods.count = productOrderList.count;
                state.totalCount = calcTotal(state.listGoods, 'count');
                state.totalPrice = calcTotal(state.listGoods, 'price');
            } else {
                state.orderList = state.orderList.filter(item => item.id != action.payload);
            }
        },
        removeOrder: (state) => {
            state.orderList = [];
        },
        addProductCount: (state, action) => {
            const productOrderList = state.orderList.find((item) =>
                item.id === action.payload.id
            );
            if (productOrderList) {

                if (action.payload.count === 0) {
                    state.orderList = state.orderList.filter((item) => item.id != action.payload.id);
                } else {
                    productOrderList.count = action.payload.count;

                    const productOrderGoods = state.listGoods.find((item) =>
                        item.id === productOrderList.id
                    );
                    productOrderGoods.count = productOrderList.count;

                    state.totalCount = calcTotal(state.listGoods, 'count');
                    state.totalPrice = calcTotal(state.listGoods, 'price');
                }
            } else {
                state.orderList.push({ id: action.payload.id, count: action.payload.count })
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(requestOrderGoods.pending, state => {
                state.errors = '';
            })
            .addCase(requestOrderGoods.fulfilled, (state, action) => {
                const listGoods = action.payload;
                state.listGoods = listGoods.map(item => {
                    item.count = state.orderList.find(
                        liItem => liItem.id == item.id
                    ).count;
                    return item
                })
                state.errors = '';
                state.totalCount = calcTotal(listGoods, 'count');
                state.totalPrice = calcTotal(listGoods, 'price');

            })
            .addCase(requestOrderGoods.rejected, (state, action) => {
                state.errors = action.payload.error;
            })
    }
});

export const { addProduct, addProductCount, removeProduct, removeOrder } = orderSlicer.actions;
export default orderSlicer.reducer;

