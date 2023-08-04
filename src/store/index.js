import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlicer";
import productReducer from "./product/productSlicer";
import orderReducer, { localStorageMiddleware } from "./order/orderSlicer"


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        order: orderReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})
