import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlicer";
import productReducer from "./product/productSlicer";
import orderReducer, { localStorageMiddleware } from "./order/orderSlicer"
import modalReducer from './modalDelivery/modalDelivery'
import formReducer from './form/formSlice'
import modalProdReducer from './modalProduct/modalProduct'


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        order: orderReducer,
        modal: modalReducer,
        form: formReducer,
        productModal: modalProdReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})
