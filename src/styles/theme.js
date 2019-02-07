import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: '#fff',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        justifySelf: 'center',
        padding: '13px 30px',
        borderColor: colors.primary,
      },
      containedPrimary: {
        fontWeight: 'bold',
        border: `2px solid ${colors.primary}`,
        '&$disabled': {
          border: 'none',
        },
      },
      outlinedPrimary: {
        fontWeight: 'bold',
        border: `2px solid ${colors.primary}`,
        '&:hover': {
          border: `2px solid ${colors.primary}`,
        },
        '&$disabled': {
          border: 'none',
        },
      },
    },
  },
});

export default theme;
