import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BlogInitialState = {
    blogs: [],
    selectedBlog: null,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogs: (state, action: PayloadAction<Blog[]>) => {
            state.blogs = action.payload;
        },
        selectBlog: (state, action: PayloadAction<Blog>) => {
            state.selectedBlog = action.payload;
        },
        clearSelectedBlog: (state) => {
            state.selectedBlog = null;
        },
    },
});

export const { setBlogs, selectBlog, clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;