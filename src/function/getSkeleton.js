import Skeleton from '@material-ui/lab/Skeleton';

export function getskeletonUserList() {
  let row = [];
  for (let i = 0; i < 10; i++) {
    row.push({
        name: <Skeleton animation='wave' />,
        Bank: <Skeleton animation='wave' />,
        BankAccountNumber: <Skeleton animation='wave' />,
        tel: <Skeleton animation='wave' />,
        date: <Skeleton animation='wave' />,
     
    });
  }
  return row;
}

 