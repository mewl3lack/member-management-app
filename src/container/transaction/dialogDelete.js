import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './styles'
import { Typography } from '@material-ui/core'

export default function DialogDelete(props) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Dialog
        maxWidth={'md'}
        open={props.open}
        // onClose={props.onCloseDialog}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Confirm delete transaction
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2" style={{ fontSize: '16px' }}>
              Are you sure you want to approve this transaction
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
              onClick={props.onCloseDialog}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disableElevation
              onClick={(e) => props.deleteMember(props.id)}
            >
              Confirm
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
