import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6d4c41',
            light: '#9c786c',
            dark: '#40241a',
        },
        secondary: {
            main: '#80cbc4',
            light: '#b2dfdb',
            dark: '#4f9a94',
        },
        background: {
            default: '#f5f5f0',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'rgba(62,39,35,0.85)',
                    padding: 10,
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#80cbc4',
                    color: '#3e2723',
                    border: '2px solid #ffffff',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: '10px 24px',
                    margin: '0 5px',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(109, 76, 65, 0.2)',
                        transform: 'translateY(-2px)',
                        backgroundColor: 'rgba(62,39,35,0.32)',
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#6d4c41',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                    '&:hover': {
                        color: '#80cbc4',
                    },
                },
            },
        },
    },
});

export default theme;