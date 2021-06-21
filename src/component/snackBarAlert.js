import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Typography } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function PositionedSnackbar({ setError, status, snackCustom }) {
  const handleClose = () => {
    setError(false);
  };

  return (
    <div>
      <Snackbar
        open={status}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        key={"top" + "right"}
      >
        <Alert
          onClose={handleClose}
          elevation={6}
          variant="filled"
          severity={snackCustom.severity}
        >
          <Typography variant="body2" style={{ fontSize: "18px" }}>
            {snackCustom.string}
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}
