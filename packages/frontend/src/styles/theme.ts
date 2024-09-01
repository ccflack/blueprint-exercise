import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
  },
  components: {
  },
  typography: {
    fontFamily: [
      // 'Roboto',
      // 'sans-serif',
      'Inter',
      'system-ui',
      'Avenir',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme;