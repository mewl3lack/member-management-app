import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '8px',
    border: 'none',
    padding: '38px 24px 24px 24px',
    fontWeight: '500 !important',
    [theme.breakpoints.down('sm')]: {
      minHeight: '100px',
      '& .MuiTypography-h6': {
        fontSize: '18px !important',
        marginLeft: '16px',
      },
      '& .MuiTypography-body1': {
        fontSize: '16px !important',
        marginTop: '4px',
        fontWeight: 500,
      },
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '140px',
      '& .MuiTypography-h6': {
        fontSize: '24px !important',
        marginLeft: '16px',
        marginTop: '4px',
      },
      '& .MuiTypography-body1': {
        fontSize: '20px !important',
        marginTop: '4px',
        fontWeight: 500,
      },
    },
  },
  flexEnd: {
    textAlign: 'right',
  },
  createButton: {
    borderRadius: '8px',
    marginRight: '28px',
    textTransform: 'capitalize',
    '& .MuiButton-label': {
      fontSize: '16px !important',
      fontWeight: 400,
    },
  },
  groupButton: {
    textAlign: 'center',
    '& .MuiButton-label': {
      fontSize: '16px !important',
      textTransform: 'capitalize',
      fontWeight: 400,
      color: '#ffffff',
    },
    '& .MuiButtonBase-root': {
      marginTop: '20px',
      marginRight: '8px',
      width: '140px',
      borderRadius: '8px',
      height: '44px',
    },
  },
  formCreate: {
    marginTop: '8px',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiSelect-root': {
      height: '14px',
    },
  },
  fullDivider: { marginTop: '32px' },

  buttonGroup: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonGroupDialog: {
    '& .MuiButtonBase-root': {
      minWidth: '100px',
      marginLeft: '8px',
      borderRadius: '8spx',
    },
  },

  circle: {
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    marginRight: '8px',
  },
  circleActive: {
    background: '#02de4b ',
  },
  circleDeleted: {
    background: '#d10000',
  },
  statusText: {
    fontSize: '14px ',
    textTransform: 'capitalize',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiTypography-body2': {
      fontSize: '14px !important',
    },
  },
}))
