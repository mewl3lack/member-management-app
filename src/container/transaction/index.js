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
import AlertSnackBar from '../../component/snackBarAlert'
import { getskeletonTransaction } from '../../function/getSkeleton'
import _ from 'lodash'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '@material-ui/lab/TabPanel'
import TabContext from '@material-ui/lab/TabContext'
import DialogDelete from './dialogDelete'

import CheckIcon from '@material-ui/icons/Check'
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
export default function User(props) {
  debugger
  const classes = useStyles()
  let rows = []
  let data = {}
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
    },
    {
      label: 'Create At',
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
    },
  ]
  const [datatable, setDatatable] = React.useState(
    <DataTable
      datatable={(data = { columns, rows: getskeletonTransaction() })}
      search={false}
      onFunction={sortCustom}
    />,
  )

  const [checkError, setError] = React.useState(false)
  const [snackBar, setSnackBar] = React.useState({
    string: '',
    severity: '',
  })
  const [statusDialog, setStatusDialog] = React.useState(false)
  const [transactionID, setTransactionID] = React.useState('')

  const [value, setValue] = React.useState('a')
  const closeDialog = () => {
    setStatusDialog(false)
  }
  React.useEffect(() => {
    getDataFromAPI('All')
  }, [])

  const handleChange = (event, newValue) => {
    newValue === 'd'
      ? getDataFromAPI('DEP')
      : newValue === 'w'
      ? getDataFromAPI('W/D')
      : getDataFromAPI('All')
    setValue(newValue)
  }

  const getDataFromAPI = (type) => {
    console.log(props.uuid)
    setDatatable(
      <DataTable
        datatable={(data = { columns, rows: getskeletonTransaction() })}
        search={false}
        onFunction={sortCustom}
      />,
    )
    if (type === 'All' && _.isEmpty(props)) {
      var params = {
        query: `
        [{"$match":{}},{"$lookup":{"from":"user_members","localField":"user_member_id","foreignField":"_id","as":"members"}}]`,
      }
    } else if (type !== 'All' && _.isEmpty(props)) {
      var params = {
        query: `
        [{"$match":{"type":"${type}"}},{"$lookup":{"from":"user_members","localField":"user_member_id","foreignField":"_id","as":"members"}}]`,
      }
    } else if (type === 'All' && props !== undefined) {
      var params = {
        query: `
        [{"$match":{"user_member_id":"${props.uuid}"}},{"$lookup":{"from":"user_members","localField":"user_member_id","foreignField":"_id","as":"members"}}]`,
      }
    } else if (type !== 'All' && props !== undefined) {
      var params = {
        query: `
        [{"$match":{"type":"${type}","user_member_id":"${props.uuid}"}},{"$lookup":{"from":"user_members","localField":"user_member_id","foreignField":"_id","as":"members"}}]`,
      }
    }

    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/api/transactionLog/getList`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      params,
    }
    axios(config)
      .then(function (response) {
        var res = _.orderBy(response.data.result, ['createAt'], ['desc'])
        getDataObject(res)
        setDatatable(
          <DataTable datatable={data} search={false} onFunction={sortCustom} />,
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
            string: `can not get transaction `,
          })
        }
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
          tel_no:
            dataItems[i].members.length === 0
              ? '-'
              : dataItems[i].members[0].tel_no,
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
          date: renderDateTime(dateShow, time),
          dateForSearch: dateShow,
          timeForSearch: time,
          statusForSort:
            dataItems[i].status === 'COMPLETED'
              ? 'Completed'
              : dataItems[i].status === 'PENDING'
              ? 'Pending'
              : 'Failed',
          Status: (
            <StatusTemplate
              string={
                dataItems[i].status === 'COMPLETED'
                  ? 'Completed'
                  : dataItems[i].status === 'Pending'
                  ? 'Pending'
                  : 'Failed'
              }
            />
          ),
          action: renderAction(dataItems[i].status),
        })
      }

      data = {
        columns,
        rows,
      }
    }
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
  function sortCustom(value) {
    if (value.column === 'Status') {
      setDatatable(
        <DataTable
          datatable={
            (data = {
              columns,
              rows: _.orderBy(data.rows, ['statusForSort'], [value.direction]),
            })
          }
          search={false}
          onFunction={sortCustom}
        />,
      )
    } else if (value.column === 'date') {
      setDatatable(
        <DataTable
          datatable={
            (data = {
              columns,
              rows: _.orderBy(
                data.rows,
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
  function renderAction(action) {
    return (
      <div>
        {action === 'COMPLETED' ? (
          '-'
        ) : (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            onClick={(e) => {
              setStatusDialog(true)
            }}
          >
            <CheckIcon />
          </Button>
        )}
      </div>
    )
  }
  return (
    <Grid container spacing={3}>
      <DialogDelete
        deleteMember={''}
        open={statusDialog}
        id={transactionID}
        onCloseDialog={closeDialog}
      />
      <Grid item xs={12} sm={12} md={12}>
        <TabContext value={value}>
          <Grid container>
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              style={{ float: 'left !important' }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                style={{ background: '#ffffff' }}
              >
                <Tab label="All" value="a" />
                <Tab label="Withdraw" value="w" />
                <Tab label="Deposit" value="d" />
              </Tabs>
            </Grid>
            <Grid item xs={6} sm={6} md={6}></Grid>
          </Grid>
          <Card className={classes.root} variant="outlined">
            <TabPanel value="a">{datatable}</TabPanel>
            <TabPanel value="w">{datatable} </TabPanel>
            <TabPanel value="d">{datatable} </TabPanel>
          </Card>
        </TabContext>

        <AlertSnackBar
          status={checkError}
          setError={setError}
          snackCustom={snackBar}
        />
      </Grid>
    </Grid>
  )
}
