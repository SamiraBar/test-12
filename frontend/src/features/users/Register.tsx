import { type ChangeEvent, type FormEvent, useState } from 'react';
import type { RegisterMutation } from '../../types';
import { Avatar, Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError, selectRegisterLoading } from './usersSlice.ts';
import { register } from './usersThunk.ts';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';
import { toast } from 'react-toastify';

const Register = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectRegisterLoading);
    const error = useAppSelector(selectRegisterError);
    const navigate = useNavigate();

    const [state, setState] = useState<RegisterMutation>({
        username: '',
        password: '',
        displayName: '',
        avatar: null,
    });

    const getFieldError = (fieldName: string) => {
        return error?.errors[fieldName]?.message;
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const fileInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setState((prevState) => ({ ...prevState, [name]: files[0] }));
        }
    };

    const submitFormHandler = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(register(state)).unwrap();
            toast.success('Регистрация успешна!');
            navigate('/');
        } catch (e) {
            toast.error('Ошибка регистрации');
        }
    };

    return (
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Регистрация
            </Typography>
            <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ my: 3, maxWidth: '400px', width: '100%' }}>
                <Stack spacing={2}>
                    <TextField
                        required
                        label="Имя пользователя"
                        name="username"
                        value={state.username}
                        onChange={inputChangeHandler}
                        autoComplete="new-username"
                        error={Boolean(getFieldError('username'))}
                        helperText={getFieldError('username')}
                    />
                    <TextField
                        required
                        label="Отображаемое имя"
                        name="displayName"
                        value={state.displayName}
                        onChange={inputChangeHandler}
                        error={Boolean(getFieldError('displayName'))}
                        helperText={getFieldError('displayName')}
                    />
                    <TextField
                        type="password"
                        required
                        label="Пароль"
                        name="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        autoComplete="new-password"
                        error={Boolean(getFieldError('password'))}
                        helperText={getFieldError('password')}
                    />
                    <FileInput label="Аватар" name="avatar" onChange={fileInputChangeHandler} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }} disabled={loading}>
                        Зарегистрироваться
                    </Button>
                </Stack>
            </Box>
            <Link component={RouterLink} to="/login">
                Уже есть аккаунт? Войти
            </Link>
        </Box>
    );
};

export default Register;