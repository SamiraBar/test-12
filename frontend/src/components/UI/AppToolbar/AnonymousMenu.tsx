import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
    return (
        <>
            <Button component={NavLink} to={'/register'} sx={{color: 'secondary.main'}}>
                Регистрация
            </Button>
            <Button component={NavLink} to={'/login'} sx={{color: 'secondary.main'}}>
                Вход
            </Button>
        </>
    );
};

export default AnonymousMenu;