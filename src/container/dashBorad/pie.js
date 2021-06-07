import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import "../../style/global.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

export default function Pie() {
  const classes = useStyles();

  return (
    <div>
      <PieChart
        animation
        animationDuration={3000}
        center={[110, 50]}
        data={[
          {
            color: "#80E0E5",
            title: "System errors",
            value: 10,
          },
          {
            color: "#FFDA93",
            title: "Customer errors",
            value: 15,
          },
          {
            color: "#FF7576",
            title: "Bank errors",
            value: 20,
          },
        ]}
        viewBoxSize={[220, 100]}
        labelPosition={60}
        paddingAngle={1}
        labelStyle={{
          fontSize: "8px",
          fontWeight: "700",
          fontColor: "FFFFFA",
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
            display: "flex",
            justifyContent: "center",
            marginTop: "12px",
          }}
          className={classes.pieDetail}
        >
          <Typography variant="body1" component="p" display="inline">
            Total number of errors&nbsp; :&nbsp;
          </Typography>
          <Typography variant="body1" component="p" display="inline">
            45
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} />
      </Grid>
      {/*  */}
      <Grid container className={classes.pieDetailCircle}>
        <Grid item xs={2} sm={2} md={2} />
        <Grid item xs={8} sm={8} md={8}></Grid>
        <Grid item xs={2} sm={2} md={2} />
        <Grid item xs={12} sm={4} md={4}>
          <div
            className={classes.circle}
            style={{
              backgroundColor: "#FFDA93",
            }}
          ></div>
          <Typography variant="body2" component="p" display="inline">
            Customer errors
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4} className={classes.pieDetail}>
          <div
            className={classes.circle}
            style={{
              backgroundColor: "#FF7576",
            }}
          ></div>
          <Typography variant="body2" component="p" display="inline">
            Bank errors
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4} className={classes.pieDetail}>
          <div
            className={classes.circle}
            style={{
              backgroundColor: "#80E0E5",
            }}
          ></div>
          <Typography variant="body2" component="p" display="inline">
            System errors
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
