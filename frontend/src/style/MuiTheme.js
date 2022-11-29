import { createTheme, ThemeProvider } from '@mui/material/styles';

export const MuiTheme = createTheme({
    palette: {
        black: {
            main: '#212121',
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'SCoreDream',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});