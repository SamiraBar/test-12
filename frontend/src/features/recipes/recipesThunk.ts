import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import type { Recipe, RecipeMutation } from '../../types';

export const fetchRecipes = createAsyncThunk<Recipe[]>('recipes/fetchAll', async () => {
    const { data: recipes } = await axiosApi.get<Recipe[]>('/recipes');
    return recipes;
});

export const fetchUserRecipes = createAsyncThunk<Recipe[], string>(
    'recipes/fetchUserRecipes',
    async (userId) => {
        const { data: recipes } = await axiosApi.get<Recipe[]>(`/recipes/user/${userId}`);
        return recipes;
    },
);

export const fetchOneRecipe = createAsyncThunk<Recipe, string>(
    'recipes/fetchOne',
    async (id) => {
        const { data: recipe } = await axiosApi.get<Recipe>('/recipes/' + id);
        return recipe;
    },
);

export const createRecipe = createAsyncThunk<void, RecipeMutation>(
    'recipes/create',
    async (recipeMutation) => {
        const formData = new FormData();
        formData.append('title', recipeMutation.title);
        formData.append('recipe', recipeMutation.recipe);

        if (recipeMutation.image) {
            formData.append('image', recipeMutation.image);
        }

        await axiosApi.post('/recipes', formData);
    },
);

export const deleteRecipe = createAsyncThunk<void, string>('recipes/delete', async (id) => {
    await axiosApi.delete('/recipes/' + id);
});