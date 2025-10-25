import type { RecipeMutation } from '../../../types';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { Stack, TextField, Button, Alert } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';

interface Props {
    onSubmit: (recipe: RecipeMutation) => void;
    loading: boolean;
}

const RecipeForm = ({ onSubmit, loading }: Props) => {
    const [state, setState] = useState<RecipeMutation>({
        title: '',
        recipe: '',
        image: null,
    });

    const [errors, setErrors] = useState({
        title: false,
        recipe: false,
        image: false,
    });

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    };

    const fileInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setState((prevState) => ({ ...prevState, [name]: files[0] }));
            setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
        }
    };

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            title: !state.title.trim(),
            recipe: !state.recipe.trim(),
            image: !state.image,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        onSubmit(state);
    };

    const hasErrors = Object.values(errors).some((error) => error);

    return (
        <Stack spacing={2} component="form" onSubmit={submitFormHandler}>
            {hasErrors && (
                <Alert severity="error">
                    Пожалуйста, заполните все обязательные поля и выберите изображение
                </Alert>
            )}

            <TextField
                id="title"
                label="Название рецепта"
                name="title"
                value={state.title}
                onChange={inputChangeHandler}
                required
                error={errors.title}
                helperText={errors.title ? 'Введите название рецепта' : ''}
            />

            <TextField
                required
                multiline
                minRows={5}
                id="recipe"
                label="Рецепт"
                name="recipe"
                value={state.recipe}
                onChange={inputChangeHandler}
                error={errors.recipe}
                helperText={errors.recipe ? 'Введите текст рецепта' : ''}
            />

            <FileInput label="Изображение" name="image" onChange={fileInputChangeHandler} />
            {errors.image && (
                <Alert severity="error">
                    Выберите изображение для рецепта
                </Alert>
            )}

            <Button type="submit" color="primary" variant="contained" disabled={loading}>
                Создать рецепт
            </Button>
        </Stack>
    );
};

export default RecipeForm;