import { Alert, CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRecipes, selectRecipesFetching } from './recipesSlice.ts';
import { type ReactNode, useEffect } from 'react';
import { fetchRecipes } from './recipesThunk.ts';
import RecipeItem from './components/RecipeItem.tsx';

const Recipes = () => {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(selectRecipes);
    const recipesFetching = useAppSelector(selectRecipesFetching);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    let content: ReactNode = (
        <Alert severity="info" sx={{ width: '100%' }}>
            Рецептов пока нет.
        </Alert>
    );

    if (recipesFetching) {
        content = <CircularProgress />;
    } else if (recipes.length > 0) {
        content = recipes.map((recipe) => (
            <Grid key={recipe._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <RecipeItem
                    id={recipe._id}
                    title={recipe.title}
                    image={recipe.image}
                    userName={recipe.user.displayName}
                    userId={recipe.user._id}
                />
            </Grid>
        ));
    }

    return (
        <Grid container spacing={3}>
            <Grid size={12}>
                <Typography variant="h4">Все рецепты</Typography>
            </Grid>
            <Grid container spacing={3} size={12}>
                {content}
            </Grid>
        </Grid>
    );
};

export default Recipes;