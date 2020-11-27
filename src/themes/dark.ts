import { createMuiTheme } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ec625f",
    },
    secondary: blue,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: theme.palette.primary.main,
    },
    secondary: {
      main: theme.palette.secondary.main,
    },
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: theme.palette.primary.dark,
    },
    secondary: {
      main: theme.palette.secondary.dark,
    },
  },
});
