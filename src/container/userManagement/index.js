import React from 'react'
import Grid from '@material-ui/core/Grid'
import CreateUser from './createForm'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import { useStyles } from './styles'
import DataTable from '../../component/dataTable'
import Button from '@material-ui/core/Button'
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone'
import axios from 'axios'
import qs from 'qs'
import Loader from '../../component/loaderBackdrop'
import AlertSnackBar from '../../component/snackBarAlert'
import { getskeletonUserList } from '../../function/getSkeleton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import DialogDelete from './dialogDelete'
import DialogEdit from './dialogEdit'
import { CreateIntervalCall } from './interval'
import _ from 'lodash'
import Collapse from '@material-ui/core/Collapse'
import MoneyOffIcon from '@material-ui/icons/MoneyOff'
export function StatusTemplate({ string }) {
  const classes = useStyles()
  return (
    <div className={classes.statusText}>
      <div
        className={
          string === 'Active'
            ? `${classes.circle} ${classes.circleActive}`
            : `${classes.circle} ${classes.circleDeleted}`
        }
      ></div>
      <Typography variant="body2" noWrap>
        {string}
      </Typography>
    </div>
  )
}
export default function User() {
  const classes = useStyles()
  const optionBank = [
    { title: 'SCB', value: 'SCB' },
    { title: 'BBL', value: 'BBL' },
    { title: 'KBANK', value: 'KBANK' },
    { title: 'UOB', value: 'UOB' },
    { title: 'BAY', value: 'BAY' },
    { title: 'KTB', value: 'KTB' },
    { title: 'TMB', value: 'TMB' },
    { title: 'TBANK', value: 'TBANK' },
    { title: 'CIMB', value: 'CIMB' },
    { title: 'LH', value: 'LH' },
  ]
  const optionSource = [
    { title: 'Facebook', value: 'FB' },
    { title: 'Twitter', value: 'TW' },
    { title: 'Youtube', value: 'YT' },
    { title: 'Instagram', value: 'IG' },
    { title: 'other', value: 'OTHER' },
  ]
  let rows = []
  let dataMain = {}
  let columns = [
    {
      label: 'Name',
      field: 'name',
      width: 150,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Name',
      },
    },
    {
      label: 'Tel.',
      field: 'tel',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Bank',
      field: 'Bank',
      width: 270,
    },
    {
      label: 'Bank account number',
      field: 'BankAccountNumber',
      width: 270,
    },
    {
      label: 'Create Date and time',
      field: 'date',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Status',
      field: 'Status',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Action',
      field: 'action',
      sort: 'asc',
      width: 100,
      sort: 'disabled',
    },
  ]

  const [datatable, setDatatable] = React.useState(
    <DataTable
      datatable={(dataMain = { columns, rows: getskeletonUserList() })}
      search={false}
      onFunction={sortCustom}
      type={'border'}
    />,
  )

  const [createStatus, setCreateStatus] = React.useState(false)
  const [data, setData] = React.useState({
    tel: '',
    bank: '',
    bankAccount: '',
    firstname: '',
    surname: '',
    pin: '',
    about: '',
    line: '',
  })
  const [checkValidate, setCheckValidate] = React.useState(false)
  const [loadingStatus, setLoader] = React.useState(false)
  const [checkError, setError] = React.useState(false)
  const [userId, setUserID] = React.useState('')
  const [statusDialog, setStatusDialog] = React.useState(false)
  const [statusEdit, setStatusEdit] = React.useState(false)
  const [snackBar, setSnackBar] = React.useState({
    string: '',
    severity: '',
  })

  const closeDialogEdit = () => {
    setStatusEdit(false)
  }
  const closeDialog = () => {
    setStatusDialog(false)
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
      data.tel === '' ||
      data.bank === '' ||
      data.bankAccount === '' ||
      data.firstname === '' ||
      data.surname === '' ||
      data.pin === '' ||
      data.about === '' ||
      data.line === ''
    ) {
      setCheckValidate(true)
    } else {
      setCheckValidate(false)
      createMember(
        data.tel,
        data.firstname,
        data.surname,
        data.bank.value,
        data.bankAccount,
        data.about.value,
        data.pin,
        data.line,
      )
    }
  }

  const createMember = (
    tel,
    firstname,
    lastname,
    bank,
    bankAccount,
    source,
    pin,
    line,
  ) => {
    setLoader(true)
    var data = qs.stringify({
      tel_no: tel,
      first_name: firstname,
      last_name: lastname,
      bank_acc_vendor: bank,
      bank_acc_no: bankAccount,
      social_source: source,
      pin: pin,
      line_id: line,
    })
    var config = {
      method: 'post',
      url:
        'http://ec2-18-117-124-197.us-east-2.compute.amazonaws.com/api/member/addMember',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        setLoader(false)
        if (response.data.status) {
          setCreateStatus(false)
          getDataFromAPI()
          setError(true)
          setSnackBar({
            severity: 'success',
            string: 'Create success',
          })
        }
      })
      .catch(function (error) {
        setLoader(false)
        setError(true)
        setSnackBar({
          severity: 'error',
          string: error.message.includes('500')
            ? 'Telephone no. exists.'
            : 'Can not create member ,please check your data',
        })
      })
  }

  React.useEffect(() => {
    getDataFromAPI()
  }, [])

  const getDataFromAPI = () => {
    var config = {
      method: 'get',
      url:
        'http://ec2-18-117-124-197.us-east-2.compute.amazonaws.com/api/member/getList',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
    axios(config)
      .then(function (response) {
        var res = _.orderBy(response.data.result, ['createAt'], ['desc'])
        getDataObject(res)
        setDatatable(
          <DataTable
            datatable={dataMain}
            search={false}
            onFunction={sortCustom}
            type={'border'}
          />,
        )
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function getDataObject(dataItems) {
    if (dataItems !== undefined) {
      let len = dataItems.length
      for (let i = 0; i < len; i++) {
        var date = new Date(dataItems[i].createAt)
        var dateShow =
          date.getDate() +
          '/' +
          Number(date.getMonth() + 1) +
          '/' +
          date.getFullYear()
        var time =
          date.getHours() +
          ':' +
          (Number(date.getMinutes()) < 10
            ? '0' + date.getMinutes()
            : date.getMinutes())
        rows.push({
          name: dataItems[i].first_name + ' ' + dataItems[i].last_name,
          Bank: dataItems[i].bank_acc_vendor,
          BankAccountNumber: dataItems[i].bank_acc_no,
          tel: dataItems[i].tel_no,
          BankAccountNumber: dataItems[i].bank_acc_no,
          statusForSearch:
            Number(dataItems[i].status) === 1 ? 'Active' : 'Deleted',
          Status: (
            <StatusTemplate
              string={Number(dataItems[i].status) === 1 ? 'Active' : 'Deleted'}
            />
          ),
          date: renderDateTime(dateShow, time),
          dateForSearch: dateShow,
          timeForSearch: time,
          action: (
            <div id={Number(dataItems[i].status) === 1 ? 'active' : 'delete'}>
              {renderAction(
                dataItems[i]._id,
                dataItems[i].status,
                Number(dataItems[i].status) === 1 ? true : false,
              )}
            </div>
          ),
        })
      }
      dataMain = {
        columns,
        rows,
      }
    }
  }

  function renderAction(id, status, active) {
    return (
      <div id={Number(status) === 0 ? 'deleted' : 'active'}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          disableElevation
          disabled={!active}
          onClick={(e) => {
            setStatusEdit(true)
            setUserID(id)
          }}
        >
          <EditIcon />
        </Button>{' '}
        <Button
          variant="outlined"
          style={{
            color: !active ? '' : '#D43E3E',
            border: !active ? '' : '1px solid #D43E3E',
          }}
          className={classes.button}
          disableElevation
          disabled={!active}
          onClick={(e) => {
            setUserID(id)
            setStatusDialog(true)
          }}
        >
          <DeleteIcon />
        </Button>{' '}
        <Button
          variant="outlined"
          style={{
            color: !active ? '' : '#fabf3e',
            border: !active ? '' : '1px solid #fabf3e',
          }}
          className={classes.button}
          disableElevation
          disabled={true}
        >
          <MoneyOffIcon />
        </Button>{' '}
      </div>
    )
  }
  function renderDateTime(date, time) {
    return (
      <div>
        <Typography variant="body2" style={{ fontSize: '14px' }}>
          {date === 'NaN/NaN/NaN' ? '' : date}
        </Typography>
        <Typography
          variant="body2"
          color="secondary"
          style={{ fontSize: '14px', marginTop: '4px' }}
        >
          {time === 'NaN:NaN' ? '' : '(' + time + ')'}
        </Typography>
      </div>
    )
  }
  const deleteMember = (id) => {
    var axios = require('axios')
    var qs = require('qs')
    var data = qs.stringify({
      status: '0',
      id: id,
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
        console.log(JSON.stringify(response.data))
        closeDialog()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  //    call 1 sec

  React.useEffect(() => {
    const check = CreateIntervalCall(async () => {
      addClassCSS()
    })
    check.callStart()
  })

  function addClassCSS() {
    for (let i = 0; i < document.querySelectorAll('div#delete').length; i++) {
      document.querySelectorAll('div#delete')[i].closest('tr').className =
        classes.deleteUser
    }
    for (let i = 0; i < document.querySelectorAll('div#active').length; i++) {
      document
        .querySelectorAll('div#active')
        [i].closest('tr')
        .classList.remove(classes.deleteUser)
    }
  }

  function sortCustom(value) {
    if (value.column === 'date') {
      setDatatable(
        <DataTable
          datatable={
            (dataMain = {
              columns,
              rows: _.orderBy(
                dataMain.rows,
                ['dateForSearch', 'timeForSearch'],
                [value.direction, value.direction],
              ),
            })
          }
          search={false}
          onFunction={sortCustom}
          type={'border'}
        />,
      )
    } else if (value.column === 'Status') {
      setDatatable(
        <DataTable
          datatable={
            (dataMain = {
              columns,
              rows: _.orderBy(
                dataMain.rows,
                ['statusForSearch'],
                [value.direction],
              ),
            })
          }
          search={false}
          onFunction={sortCustom}
          type={'border'}
        />,
      )
    }
  }

  return (
    <Grid container spacing={3}>
      <DialogDelete
        deleteMember={deleteMember}
        open={statusDialog}
        id={userId}
        onCloseDialog={closeDialog}
      />
      <DialogEdit
        id={userId}
        onCloseDialog={closeDialogEdit}
        open={statusEdit}
        checkValidate={checkValidate}
        handleChange={handleChange}
        data={data}
        setCreateStatus={setCreateStatus}
        createMember={onSubmit}
        optionSource={optionSource}
        optionBank={optionBank}
        getDataFromAPI={getDataFromAPI}
      />
      <Grid item xs={12} sm={12} md={12}>
        <Card className={classes.root} variant="outlined">
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} md={8}>
              <Typography variant="h6" color="primary">
                {createStatus ? 'Create member' : ' Member List'}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={4} className={classes.flexEnd}>
              {createStatus ? (
                ''
              ) : (
                <Button
                  variant="contained"
                  disableElevation
                  color="primary"
                  className={classes.createButton}
                  startIcon={<AddTwoToneIcon />}
                  onClick={() => {
                    setCreateStatus(true)
                    setData({
                      tel: '',
                      bank: '',
                      bankAccount: '',
                      firstname: '',
                      surname: '',
                      pin: '',
                      about: '',
                      line: '',
                    })
                    setCheckValidate(false)
                  }}
                >
                  Create User
                </Button>
              )}
            </Grid>
          </Grid>

          <Collapse in={createStatus}>
            {' '}
            <CreateUser
              checkValidate={checkValidate}
              handleChange={handleChange}
              data={data}
              setCreateStatus={setCreateStatus}
              createMember={onSubmit}
              optionSource={optionSource}
              optionBank={optionBank}
            />
          </Collapse>

          <CardContent>
            {createStatus ? (
              <Typography
                variant="body1"
                color="primary"
                style={{ marginLeft: '0px !impotant' }}
              >
                Member List
              </Typography>
            ) : (
              ''
            )}
            {datatable}
          </CardContent>
          <AlertSnackBar
            status={checkError}
            setError={setError}
            snackCustom={snackBar}
          />
        </Card>
      </Grid>
      <Loader status={loadingStatus} />
    </Grid>
  )
}
