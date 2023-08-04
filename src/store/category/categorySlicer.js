import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, POSTFIX } from '../../const'

const initialState = {
    category: [],
    error: '',
    activeCategory: 0,
};

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () =>
    fetch(`${API_URL}${POSTFIX}/category`)
        .then((res) => res.json())
        .catch((error) => ({ error }))
)

export const categorySlicer = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.activeCategory = action.payload.indexCategory;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategory.pending, state => {
                state.error = '';
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.category = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.error = action.payload.error;
            })
    }
})

export const { changeCategory } = categorySlicer.actions;

export default categorySlicer.reducer;