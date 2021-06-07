import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#ffffff",
    flexWrap: "wrap",
    alignItems: "center",
    flexFlow: "column",
    height: "100vh",
    "& .MuiTypography-body1": {
      fontSize: "14px !important",
    },
  },
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    border: "1px solid #0288D1",
    padding: "72px 72px 72px 72px",
    borderRadius: "32px",
    width: "480px",
    height: "454px",
    backgroundColor: "#ffffff",
    background: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& .MuiTypography-h6": {
      fontSize: "36px ",
      fontWeight: "500 ",
      textAlign: "center",
      marginBottom: "32px",
    },
  },

  inputField: {
    maxWidth: "360px",
    width: "100%",
    margin: "12px auto",
  },
  buttonPrimaryContained: {
    borderRadius: "12px ",
    maxWidth: "360px",
    width: "100%",
    height: "48px",
    margin: "0 auto",
    "&:focus": {
      outline: "none",
    },
    "& .MuiButton-label": {
      textTransform: "capitalize !important",
      fontSize: "20px",
    },
  },

  loginForm: {
    display: "block",
  },
  errorTypo: {
    color: "red",
    fontSize: "4px !important",
  },
}));
