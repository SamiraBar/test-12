import { Box, Avatar, Typography, IconButton, Card, CardContent } from '@mui/material';
import type { FC } from 'react';
import { API_URL } from '../../../constants.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Props {
    commentId: string;
    userName: string;
    userAvatar: string | null;
    text: string;
    createdAt: string;
    canDelete: boolean;
    onDelete: (id: string) => void;
    deleteLoading: boolean;
}

const CommentItem: FC<Props> = ({
    commentId,
    userName,
    userAvatar,
    text,
    createdAt,
    canDelete,
    onDelete,
    deleteLoading
}) => {
    const avatarUrl = userAvatar ? `${API_URL}/${userAvatar}` : undefined;
    const timeAgo = formatDistance(new Date(createdAt), new Date(), { addSuffix: true, locale: ru });

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar src={avatarUrl} alt={userName} />
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                {userName}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                    {timeAgo}
                                </Typography>
                                {canDelete && (
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(commentId)}
                                        disabled={deleteLoading}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                        <Typography variant="body2">{text}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CommentItem;