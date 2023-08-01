import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlicer";

export const store = configureStore({
    reducer: {
        category: categoryReducer
    },
})