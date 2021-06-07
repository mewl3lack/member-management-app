import React from "react";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { useStyles } from "./styles";
import MuiListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";

const ListItem = withStyles({
  root: {
    "&:hover ,&$selected": {
      backgroundColor: "#F0F7FF",
      borderRadius: "12px",
      "& .MuiTypography-body1": {
        color: "#197BBD",
      },
      "& .MuiSvgIcon-root": {
        color: "#197BBD",
      },
    },
    "&$selected": {
      marginLeft: "4px",

      borderLeft: "1px solid #E4E4E4",
    },
  },
  selected: {},
})(MuiListItem);

export default function MiniDrawer({
  changeMenu,
  selectMenu,
  icon,
  label,
  onChangePage,
}) {
  const classes = useStyles();

  return (
    <div className={"listMenu"}>
      <CssBaseline />
      <List onClick={(e) => changeMenu(label)}>
        <ListItem button key={label} selected={selectMenu === label}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      </List>{" "}
    </div>
  );
}
