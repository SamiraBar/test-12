import type { Comment } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, fetchComments } from './commentsThunk.ts';

interface CommentsState {
    items: Comment[];
    itemsFetching: boolean;
    createLoading: boolean;
    deleteLoading: string | null;
}

const initialState: CommentsState = {
    items: [],
    itemsFetching: false,
    createLoading: false,
    deleteLoading: null,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
                state.itemsFetching = false;
                state.items = comments;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.itemsFetching = false;
            });

        builder
            .addCase(createComment.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createComment.fulfilled, (state, { payload: comment }) => {
                state.createLoading = false;
                state.items.unshift(comment);
            })
            .addCase(createComment.rejected, (state) => {
                state.createLoading = false;
            });

        builder
            .addCase(deleteComment.pending, (state, action) => {
                state.deleteLoading = action.meta.arg;
            })
            .addCase(deleteComment.fulfilled, (state, { meta }) => {
                state.deleteLoading = null;
                state.items = state.items.filter(comment => comment._id !== meta.arg);
            })
            .addCase(deleteComment.rejected, (state) => {
                state.deleteLoading = null;
            });
    },
    selectors: {
        selectComments: (state) => state.items,
        selectCommentsFetching: (state) => state.itemsFetching,
        selectCreateCommentLoading: (state) => state.createLoading,
        selectDeleteCommentLoading: (state) => state.deleteLoading,
    },
});

export const commentsReducer = commentsSlice.reducer;
export const {
    selectComments,
    selectCommentsFetching,
    selectCreateCommentLoading,
    selectDeleteCommentLoading,
} = commentsSlice.selectors;