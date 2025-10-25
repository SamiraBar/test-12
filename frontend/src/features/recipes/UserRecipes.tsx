import { Alert, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUserRecipes, selectUserRecipesFetching, selectDeleteLoading } from './recipesSlice.ts';
import { type ReactNode, useEffect } from 'react';
import { deleteRecipe, fetchUserRecipes } from './recipesThunk.ts';
import RecipeItem from './components/RecipeItem.tsx';
import { selectUser } from '../users/usersSlice.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const UserRecipes = () => {
    const { userId } = useParams() as { userId: string };
    const dispatch = useAppDispatch();
    const userRecipes = useAppSelector(selectUserRecipes);
    const currentUser = useAppSelector(selectUser);
    const userRecipesFetching = useAppSelector(selectUserRecipesFetching);
    const deleteLoading = useAppSelector(selectDeleteLoading);

    useEffect(() => {
        dispatch(fetchUserRecipes(userId));
    }, [dispatch, userId]);

    const isOwner = currentUser && currentUser._id === userId;
    const authorName = userRecipes.length > 0 ? userRecipes[0].user.displayName : 'Пользователь';

    const handleDelete = async (id: string) => {
        if (window.confirm('Вы уверены, что хотите удалить этот рецепт?')) {
            try {
                await dispatch(deleteRecipe(id)).unwrap();
                await dispatch(fetchUserRecipes(userId));
                toast.success('Рецепт удалён');
            } catch (error) {
                console.error(error);
                toast.error('Ошибка при удалении');
            }
        }
    };

    let content: ReactNode = (
        <Alert severity="info" sx={{ width: '100%' }}>
            {isOwner ? 'У вас пока нет рецептов. Добавьте рецепт!' : 'У этого пользователя пока нет рецептов.'}
        </Alert>
    );

    if (userRecipesFetching) {
        content = <CircularProgress />;
    } else if (userRecipes.length > 0) {
        content = userRecipes.map((recipe) => (
            <Grid key={recipe._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <RecipeItem
                    id={recipe._id}
                    title={recipe.title}
                    image={recipe.image}
                    userName={recipe.user.displayName}
                    userId={recipe.user._id}
                />
                {isOwner && (
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(recipe._id)}
                        disabled={deleteLoading === recipe._id}
                        sx={{ mt: 1, width: '100%' }}
                    >
                        Удалить
                    </Button>
                )}
            </Grid>
        ));
    }

    return (
        <Grid container spacing={3}>
            <Grid size={12} container justifyContent="space-between" alignItems="center">
                <Typography variant="h4">{authorName} - Рецепты</Typography>
                {isOwner && (
                    <Button color="primary" variant="contained" component={Link} to="/recipes/new">
                        Добавить новый рецепт
                    </Button>
                )}
            </Grid>
            <Grid container spacing={3} size={12}>
                {content}
            </Grid>
        </Grid>
    );
};

export default UserRecipes;