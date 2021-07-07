import Skeleton from '@material-ui/lab/Skeleton'

export function getskeletonUserList() {
  let row = []
  for (let i = 0; i < 10; i++) {
    row.push({
      name: <Skeleton animation="wave" />,
      Bank: <Skeleton animation="wave" />,
      BankAccountNumber: <Skeleton animation="wave" />,
      tel: <Skeleton animation="wave" />,
      date: <Skeleton animation="wave" />,
      action: <Skeleton animation="wave" />,
    })
  }
  return row
}
export function getskeletonTransaction() {
  let row = []
  for (let i = 0; i < 10; i++) {
    row.push({
      tel_no: <Skeleton animation="wave" />,
      type: <Skeleton animation="wave" />,
      bank_acc_vendor_origin: <Skeleton animation="wave" />,
      bank_acc_no_origin: <Skeleton animation="wave" />,
      bank_acc_vendor_destination: <Skeleton animation="wave" />,
      bank_acc_no_destination: <Skeleton animation="wave" />,
      amount: <Skeleton animation="wave" />,
      date: <Skeleton animation="wave" />,
      Status: <Skeleton animation="wave" />,
    })
  }
  return row
}
