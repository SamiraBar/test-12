import { Card, CardContent, CardMedia, Typography, styled, Box } from '@mui/material';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../constants.ts';

interface Props {
    id: string;
    title: string;
    image: string;
    userName: string;
    userId: string;
}

const RecipeItem: FC<Props> = ({ id, title, image, userName, userId }) => {
    const ImageCardMedia = styled(CardMedia)({
        height: 0,
        paddingTop: '75%',
        cursor: 'pointer',
    });

    const cardImage = `${API_URL}/${image}`;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Link to={`/recipes/${id}`} style={{ textDecoration: 'none' }}>
                <ImageCardMedia image={cardImage} title={title} />
            </Link>
            <CardContent sx={{ flexGrow: 1 }}>
                <Link to={`/recipes/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="h6" gutterBottom sx={{ '&:hover': { color: 'primary.main' } }}>
                        {title}
                    </Typography>
                </Link>
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Автор:{' '}
                        <Link
                            to={`/users/${userId}`}
                            style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}
                        >
              <span style={{ color: '#6d4c41', cursor: 'pointer' }}>
                {userName}
              </span>
                        </Link>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RecipeItem;