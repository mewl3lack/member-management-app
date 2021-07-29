import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { useStyles } from './styles'
import TransactionPage from '../transaction/index'

export default function DialogTransaction(props) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Dialog
        maxWidth={'lg'}
        open={props.open}
        onClose={props.onCloseDialog}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <TransactionPage uuid={props.uuid} />
        </DialogContent>
      </Dialog>{' '}
    </React.Fragment>
  )
}
