import { createMuiTheme } from "@material-ui/core/styles";

const font_family = ["Prompt", "sans-serif"].join(",");
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
export default createMuiTheme({
  typography: {
    fontFamily: font_family,
    h4: {
      fontSize: "36px",
      lineHeight: "34px",
      fontWeight: "500",
      letterSpacing: "0.3px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
      },
    },
    h5: {
      fontSize: "28px",
      lineHeight: "26px",
      fontWeight: "500",
      letterSpacing: "0.3px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
      },
    },
    h6: {
      fontSize: "24px",
      fontWeight: "500",
      lineHeight: "26px",
      letterSpacing: "0",
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
        lineHeight: "20px",
      },
    },
    body1: {
      fontSize: "24px",
      lineHeight: "normal",
      letterSpacing: "0",
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
    },
    body2: {
      fontSize: "16px",
      lineHeight: "normal",
      letterSpacing: "0",
    },
  },
  palette: {
    primary: {
      main: "#0288D1",
    },
    secondary: {
      main: "#AFAFAF",
    },
    error: {
      main: "#E30031",
    },
    inherit: {
      main: "#E30031",
    },
    warning: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
      contrastText: "#ffffff",
    },
    info: {
      light: "#ffffff",
      main: "#d1d1d1",
      dark: "#388e3c",
      contrastText: "#1D1D1B",
    },
    success: {
      light: "#23C19A",
      main: "#23C19A",
      dark: "#23C19A",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#1D1D1B",
      secondary: "#777776",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    red: {
      main: "#ff0000",
    },
    divider: "rgba(0,0,0,0.12)",
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 1124,
      lg: 1280,
      xl: 1440,
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        "& input, & label": {
          fontSize: "16px",
        },
        "& label": {
          transform: "translate(14px, 16px) scale(1)",
        },
        "& input": {
          "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
            {
              "-webkit-box-shadow": "0 0 0 30px #FFFFFF inset",
            },
        },
      },
    },
    MuiFormControl: {
      root: {
        "& label": {
          fontSize: "16px",
          transform: "translate(14px, 16px) scale(1)",
        },
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: "12px",
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "8px",
      },
    },
    MuiInputAdornment: {
      positionEnd: {
        "& svg": {
          color: "#777776",
          fontSize: "20px",
        },
      },
    },
    MuiCheckbox: {
      root: {
        "& svg": {
          fontSize: "24px",
        },
        margin: "8px 0px",
      },
    },
    MuiChip: {
      sizeSmall: {
        height: "20px",
        margin: "0px 4px",
      },
    },
    MuiButtonBase: {
      root: {
        outline: "none",
        "&:focus": {
          outline: "none",
        },
        contained: {
          "&:hover": {
            boxShadow: "none",
          },
          "&:focus": {
            outline: "none",
          },
          "&:active": {
            boxShadow: "none",
            outline: "none",
          },
        },
      },
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
  root: {
    width: "100%",
    minHeight: "100vh",
    padding: "64px 32px",
    alignItems: "center",
  },
});
