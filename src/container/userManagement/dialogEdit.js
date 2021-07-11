import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './styles'
import { Typography } from '@material-ui/core'
import EditUser from './createForm'
import SkeletonForm from './createFormSkeleton'
import AlertSnackBar from '../../component/snackBarAlert'

export default function DialogDelete(props) {
  const classes = useStyles()
  const [editData, setData] = React.useState({
    tel: '',
    bank: '',
    bankAccount: '',
    firstname: '',
    surname: '',
    pin: '',
    about: '',
    line: '',
    id: '',
  })
  const [snackBar, setSnackBar] = React.useState({
    string: '',
    severity: '',
  })
  const [checkError, setError] = React.useState(false)
  const [checkValidate, setCheckValidate] = React.useState(false)

  React.useEffect(() => {
    getUssoerById(props.id)
  }, [props.id])

  const getUssoerById = (id) => {
    setCheckValidate()
    clearState()
    var axios = require('axios')
    var config = {
      method: 'get',
      url:
        'http://ec2-18-117-124-197.us-east-2.compute.amazonaws.com/api/member/getList',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
      params: { query: `{"id":"${id}"}` },
    }

    axios(config)
      .then(function (response) {
        if (response !== [] && response.data.result[0] !== undefined) {
          if (response.data.result[0].social_source !== undefined) {
            var value =
              response.data.result[0].social_source === 'FB'
                ? 'Facebook'
                : response.data.result[0].social_source === 'TW'
                ? 'Twitter'
                : response.data.result[0].social_source === 'YT'
                ? 'Youtube'
                : response.data.result[0].social_source === 'IG'
                ? 'Instagram'
                : response.data.result[0].social_source === 'OTHER'
                ? 'other'
                : response.data.result[0].social_source
          }
          setData({
            tel:
              response.data.result[0].tel_no === undefined
                ? ''
                : response.data.result[0].tel_no,
            bank: {
              title:
                response.data.result[0].bank_acc_vendor === undefined
                  ? ''
                  : response.data.result[0].bank_acc_vendor,
              value: 'FB',
            },
            bankAccount:
              response.data.result[0].bank_acc_no === undefined
                ? ''
                : response.data.result[0].bank_acc_no,
            firstname:
              response.data.result[0].first_name === undefined
                ? ''
                : response.data.result[0].first_name,
            surname:
              response.data.result[0].last_name === undefined
                ? ''
                : response.data.result[0].last_name,
            pin:
              response.data.result[0].pin === undefined
                ? ''
                : response.data.result[0].pin,
            about: {
              title:
                response.data.result[0].social_source === undefined
                  ? ''
                  : value,
              value: 'FB',
            },
            line:
              response.data.result[0].line_id === undefined
                ? ''
                : response.data.result[0].line_id,
            id: response.data.result[0]._id,
          })
        }
      })
      .catch(function (error) {
        debugger
        if (JSON.stringify(error).includes('403')) {
          setError(true)
          setSnackBar({
            severity: 'error',
            string: `token expire`,
          })
          window.location.href = '/'
        } else {
          setError(true)
          setSnackBar({
            severity: 'error',
            string: 'can not get member by id',
          })
        }
      })
  }
  const clearState = () => {
    setData({
      tel: '',
      bank: '',
      bankAccount: '',
      firstname: '',
      surname: '',
      pin: '',
      about: '',
      line: '',
      id: '',
    })
  }

  const handleChange = (e, value, type) => {
    setData((prev) => ({
      ...prev,
      [type === 'source' ? 'about' : type === 'bank' ? 'bank' : e.target.name]:
        type === 'source' || type === 'bank' ? value : e.target.value,
    }))
  }

  const onSubmit = () => {
    if (
      editData.bank === '' ||
      editData.bankAccount === '' ||
      editData.firstname === '' ||
      editData.surname === '' ||
      editData.pin === '' ||
      editData.about === '' ||
      editData.line === ''
    ) {
      setCheckValidate(true)
    } else {
      setCheckValidate(false)
      updateMember()
    }
  }
  const updateMember = () => {
    var axios = require('axios')
    var qs = require('qs')
    var data = qs.stringify({
      first_name: editData.firstname,
      last_name: editData.surname,
      bank_acc_vendor: editData.bank.title,
      bank_acc_no: editData.bankAccount,
      social_source: editData.about.title,
      pin: editData.pin,
      line_id: editData.line,
      id: editData.id,
    })
    var config = {
      method: 'put',
      url:
        'http://ec2-18-117-124-197.us-east-2.compute.amazonaws.com/api/member/updateMember',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    }
    axios(config)
      .then(function (response) {
        setError(true)
        setSnackBar({
          severity: 'success',
          string: 'Create success',
        })
        props.onCloseDialog()
        props.getDataFromAPI()
      })
      .catch(function (error) {
        setError(true)
        setSnackBar({
          severity: 'error',
          string: `can not update member id : ${editData.id}`,
        })
      })
  }

  return (
    <React.Fragment>
      {' '}
      <AlertSnackBar
        status={checkError}
        setError={setError}
        snackCustom={snackBar}
      />
      <Dialog
        maxWidth={'md'}
        open={props.open}
        onClose={props.onCloseDialog}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle>
          <Typography variant={'body1'} color={'primary'}>
            Edit user ID : {props.id}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {editData.id === '' ? (
            <SkeletonForm />
          ) : (
            <EditUser
              data={editData}
              checkValidate={checkValidate}
              handleChange={handleChange}
              setCreateStatus={props.onCloseDialog}
              createMember={onSubmit}
              optionSource={props.optionSource}
              optionBank={props.optionBank}
              type={'edit'}
            />
          )}
        </DialogContent>
      </Dialog>{' '}
    </React.Fragment>
  )
}
