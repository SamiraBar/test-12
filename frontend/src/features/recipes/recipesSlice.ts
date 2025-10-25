import type { Recipe } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createRecipe, deleteRecipe, fetchOneRecipe, fetchRecipes, fetchUserRecipes } from './recipesThunk.ts';

interface RecipesState {
    items: Recipe[];
    userRecipes: Recipe[];
    oneRecipe: Recipe | null;
    itemsFetching: boolean;
    userRecipesFetching: boolean;
    oneRecipeFetching: boolean;
    createLoading: boolean;
    deleteLoading: string | null;
}

const initialState: RecipesState = {
    items: [],
    userRecipes: [],
    oneRecipe: null,
    itemsFetching: false,
    userRecipesFetching: false,
    oneRecipeFetching: false,
    createLoading: false,
    deleteLoading: null,
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(fetchRecipes.fulfilled, (state, { payload: recipes }) => {
                state.itemsFetching = false;
                state.items = recipes;
            })
            .addCase(fetchRecipes.rejected, (state) => {
                state.itemsFetching = false;
            });

        builder
            .addCase(fetchUserRecipes.pending, (state) => {
                state.userRecipesFetching = true;
            })
            .addCase(fetchUserRecipes.fulfilled, (state, { payload: recipes }) => {
                state.userRecipesFetching = false;
                state.userRecipes = recipes;
            })
            .addCase(fetchUserRecipes.rejected, (state) => {
                state.userRecipesFetching = false;
            });

        builder
            .addCase(fetchOneRecipe.pending, (state) => {
                state.oneRecipeFetching = true;
            })
            .addCase(fetchOneRecipe.fulfilled, (state, { payload: recipe }) => {
                state.oneRecipeFetching = false;
                state.oneRecipe = recipe;
            })
            .addCase(fetchOneRecipe.rejected, (state) => {
                state.oneRecipeFetching = false;
            });

        builder
            .addCase(createRecipe.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createRecipe.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createRecipe.rejected, (state) => {
                state.createLoading = false;
            });

        builder
            .addCase(deleteRecipe.pending, (state, action) => {
                state.deleteLoading = action.meta.arg;
            })
            .addCase(deleteRecipe.fulfilled, (state) => {
                state.deleteLoading = null;
            })
            .addCase(deleteRecipe.rejected, (state) => {
                state.deleteLoading = null;
            });
    },
    selectors: {
        selectRecipes: (state) => state.items,
        selectUserRecipes: (state) => state.userRecipes,
        selectOneRecipe: (state) => state.oneRecipe,
        selectRecipesFetching: (state) => state.itemsFetching,
        selectUserRecipesFetching: (state) => state.userRecipesFetching,
        selectOneRecipeFetching: (state) => state.oneRecipeFetching,
        selectCreateLoading: (state) => state.createLoading,
        selectDeleteLoading: (state) => state.deleteLoading,
    },
});

export const recipesReducer = recipesSlice.reducer;
export const {
    selectRecipes,
    selectUserRecipes,
    selectOneRecipe,
    selectRecipesFetching,
    selectUserRecipesFetching,
    selectOneRecipeFetching,
    selectCreateLoading,
    selectDeleteLoading,
} = recipesSlice.selectors;