import { createTheme } from '@mui/material/styles';
import { withComponentOverrides } from './components';

export const theme = withComponentOverrides(
  createTheme({
    palette: {
      text: {
        primary: '#605E67',
        secondary: '#08031C',
      },
      primary: {
        main: '#605E67',
        dark: '#333333',
      },
      secondary: {
        main: '#08031C',
      },
    },
    typography: {
      h5: {
        fontWeight: 900,
        fontSize: 26,
        letterSpacing: 0.5,
      },
      h6: {
        fontWeight: 900,
      },
      fontFamily: ['GlacialIndifference-Bold'].join(','),
    },
    shape: {
      borderRadius: 8,
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  }),
);
