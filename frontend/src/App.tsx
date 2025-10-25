import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import Recipes from './features/recipes/Recipes.tsx';
import UserRecipes from "./features/recipes/UserRecipes.tsx";
import {selectUser} from "./features/users/usersSlice.ts";
import {useAppSelector} from "./app/hooks.ts";
import ProtectedRoute from "./components/UI/ProtectedRoute/ProtectedRoute.tsx";
import NewRecipe from "./features/recipes/NewRecipe.tsx";

const App = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <Container maxWidth="xl" component="main" sx={{ mt: 4 }}>
                <Routes>
                    <Route path="/" element={<Recipes />} />
                    <Route path="/users/:userId" element={<UserRecipes />} />
                    <Route
                        path="/recipes/new"
                        element={
                            <ProtectedRoute isAllowed={Boolean(user)}>
                                <NewRecipe />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Typography variant="h4">Страница не найдена</Typography>} />
                </Routes>
            </Container>
        </>
    );
};

export default App;
