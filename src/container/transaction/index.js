import React from 'react'
import Grid from '@material-ui/core/Grid'
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
import _ from 'lodash'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '@material-ui/lab/TabPanel'
import TabContext from '@material-ui/lab/TabContext'

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

  let rows = []
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
      sort: 'disabled',
    },
    {
      label: 'Bank',
      field: 'Bank',
      width: 270,
      sort: 'disabled',
    },
    {
      label: 'Bank account number',
      field: 'BankAccountNumber',
      width: 270,
      sort: 'disabled',
    },
    {
      label: 'Create Date and time',
      field: 'date',
      sort: 'asc',
      width: 100,
      sort: 'disabled',
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
  const [datatable, setDatatable] = React.useState({
    columns,
    rows: getskeletonUserList(),
  })
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
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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
        var res = _.orderBy(response.data, ['createAt'], ['desc'])
        getDataObject(res)
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
          tel: dataItems[i].status,
          date: renderDateTime(dateShow, time),
          Status: (
            <StatusTemplate
              string={Number(dataItems[i].status) === 1 ? 'Active' : 'Deleted'}
            />
          ),
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

      setDatatable({
        columns,
        rows,
      })
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
        </Button>
        {'   '}
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

  //    call 1 sec

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <TabContext value={value}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Item One" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
              </Tabs>{' '}
            </Grid>{' '}
            <Grid item xs={12} sm={12} md={3}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Item One" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
              </Tabs>{' '}
            </Grid>{' '}
          </Grid>
          <TabPanel value="1">Item One</TabPanel>{' '}
        </TabContext>

        <Card className={classes.root} variant="outlined">
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} md={8}>
              <Typography variant="h6" color="primary">
                {createStatus ? 'Create member' : ' Member List'}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={4} className={classes.flexEnd}></Grid>
          </Grid>

          <DataTable datatable={datatable} search={false} type={'border'} />

          <AlertSnackBar
            status={checkError}
            setError={setError}
            snackCustom={snackBar}
          />
        </Card>
      </Grid>
    </Grid>
  )
}
