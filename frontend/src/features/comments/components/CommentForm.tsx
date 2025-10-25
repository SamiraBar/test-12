import { type ChangeEvent, type FormEvent, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface Props {
    onSubmit: (text: string) => void;
    loading: boolean;
}

const CommentForm = ({ onSubmit, loading }: Props) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onSubmit(text);
            setText('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <TextField
                fullWidth
                multiline
                rows={3}
                label="Добавить комментарий"
                value={text}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                disabled={loading}
                required
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={loading || !text.trim()}
            >
                Отправить
            </Button>
        </Box>
    );
};

export default CommentForm;