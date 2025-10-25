import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchOneRecipe } from './recipesThunk.ts';
import { Link, useParams } from 'react-router-dom';
import { selectOneRecipe, selectOneRecipeFetching } from './recipesSlice.ts';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Stack,
    Typography,
    Box,
    Divider,
} from '@mui/material';
import { API_URL } from '../../constants.ts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { selectUser } from '../users/usersSlice.ts';
import {
    selectComments,
    selectCommentsFetching,
    selectCreateCommentLoading,
    selectDeleteCommentLoading
} from '../comments/commentsSlice.ts';
import { createComment, deleteComment, fetchComments } from '../comments/commentsThunk.ts';
import CommentItem from '../comments/components/CommentItem.tsx';
import CommentForm from '../comments/components/CommentForm.tsx';
import { toast } from 'react-toastify';

const OneRecipe = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const recipe = useAppSelector(selectOneRecipe);
    const user = useAppSelector(selectUser);
    const isFetching = useAppSelector(selectOneRecipeFetching);
    const comments = useAppSelector(selectComments);
    const commentsFetching = useAppSelector(selectCommentsFetching);
    const createCommentLoading = useAppSelector(selectCreateCommentLoading);
    const deleteCommentLoading = useAppSelector(selectDeleteCommentLoading);

    useEffect(() => {
        dispatch(fetchOneRecipe(id));
        dispatch(fetchComments(id));
    }, [dispatch, id]);

    const handleCommentSubmit = async (text: string) => {
        try {
            await dispatch(createComment({ recipe: id, text })).unwrap();
            toast.success('Комментарий добавлен');
        } catch (e) {
            console.error(e);
            toast.error('Ошибка при добавлении комментария');
        }
    };

    const handleCommentDelete = async (commentId: string) => {
        if (window.confirm('Удалить комментарий?')) {
            try {
                await dispatch(deleteComment(commentId)).unwrap();
                toast.success('Комментарий удалён');
            } catch (e) {
                console.error(e);
                toast.error('Ошибка при удалении комментария');
            }
        }
    };

    if (isFetching) {
        return <CircularProgress />;
    }

    if (!recipe) {
        return <Typography>Рецепт не найден</Typography>;
    }

    const cardImage = `${API_URL}/${recipe.image}`;
    const isRecipeAuthor = user && user._id === recipe.user._id;

    return (
        <Stack spacing={3} alignItems="start">
            <Button variant="text" component={Link} to={'/'} startIcon={<ArrowBackIcon />}>
                Назад к рецептам
            </Button>

            <Card sx={{ maxWidth: 800, width: '100%' }}>
                <CardMedia sx={{ height: 400 }} image={cardImage} title={recipe.title} />
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h4">{recipe.title}</Typography>

                        <Typography variant="body2" color="text.secondary">
                            Автор:{' '}
                            <Link to={`/users/${recipe.user._id}`} style={{ textDecoration: 'none', color: '#6d4c41', fontWeight: 500 }}>
                                {recipe.user.displayName}
                            </Link>
                        </Typography>

                        <Divider />

                        <Typography variant="h6">Рецепт:</Typography>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                            {recipe.recipe}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>

            <Box sx={{ width: '100%', maxWidth: 800 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Комментарии ({comments.length})
                </Typography>

                {user && (
                    <CommentForm onSubmit={handleCommentSubmit} loading={createCommentLoading} />
                )}

                {!user && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        <Link to="/login" style={{ color: '#6d4c41' }}>Войдите</Link>, чтобы оставить комментарий
                    </Typography>
                )}

                {commentsFetching ? (
                    <CircularProgress />
                ) : comments.length === 0 ? (
                    <Typography color="text.secondary">Комментариев пока нет.</Typography>
                ) : (
                    comments.map((comment) => {
                        const canDelete = user && (user._id === comment.user._id || isRecipeAuthor);
                        return (
                            <CommentItem
                                key={comment._id}
                                commentId={comment._id}
                                userName={comment.user.displayName}
                                userAvatar={comment.user.avatar}
                                text={comment.text}
                                createdAt={comment.createdAt}
                                canDelete={Boolean(canDelete)}
                                onDelete={handleCommentDelete}
                                deleteLoading={deleteCommentLoading === comment._id}
                            />
                        );
                    })
                )}
            </Box>
        </Stack>
    );
};

export default OneRecipe;