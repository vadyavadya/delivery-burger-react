import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlicer";
import productReducer from "./product/productSlicer";
import orderReducer, { localStorageMiddleware } from "./order/orderSlicer"
import modalReducer from './modalDelivery/modalDelivery'
import formReducer from './form/formSlice'
import aboutProductReducer from "./modalAboutProduct/modalAboutProductSlice"


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        order: orderReducer,
        modal: modalReducer,
        form: formReducer,
        modalAboutProduct: aboutProductReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})
