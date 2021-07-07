import { makeStyles } from '@material-ui/core/styles'
import customTheme from '../../style/theme'

export const useStyles = makeStyles((theme) => ({
  rootCard: {
    borderRadius: '16px',
    border: 'none',
    padding: '8px 16px 0px 16px',
    fontWeight: '500 !important',
    [theme.breakpoints.down('sm')]: {
      minHeight: '100px',
      '& .MuiTypography-h6': {
        color: '#878787',
        fontSize: '18px !important',
      },
      '& .MuiTypography-body1': {
        color: '#878787',
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '32px !important',
      },
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '140px',
      '& .MuiTypography-h6': {
        color: '#878787',
        fontSize: '24px !important',
      },
      '& .MuiTypography-body1': {
        color: '#878787',
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '48px  ',
      },
    },
  },
  formControl: {
    '& .MuiSelect-select ': {
      color: '#878787',
      fontSize: '16px !important',
    },
    '&.MuiMenuItem-gutters': {
      color: '#878787',
      fontSize: '16px !important',
    },
  },
  pieDetail: {
    borderRadius: '16px',
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      '& .MuiTypography-body1': {
        color: '#878787',
        fontSize: '18px !important',
        fontWeight: 400,
      },
      '& .MuiTypography-body2': {
        color: '#878787',
        fontSize: '16px !important',
        marginRight: '4px',
      },
      '& .MuiTypography-h6': {
        padding: '24px 24px 0px 24px',
        fontWeight: '500 !important',
        fontSize: '20px !important',
      },
    },
    [theme.breakpoints.up('md')]: {
      '& .MuiTypography-body1': {
        color: '#878787',
        fontSize: '18px !important',
      },
      '& .MuiTypography-body2': {
        color: '#878787',
        fontSize: '16px !important',
        marginRight: '4px',
      },
      '& .MuiTypography-body3': {
        color: '#878787',
        fontSize: '18px !important',
        padding: '0px 0px 0px 0px !important',
      },
      '& .MuiTypography-h6': {
        padding: '24px 24px 0px 24px',
        fontWeight: '500 !important',
        fontSize: '22px !important',
      },
    },
  },
  circle: {
    borderRadius: '50%',
    background: 'red',
    marginRight: '12px',
    marginTop: '4px',
    display: 'inline-flex',
    [theme.breakpoints.down('sm')]: {
      height: '14px',
      width: '14px',
    },
    [theme.breakpoints.up('md')]: {
      height: '18px',
      width: '18px',
    },
  },
  pieDetailCircle: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '2px',
  },
  dataTable: {
    padding: '4px 4px 4px 4px',
  },
  dataTableBG: {
    // background: '#f0f7ff !important',
  },
}))
