import React from 'react'
import Typography from '@material-ui/core/Typography'
import CustomCard from './card'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import '../../style/global.css'
import PieChart from './pie'
import BarChart from './bar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import DataTable from '../../component/dataTable'
import random from 'random-name'
import axios from 'axios'
import _ from 'lodash'
import AlertSnackBar from '../../component/snackBarAlert'
import {
  getskeletonTransaction,
  getskeletonUserList,
} from '../../function/getSkeleton'
import {
  getToday,
  getYesterday,
  renderDateTime,
  statusTemplate,
  getDate,
} from './function'

export function StatusTemplate({ string }) {
  const classes = useStyles()
  return (
    <div className={classes.statusText}>
      <Typography
        variant="body2"
        noWrap
        style={{
          color:
            string === 'Completed' || string === 'DEP'
              ? '#00b812'
              : string === 'Pending'
              ? '#e0a500'
              : '#d10000',
        }}
      >
        {string}
      </Typography>
    </div>
  )
}

export default function DashBorad() {
  const classes = useStyles()
  const [period, setPeriod] = React.useState('today')
  let rowsTransaction = []
  let columns = [
    {
      label: 'Tel.',
      field: 'tel_no',
    },
    {
      label: 'Type.',
      field: 'type',
      sort: 'asc',
      sort: 'disabled',
    },
    {
      label: 'Origin Bank',
      field: 'bank_acc_vendor_origin',
      sort: 'disabled',
    },
    {
      label: 'Origin Bank Acc no.',
      field: 'bank_acc_no_origin',
      sort: 'disabled',
    },
    {
      label: 'Destination bank ',
      field: 'bank_acc_vendor_destination',
      sort: 'disabled',
    },
    {
      label: 'Destination Bank Acc no.',
      field: 'bank_acc_no_destination',
      sort: 'disabled',
    },
    {
      label: 'Amount',
      field: 'amount',
      sort: 'disabled',
    },
    {
      label: 'Create At',
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
  ]
  const [datatable, setDatatable] = React.useState({
    columns,
  })
  const [snackBar, setSnackBar] = React.useState({
    string: '',
    severity: '',
  })
  const [checkError, setError] = React.useState(false)
  // card amount
  const [newUser, setNewUser] = React.useState(0)
  const [todayTransaction, setTodayTransaction] = React.useState(0)
  const [todayWD, setTodayWD] = React.useState(0)
  const [todayDEP, setTodayDEP] = React.useState(0)

  React.useEffect(() => {
    getTransactionFromAPI(getToday(), getYesterday())
    getUserFromAPI(getToday(), getYesterday())
  }, [])

  // transaction

  const getTransactionFromAPI = (from, to) => {
    setDatatable({
      columns,
      rows: getskeletonTransaction(),
    })
    var config = {
      method: 'get',
      url:
        'http://ec2-18-117-124-197.us-east-2.compute.amazonaws.com/api/transactionLog/getList',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      params: {
        query: `[{"$match":{"createAt":{"$gte":"${'2021-07-05'}","$lt":"${to}"}}},{"$lookup":{"from":"user_members","localField":"user_member_id","foreignField":"_id","as":"members"}}]`,
      },
    }
    axios(config)
      .then(function (response) {
        var res = _.orderBy(response.data.result, ['createAt'], ['desc'])
        getDataObject(res)
        setTodayWD(
          Number(_.filter(response.data.result, { type: 'W/D' }).length),
        )
        setTodayDEP(
          Number(_.filter(response.data.result, { type: 'DEP' }).length),
        )
      })
      .catch(function (error) {
        debugger
        setError(true)
        setSnackBar({
          severity: 'error',
          string: `can not get transaction log`,
        })
      })
  }

  function getDataObject(dataItems) {
    if (dataItems !== undefined) {
      let len = dataItems.length
      setTodayTransaction(dataItems.length)
      for (let i = 0; i < len; i++) {
        rowsTransaction.push({
          tel_no: dataItems[i].members[0].tel_no,
          type: (
            <StatusTemplate
              string={dataItems[i].type === 'DEP' ? 'DEP' : 'W/D'}
            />
          ),
          bank_acc_vendor_origin: dataItems[i].bank_acc_vendor_origin,
          bank_acc_no_origin: dataItems[i].bank_acc_no_origin,
          bank_acc_vendor_destination: dataItems[i].bank_acc_vendor_destination,
          bank_acc_no_destination: dataItems[i].bank_acc_no_destination,
          amount: dataItems[i].amount,
          date: renderDateTime(
            getDate(dataItems[i].createAt).dateShow,
            getDate(dataItems[i].createAt).time,
          ),
          Status: statusTemplate(
            dataItems[i].status === 'COMPLETED'
              ? 'Completed'
              : dataItems[i].status === 'PENDING'
              ? 'Pending'
              : 'Failed',
          ),
        })
      }
      setDatatable({
        columns,
        rows: rowsTransaction,
      })
    }
  }
  // end

  // user

  let columnsUser = [
    {
      label: 'Name',
      field: 'name',
      width: 150,
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
  ]
  let rowsUser = []

  const [datatableUser, setDatatableUser] = React.useState({
    columns: columnsUser,
    rows: getskeletonUserList(),
  })

  const getUserFromAPI = () => {
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
        getUserObject(res)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function getUserObject(dataItems) {
    if (dataItems !== undefined) {
      setNewUser(dataItems.length)
      for (let i = 0; i < 20; i++) {
        rowsUser.push({
          name: dataItems[i].first_name + ' ' + dataItems[i].last_name,
          Bank: dataItems[i].bank_acc_vendor,
          BankAccountNumber: dataItems[i].bank_acc_no,
          tel: dataItems[i].tel_no,
          BankAccountNumber: dataItems[i].bank_acc_no,
          date: renderDateTime(
            getDate(dataItems[i].createAt).dateShow,
            getDate(dataItems[i].createAt).time,
          ),
          dateForSearch: getDate(dataItems[i].createAt).dateShow,
          timeForSearch: getDate(dataItems[i].createAt).time,
        })
      }
      setDatatableUser({
        columns: columnsUser,
        rows: rowsUser,
      })
    }
  }

  // end

  function sortCustom(value) {
    if (value.column === 'date') {
      console.log(datatable.rows)
      setDatatable({
        columns,
        rows: _.orderBy(datatable.rows, ['dateForSearch'], [value.direction]),
      })
      console.log(datatable.rows)
    } else if (value.column === 'Status') {
      setDatatable({
        columns,
        rows: _.orderBy(datatable.rows, ['statusForSearch'], [value.direction]),
      })
    }
  }

  return (
    <div>
      <AlertSnackBar
        status={checkError}
        setError={setError}
        snackCustom={snackBar}
      />
      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={6} md={6}>
          <FormControl
            size="small"
            variant="outlined"
            clasNsame={classes.formControl}
          >
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={period}
              onChange={(e) => {
                setPeriod(e.target.value)
              }}
            >
              <MenuItem select value={'today'}>
                today
              </MenuItem>{' '}
              <MenuItem select value={'yesterday'}>
                yesterday
              </MenuItem>{' '}
              <MenuItem select value={'thisMonth'}>
                This month
              </MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item sm={6} md={6} />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard color={'#9E9E9E'} amount={newUser} label={'All Member'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard
            color={'#367BF5'}
            amount={todayTransaction}
            label={'All'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard color={'#E30031'} amount={todayWD} label={'Withdraw'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard color={'#23C19A'} amount={todayDEP} label={'Deposit'} />
        </Grid>
      </Grid>
      <Grid container spacing={3} clasNsame={classes.chartList}>
        {/* <Grid item xs={12} sm={12} md={7}>
          <Card variant="outlined" className={classes.pieDetail}>
            <CardContent>
              <BarChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Card variant="outlined" className={classes.pieDetail}>
            <Typography variant="h6" color="primary">
              Payment issues
            </Typography>
            <CardContent>
              <PieChart />
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item xs={12} sm={12} md={12}>
          <Card
            variant="outlined"
            className={`${classes.dataTable} ${classes.pieDetail}`}
          >
            <Typography variant="h6" color="primary">
              New Transaction{' '}
            </Typography>
            <CardContent>
              <DataTable datatable={datatable} search={false} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            variant="outlined"
            className={`${classes.dataTable} ${classes.pieDetail}`}
          >
            <Typography variant="h6" color="primary">
              New User{' '}
            </Typography>
            <CardContent>
              <DataTable
                datatable={datatableUser}
                search={false}
                onFunction={sortCustom}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
