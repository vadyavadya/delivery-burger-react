import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlicer";
import productReducer from "./product/productSlicer";
import orderReducer, { localStorageMiddleware } from "./order/orderSlicer"
import modalReducer from './modalDelivery/modalDelivery'
import formReducer from './form/formSlice'


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        order: orderReducer,
        modal: modalReducer,
        form: formReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})
