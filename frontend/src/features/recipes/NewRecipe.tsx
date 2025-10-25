import { Typography } from '@mui/material';
import RecipeForm from './components/RecipeForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import type { RecipeMutation } from '../../types';
import { createRecipe } from './recipesThunk.ts';
import { selectCreateLoading } from './recipesSlice.ts';
import { toast } from 'react-toastify';
import { selectUser } from '../users/usersSlice.ts';

const NewRecipe = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const recipeCreating = useAppSelector(selectCreateLoading);

    const onFormSubmit = async (recipe: RecipeMutation) => {
        try {
            await dispatch(createRecipe(recipe)).unwrap();
            toast.success('Рецепт успешно создан!');
            if (user) {
                navigate(`/users/${user._id}`);
            }
        } catch (e) {
            console.error(e);
            toast.error('Ошибка при создании рецепта');
        }
    };

    return (
        <>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Добавить новый рецепт
            </Typography>
            <RecipeForm onSubmit={onFormSubmit} loading={recipeCreating} />
        </>
    );
};

export default NewRecipe;