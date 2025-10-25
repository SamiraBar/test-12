import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError, selectLoginLoading } from './usersSlice.ts';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import type { LoginMutation } from '../../types';
import { googleLogin, login } from './usersThunk.ts';
import { Alert, Avatar, Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoginLoading);
    const error = useAppSelector(selectLoginError);
    const navigate = useNavigate();

    const [state, setState] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitFormHandler = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(login(state)).unwrap();
            toast.success('Вход выполнен успешно!');
            navigate('/');
        } catch (e) {
            console.error(e);
            toast.error('Неверные данные');
        }
    };

    const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            await dispatch(googleLogin(credentialResponse.credential)).unwrap();
            toast.success('Вход через Google выполнен!');
            navigate('/');
        }
    };

    return (
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Вход
            </Typography>
            {error && (
                <Alert severity={'error'} sx={{ mt: 3 }}>
                    {error.error}
                </Alert>
            )}
            <Box sx={{ pt: 2 }}>
                <GoogleLogin onSuccess={googleLoginHandler} onError={() => toast.error('Ошибка Google входа')} />
            </Box>
            <Box
                component="form"
                noValidate
                onSubmit={submitFormHandler}
                sx={{ my: 3, maxWidth: '400px', width: '100%' }}
            >
                <Stack spacing={2}>
                    <TextField
                        required
                        label="Имя пользователя"
                        name="username"
                        value={state.username}
                        onChange={inputChangeHandler}
                        autoComplete="current-username"
                    />
                    <TextField
                        type="password"
                        required
                        label="Пароль"
                        name="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        autoComplete="current-password"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }} disabled={loading}>
                        Войти
                    </Button>
                </Stack>
            </Box>
            <Link component={RouterLink} to="/register">
                Нет аккаунта? Зарегистрироваться
            </Link>
        </Box>
    );
};

export default Login;