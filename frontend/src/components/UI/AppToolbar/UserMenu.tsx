import type { User } from '../../../types';
import { type FC, useState, type MouseEvent } from 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logout } from '../../../features/users/usersThunk.ts';
import { API_URL } from '../../../constants.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
    user: User;
}

const UserMenu: FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        handleClose();
        toast.info('Вы вышли из системы');
        navigate('/');
    };

    const handleMyRecipes = () => {
        handleClose();
        navigate(`/users/${user._id}`);
    };

    const handleAddRecipe = () => {
        handleClose();
        navigate('/recipes/new');
    };

    const avatarUrl = user.avatar ? `${API_URL}/${user.avatar}` : undefined;

    return (
        <>
            <Button onClick={handleClick} color="inherit" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar src={avatarUrl} alt={user.displayName} sx={{ width: 32, height: 32 }} />
                {user.displayName}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleMyRecipes}>Мои рецепты</MenuItem>
                <MenuItem onClick={handleAddRecipe}>Добавить рецепт</MenuItem>
                <MenuItem onClick={handleLogout}>Выход</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;