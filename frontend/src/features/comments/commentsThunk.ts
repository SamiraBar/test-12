import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import type { Comment, CommentMutation } from '../../types';

export const fetchComments = createAsyncThunk<Comment[], string>(
    'comments/fetchAll',
    async (recipeId) => {
        const { data: comments } = await axiosApi.get<Comment[]>('/comments', {
            params: { recipe: recipeId },
        });
        return comments;
    },
);

export const createComment = createAsyncThunk<Comment, CommentMutation>(
    'comments/create',
    async (commentMutation) => {
        const { data: comment } = await axiosApi.post<Comment>('/comments', commentMutation);
        return comment;
    },
);

export const deleteComment = createAsyncThunk<void, string>('comments/delete', async (id) => {
    await axiosApi.delete('/comments/' + id);
});