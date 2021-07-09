import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import '../../style/global.css'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './styles'

export default function Pie({ completed, failed, pending, all }) {
  const classes = useStyles()
  return (
    <div>
      <PieChart
        animation
        animationDuration={3000}
        center={[110, 50]}
        data={[
          {
            color: '#82faa2',
            title: 'Completed',
            value: completed,
          },
          {
            color: '#FFDA93',
            title: 'Pending',
            value: failed,
          },
          {
            color: '#ff8585',
            title: 'Failed',
            value: pending,
          },
        ]}
        viewBoxSize={[220, 100]}
        labelPosition={60}
        paddingAngle={1}
        labelStyle={{
          fontSize: '8px',
          fontWeight: '700',
          fontColor: 'FFFFFA',
        }}
        label={(data) => data.dataEntry.value}
      />
      <Grid container>
        <Grid item xs={2} sm={2} md={2} />
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '12px',
          }}
          className={classes.pieDetail}
        >
          <Typography variant="body1" component="p" display="inline">
            Total number of Status&nbsp; :&nbsp;
          </Typography>
          <Typography variant="body1" component="p" display="inline">
            {all}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} />
      </Grid>
      {/*  */}
      <Grid container className={classes.pieDetailCircle}>
        <Grid item xs={2} sm={2} md={2} />
        <Grid item xs={8} sm={8} md={8}></Grid>
        <Grid item xs={2} sm={2} md={2} />
        <Grid item xs={12} sm={4} md={4} className={classes.pieDetail}>
          <div
            className={classes.circle}
            style={{
              backgroundColor: '#82faa2',
            }}
          ></div>
          <Typography variant="body2" component="p" display="inline">
            Completed
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <div
            className={classes.circle}
            style={{
              backgroundColor: '#FFDA93',
            }}
          ></div>
          <Typography variant="body2" component="p" display="inline">
            Pending
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4} className={classes.pieDetail}>
          <div
            className={classes.circle}
            style={{
              backgroundColor: '#ff8585',
            }}
          ></div>
          <Typography variant="body2" component="p" display="inline">
            Failed
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
