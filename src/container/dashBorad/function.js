import axios from 'axios'
import Typography from '@material-ui/core/Typography'
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
