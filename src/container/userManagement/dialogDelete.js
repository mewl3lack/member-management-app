import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";

export default function MaxWidthDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Confirm delete user{" "}
      </Button>
      <Dialog
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          {" "}
          Confirm delete user{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2" style={{ fontSize: "16px" }}>
              Are you sure you want to delete{" "}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "16px" }}>
              user id : {"xxxxxxxxxx "} ?{" "}
            </Typography>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            className={`${classes.buttonGroup}  ${classes.buttonGroupDialog}`}
          >
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              disableElevation
              size="large"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disableElevation
            >
              Confirm
            </Button>{" "}
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
