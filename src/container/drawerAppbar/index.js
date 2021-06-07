import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircleTwoTone";
import { useStyles } from "./styles";
import CustomList from "./menu";
import DashboardTwoToneIcon from "@material-ui/icons/DashboardTwoTone";
import PersonTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import StorageTwoToneIcon from "@material-ui/icons/StorageTwoTone";
import ListAltTwoToneIcon from "@material-ui/icons/ListAltTwoTone";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
// import { useHistory } from "react-router-dom";
import DashBorad from "../dashBorad";
import User from "../userManagement";
export default function MiniDrawer({ menu, page }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [selectMenu, setMenu] = React.useState(menu);
  // const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeMenu = (callBack) => {
    setMenu(callBack);
   
  if(callBack==="Member Management"){
    window.location.href = '/userManagement';  
  }
  if(callBack==="Dashboard"){
    window.location.href = '/dashBorad';  

  }
    // history.push({
    //   pathname: "/",
    //   search: "?query=abc",
    // });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{selectMenu}</Typography>

          <div className={classes.accountIcon}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              className={classes.account}
            >
              <Typography variant="body1" noWrap>
                Admin account{" "}
              </Typography>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <CloseRoundedIcon style={{ fontSize: "24px" }} color="primary" />
          </IconButton>
        </div>
        <div className={classes.list}>
          <CustomList
            selectMenu={selectMenu}
            changeMenu={changeMenu}
            label={"Dashboard"}
            icon={<DashboardTwoToneIcon color="primary" />}
          />
          <CustomList
            label={"Member Management"}
            selectMenu={selectMenu}
            changeMenu={changeMenu}
            icon={<PersonTwoToneIcon color="primary" />}
          />
          <CustomList
            label={"Transaction Log"}
            selectMenu={selectMenu}
            changeMenu={changeMenu}
            icon={<ListAltTwoToneIcon color="primary" />}
          />
          <CustomList
            label={"History"}
            selectMenu={selectMenu}
            changeMenu={changeMenu}
            icon={<StorageTwoToneIcon color="primary" />}
          />
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {page === "DashBorad" ? (
          <DashBorad />
        ) : page === "UserManagement" ? (
          <User />
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
