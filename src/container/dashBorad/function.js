import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import _ from 'lodash'

export function getToday() {
  var today = new Date()
  today.setDate(today.getDate() - 1)

  return (
    today.getFullYear() +
    '-' +
    (Number(today.getMonth() + 1) < 10
      ? '0' + (today.getMonth() + 1)
      : today.getMonth() + 1) +
    '-' +
    (Number(today.getDate()) < 10 ? '0' + today.getDate() : today.getDate())
  )
}
export function getYesterday() {
  var today = new Date()
  return (
    today.getFullYear() +
    '-' +
    (Number(today.getMonth() + 1) < 10
      ? '0' + (today.getMonth() + 1)
      : today.getMonth() + 1) +
    '-' +
    (Number(today.getDate()) < 10 ? '0' + today.getDate() : today.getDate())
  )
}

export function statusTemplate(string) {
  return (
    <div
      style={{
        fontSize: '18px ',
        textTransform: 'capitalize',
        color: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiTypography-body2': {
          fontSize: '16px !important',
        },
      }}
    >
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
export function renderDateTime(date, time) {
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

export function getDate(date) {
  var date = new Date(date)
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
  return { time, dateShow, date }
}

export function getTransaction(from, to) {
  var dep = 0
  var wd = 0
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
      dep =
        [res.find((o) => o.type === 'DEP')][0] === undefined
          ? 0
          : [res.find((o) => o.type === 'DEP')].length
      wd =
        [res.find((o) => o.type === 'W/D')][0] === undefined
          ? 0
          : [res.find((o) => o.type === 'W/D')].length
    })
    .catch(function (error) {})
  console.log(wd, dep)
  return { wd, dep }
}
