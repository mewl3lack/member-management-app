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
  getTransaction,
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
  let dataTransaction = {}
  let columns = [
    {
      label: 'Tel.',
      field: 'tel_no',
    },
    {
      label: 'Type.',
      field: 'type',
      sort: 'asc',
    },
    {
      label: 'Origin Bank',
      field: 'bank_acc_vendor_origin',
    },
    {
      label: 'Origin Bank Acc no.',
      field: 'bank_acc_no_origin',
    },
    {
      label: 'Destination bank ',
      field: 'bank_acc_vendor_destination',
    },
    {
      label: 'Destination Bank Acc no.',
      field: 'bank_acc_no_destination',
    },
    {
      label: 'Amount',
      field: 'amount',
    },
    {
      label: 'Create At',
      field: 'dateTransaction',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Status',
      field: 'Status',
      sort: 'asc',
      width: 100,
    },
  ]
  const dataBarChart = {
    labels: ['1-7', '8-14', '15-21', '22-31'],
    datasets: [
      {
        label: 'Withdraw',
        data: [12, 19, 3, 5],
        backgroundColor: '#E52E55',
      },
      {
        label: 'Deposit',
        data: [2, 3, 20, 30],
        backgroundColor: '#23C19A',
      },
    ],
  }
  const [datatable, setDatatable] = React.useState(
    <DataTable
      datatable={
        (dataTransaction = { columns, rows: getskeletonTransaction() })
      }
      search={false}
    />,
  )

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
  const [pie, setPie] = React.useState()

  var completed = 0
  var failed = 0
  var pending = 0
  var all = 0
  React.useEffect(() => {
    getTransactionFromAPI(getToday(), getYesterday())
    getUserFromAPI(getToday(), getYesterday())
  }, [])

  // transaction

  const getTransactionFromAPI = (from, to) => {
    setDatatable(
      <DataTable
        datatable={
          (dataTransaction = { columns, rows: getskeletonTransaction() })
        }
        search={false}
        onFunction={sortCustom}
      />,
    )
    var config = {
      method: 'get',
      url:
        'http://ec2-3-22-249-177.us-east-2.compute.amazonaws.com/api/transactionLog/getList',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      params: {
        query: `[{"$match":{"createAt":{"$gte":"${from}","$lt":"${to}"}}},{"$lookup":{"from":"user_members","localField":"user_member_id","foreignField":"_id","as":"members"}}]`,
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
        // setPieChart(res)
        setDatatable(
          <DataTable
            datatable={dataTransaction}
            search={false}
            onFunction={sortCustom}
          />,
        )
      })
      .catch(function (error) {
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
            string: `can not get transaction log`,
          })
        }
      })
  }

  function setPieChart(res) {
    completed =
      [res.find((o) => o.status === 'COMPLETED')][0] === undefined
        ? 0
        : [res.find((o) => o.status === 'COMPLETED')].length
    failed =
      [res.find((o) => o.status === 'FAILED')][0] === undefined
        ? 0
        : [res.find((o) => o.status === 'FAILED')].length
    pending =
      [res.find((o) => o.status === 'PENDING')][0] === undefined
        ? 0
        : [res.find((o) => o.status === 'PENDING')].length
    all = completed + failed + pending
    setPie(
      <PieChart
        completed={completed}
        failed={failed}
        pending={pending}
        all={all}
      />,
    )
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
          typeForSort: dataItems[i].type === 'DEP' ? 'DEP' : 'W/D',
          bank_acc_vendor_origin: dataItems[i].bank_acc_vendor_origin,
          bank_acc_no_origin: dataItems[i].bank_acc_no_origin,
          bank_acc_vendor_destination: dataItems[i].bank_acc_vendor_destination,
          bank_acc_no_destination: dataItems[i].bank_acc_no_destination,
          amount: dataItems[i].amount,
          dateTransaction: renderDateTime(
            getDate(dataItems[i].createAt).dateShow,
            getDate(dataItems[i].createAt).time,
          ),
          statusForSort:
            dataItems[i].status === 'COMPLETED'
              ? 'Completed'
              : dataItems[i].status === 'PENDING'
              ? 'Pending'
              : 'Failed',
          Status: statusTemplate(
            dataItems[i].status === 'COMPLETED'
              ? 'Completed'
              : dataItems[i].status === 'PENDING'
              ? 'Pending'
              : 'Failed',
          ),
        })
      }
      dataTransaction = {
        columns,
        rows: rowsTransaction,
      }
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
  let dataUSer = {}

  const [datatableUser, setDatatableUser] = React.useState(
    <DataTable
      datatable={
        (dataUSer = { columns: columnsUser, rows: getskeletonUserList() })
      }
      search={false}
      onFunction={sortCustom}
    />,
  )

  const getUserFromAPI = () => {
    var config = {
      method: 'get',
      url:
        'http://ec2-3-22-249-177.us-east-2.compute.amazonaws.com/api/member/getList',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
    axios(config)
      .then(function (response) {
        var res = _.orderBy(response.data.result, ['createAt'], ['desc'])
        getUserObject(res)
        setDatatableUser(
          <DataTable
            datatable={(dataUSer = { columns: columnsUser, rows: rowsUser })}
            search={false}
            onFunction={sortCustom}
          />,
        )
      })
      .catch(function (error) {
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
            string: `can not get member list`,
          })
        }
      })
  }

  function getUserObject(dataItems) {
    if (dataItems !== undefined) {
      setNewUser(dataItems.length)
      for (let i = 0; i < 20; i++) {
        if (dataItems[i].status === 1) {
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
      }
      dataUSer = { columns: columnsUser, rows: rowsUser }
    }
  }

  // end

  function sortCustom(value) {
    if (value.column === 'date') {
      setDatatableUser(
        <DataTable
          datatable={
            (dataUSer = {
              columns: columnsUser,
              rows: _.orderBy(
                dataUSer.rows,
                ['dateForSearch', 'timeForSearch'],
                [value.direction, value.direction],
              ),
            })
          }
          search={false}
          onFunction={sortCustom}
        />,
      )
    } else if (value.column === 'Status') {
      setDatatable(
        <DataTable
          datatable={
            (dataTransaction = {
              columns,
              rows: _.orderBy(
                dataTransaction.rows,
                ['statusForSort'],
                [value.direction],
              ),
            })
          }
          search={false}
          onFunction={sortCustom}
        />,
      )
    } else if (value.column === 'type') {
      alert(value.direction)
      setDatatable(
        <DataTable
          datatable={
            (dataTransaction = {
              columns,
              rows: _.orderBy(
                dataTransaction.rows,
                ['typeForSort'],
                [value.direction],
              ),
            })
          }
          search={false}
          onFunction={sortCustom}
        />,
      )
    } else if (value.column === 'dateTransaction') {
      setDatatable(
        <DataTable
          datatable={
            (dataTransaction = {
              columns,
              rows: _.orderBy(
                dataTransaction.rows,
                ['dateForSearch', 'timeForSearch'],
                [value.direction, value.direction],
              ),
            })
          }
          search={false}
          onFunction={sortCustom}
        />,
      )
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
            <Typography variant="h6" color="primary">
              Payment Type
            </Typography>
            <CardContent>
              <BarChart data={dataBarChart} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Card variant="outlined" className={classes.pieDetail}>
            <Typography variant="h6" color="primary">
              Payment Status
            </Typography>
            <CardContent>{pie}</CardContent>
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
            <CardContent>{datatable} </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            variant="outlined"
            className={`${classes.dataTable} ${classes.pieDetail} ${classes.dataTableBG}`}
          >
            <Typography variant="h6" color="primary">
              New 20 Users{' '}
            </Typography>
            <CardContent>{datatableUser}</CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
