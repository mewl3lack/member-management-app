import { makeStyles } from "@material-ui/core/styles";
import customTheme from "../../style/theme";

const drawerWidth = 300;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "& .MuiTypography-h6": {
      textTransform: "capitalize !important",
      fontSize: "24px",
      fontWeight: "400",
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  list: {
    margin: "20px 14px 0 2px",
    "& .MuiTypography-body1": {
      fontSize: "16px !important",
      fontWeight: 500,
      color: "#898989",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "28px !important",
      color: "#E7E7E7",
    },
    "& .MuiListItem-root": {
      height: "64px",
    },
  },

  accountIcon: {
    position: "absolute",
    right: "0",
    display: "flex",
    fontWeight: "500 !important",
    marginRight: "12px",
    color: "#ffffff",
    "& .MuiSvgIcon-root": {
      fontSize: "32px !important",
    },
    "& .MuiTypography-body1": {
      fontSize: "14px !important",
      textAlign: "end",
      marginRight: "12px",
    },
  },
}));
