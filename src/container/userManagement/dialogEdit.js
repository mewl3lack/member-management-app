import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";
import EditUser from "./createForm";
import SkeletonForm from "./createFormSkeleton";
export default function DialogDelete(props) {
  const classes = useStyles();
  const [data, setData] = React.useState({
    tel: "",
    bank: "",
    bankAccount: "",
    firstname: "",
    surname: "",
    pin: "",
    about: "",
    line: "",
  });

  const handleChange = (e, value, type) => {
    setData((prev) => ({
      ...prev,
      [type === "source" ? "about" : type === "bank" ? "bank" : e.target.name]:
        type === "source" || type === "bank" ? value : e.target.value,
    }));
  };

  return (
    <React.Fragment>
      <Dialog
        maxWidth={"md"}
        open={props.open}
        onClose={props.onCloseDialog}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          <Typography component="div" variant={"body1"} color={"primary"}>
            Edit user ID : {props.id}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <SkeletonForm /> */}
          <EditUser
            data={data}
            // checkValidate={checkValidate}
            handleChange={handleChange}
            setCreateStatus={props.onCloseDialog}
            createMember={props.onCloseDialog}
            optionSource={props.optionSource}
            optionBank={props.optionBank}
          />{" "}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
