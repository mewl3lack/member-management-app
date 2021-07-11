import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Skeleton from '@material-ui/lab/Skeleton'

export default function CreateUser({ status }) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.formCreate}>
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={'h3'}>
            <Skeleton width={340} />{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={'h3'}>
            <Skeleton width={340} />{' '}
          </Typography>
        </Grid>{' '}
        <Grid item md={2} />
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={'h3'}>
            <Skeleton width={340} />{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={'h3'}>
            <Skeleton width={340} />{' '}
          </Typography>
        </Grid>
        <Grid item md={2} />
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={'h3'}>
            <Skeleton width={340} />{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={'h3'}>
            <Skeleton width={340} />{' '}
          </Typography>
        </Grid>
        <Grid item md={2} />
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={'h3'}>
            <Skeleton width={340} />{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}></Grid>
        <Grid item md={2} /> <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={'h3'}>
            <Skeleton width={340} />{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}></Grid>
        <Grid item md={2} />
      </Grid>
      {!status ? (
        ''
      ) : (
        <Grid container spacing={3} className={classes.groupButton}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Skeleton width={130} height={80} />
            <Skeleton width={130} height={80} style={{ marginLeft: '8px' }} />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}
