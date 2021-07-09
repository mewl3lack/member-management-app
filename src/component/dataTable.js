import React from 'react'
import { MDBDataTable } from 'mdbreact'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import { makeStyles } from '@material-ui/core/styles'
import '../style/global.css'
const useStyles = makeStyles((theme) => ({
  searchBar: {
    '& .mdb-datatable-filter ': {
      margin: '16px 0px',
      maxWidth: '400px',
      width: '100%',
      '& input': {
        display: 'flex',
        borderRadius: '40px',
        minHeight: '36px',
      },
    },
  },

  dataTable: {
    '& table': {
      textAlign: 'center',
      '& thead': {
        '& th': {
          color: '#7A7A7A',
          textAlign: 'center',
          fontSize: '14px',
          background: '#ffffff !important',
          borderBottom: '1px solid #BEBEBE',
          fontWeight: 500,
        },
      },
      '& tbody': {
        textAlign: 'center !important',
        '& tr': {
          '& td': {
            verticalAlign: 'middle',

            marginBottom: '20px',
            padding: '16px',
            fontSize: '16px',
            background: '#ffffff !important',
            borderBottom: '1px solid #D8D8D8',
          },
        },
      },
    },
  },

  dataTableWithBorder: {
    '& table': {
      textAlign: 'center',
      '& thead': {
        '& th': {
          textAlign: 'center',
          fontSize: '16px',
          background: '#e1e1e1  !important',
          border: '1px solid #F3F3F3',
          '&:first-child': {
            borderRadius: '10px 0  0px 0px',
            border: 'none !important',
          },
          '&:last-child': {
            borderRadius: '0 10px 0px 0',
            border: 'none !important',
          },
        },
      },
      '& tbody': {
        '& tr': {
          '& td': {
            marginBottom: ' ',
            fontSize: '14px',
            textAlign: 'center !important',
            verticalAlign: 'middle',
            textAlign: 'left',
            maxHeight: '64px  !important',
            minHeight: '64px !important',
            border: '1px solid #F3F3F3',
            textAlign: 'center',
            padding: '12px 12px 12px 12px',
            '&:first-child': {
              borderRadius: '12px 0  0px 12px',
            },
            '&:last-child': {
              borderRadius: '0 12px 12px 0',
            },
            '&:nth-of-type(06)': {
              width: '168px',
              minWidth: '168px',
            },
          },
        },
      },
    },
  },

  dataTableDashBorad: {
    '& table': {
      textAlign: 'center',
      borderCollapse: 'separate',
      borderSpacing: '0px 8px',
      '& thead': {
        '& th': {
          fontSize: '14px',
          textAlign: 'center',
          background: '#C3CAD4',
          border: 'none',
          fontWeight: '500',
          borderRight: '1px solid #ffffff',
          padding: '12px 8px',
          '&:first-child': {
            borderRadius: '30px 0  0px 30px',
            width: '272px',
            minWidth: '272px',
          },
          '&:last-child': {
            borderRadius: '0 30px 30px 0',
            border: 'none',
          },
          // '&:nth-of-type(02)': {
          //   width: '160px',
          //   minWidth: '160px',
          // },
          // '&:nth-of-type(03)': {
          //   width: '220px',
          //   minWidth: '220px',
          // },
          // '&:nth-of-type(05)': {
          //   width: '144px',
          //   minWidth: '144px',
          // },
          // '&:nth-of-type(06)': {
          //   width: '108px',
          //   minWidth: '108px',
          // },
          // '&:nth-of-type(07)': {
          //   width: 'calc(100% - 992px)',
          //   minWidth: '96px',
          // },
          // '&:nth-of-type(04),&:nth-of-type(08)': {
          //   width: '88px',
          //   minWidth: '88px',
          // },
        },
      },
      '& tbody': {
        textAlign: 'center !important',
        '& tr': {
          padding: '12px 8px',
          height: '64px',
          '& td': {
            marginBottom: '20px',
            padding: '8px',
            background: '#ffffff !important',
            border: 'none',
            verticalAlign: 'middle',
            fontSize: '14px',
            borderTop: 'rgba(200,200,200,100%) 1px solid',
            borderBottom: 'rgba(200,200,200,100%) 1px solid',
            '& .MuiTypography-body1': {
              fontSize: '14px',
            },
            '&:first-child': {
              borderLeft: 'rgba(200,200,200,100%) 1px solid',
              borderTopLeftRadius: '12px',
              borderBottomLeftRadius: '12px',
            },
            '&:last-child': {
              borderRight: 'rgba(200,200,200,100%) 1px solid',
              borderTopRightRadius: '12px',
              borderBottomRightRadius: '12px',
            },
          },
        },
      },
    },
  },
}))

export default function TopSearchSelect({
  type,
  search,
  datatable,
  onFunction,
}) {
  const classes = useStyles()

  return (
    <MDBDataTable
      entries={10}
      pagesAmount={4}
      responsive
      data={datatable}
      pagingtop={'true'}
      searchtop={'true'}
      fullpagination={'true'}
      className={
        type === 'border'
          ? `${classes.dataTableWithBorder} ${classes.searchBar}`
          : type === 'dashborad'
          ? `${classes.dataTableDashBorad} ${classes.searchBar}`
          : `${classes.dataTable} ${classes.searchBar}`
      }
      info={false}
      displayEntries={false}
      entries={10}
      noBottomColumns
      searching={type === 'nonBorder' ? false : true}
      paginationLabel={['<', '>']}
      id={'datatable'}
      pagesAmount={6}
      onSort={(value) =>
        onFunction !== undefined
          ? onFunction(value)
          : console.log('fn not found')
      }
    />
  )
}
