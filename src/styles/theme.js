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
  },
  overrides: {
    MuiButton: {
      root: {
        justifySelf: 'center',
        padding: '13px 30px',
        borderColor: colors.primary,
      },
      disabled: {
        border: 'none',
      },
      containedPrimary: {
        fontWeight: 'bold',
        border: `2px solid ${colors.primary}`,
        '&:hover': {
          backgroundColor: 'rgba(21, 16, 87, 0.85)',
        },
      },
      outlinedPrimary: {
        fontWeight: 'bold',
        border: `2px solid ${colors.primary}`,
        '&:hover': {
          border: `2px solid ${colors.primary}`,
        },
      },
    },
  },
});

export default theme;
