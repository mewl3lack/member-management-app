import React from "react";
import Typography from "@material-ui/core/Typography";
import CustomCard from "./card";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../../style/global.css";
import PieChart from "./pie";
import BarChart from "./bar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DataTable from "../../component/dataTable";
import { useHistory } from "react-router-dom";
import random from "random-name";

export default function DashBorad() {
  const classes = useStyles();
  const [period, setPeriod] = React.useState("thisMonth");
  let rows = [];
  let columns = [
    {
      label: "Account name",
      field: "name",
      width: 150,
      attributes: {
        "aria-controls": "DataTable",
        "aria-label": "Name",
      },
    },
    {
      label: "Type",
      field: "Type",
      width: 270,
    },
    {
      label: "Date",
      field: "date",
      sort: "asc",
      width: 150,
    },
    {
      label: "Amount",
      field: "Amount",
      sort: "asc",
      width: 100,
    },
  ];
  const [datatable, setDatatable] = React.useState({
    columns,
  });

  React.useEffect(() => {
    for (let i = 0; i < 100; i++) {
      rows.push({
        name: random.first() + " " + random.last(),
        Type:
          i % Math.floor(Math.random() * 10 + 1) === 0 ? "withdraw" : "deposit",
        date: "2009/09/15",
        Amount: Math.floor(Math.random() * 1000 + 1),
      });
    }
    setDatatable({
      columns,
      rows,
    });
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl
            size="small"
            variant="outlined"
            clasNsame={classes.formControl}
          >
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={period}
              onChange={(e) => {
                setPeriod(e.target.value);
              }}
            >
              <MenuItem select value={"thisMonth"}>
                This month
              </MenuItem>{" "}
              <MenuItem select value={"thisMonth"}>
                This month
              </MenuItem>{" "}
              <MenuItem select value={"thisMonth"}>
                This month
              </MenuItem>{" "}
              <MenuItem select value={"thisMonth"}>
                This month
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6} md={6} />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard color={"#9E9E9E"} amount={84} label={"Member"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard color={"#367BF5"} amount={334} label={"All"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard color={"#E30031"} amount={114} label={"Withdraw"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard color={"#23C19A"} amount={220} label={"Deposit"} />
        </Grid>
      </Grid>
      <Grid container spacing={3} clasNsame={classes.chartList}>
        <Grid item xs={12} sm={12} md={7}>
          <Card variant="outlined" className={classes.pieDetail}>
            {/* <Typography variant="h6" color="primary">
              Withdraw Deposit
            </Typography>{" "} */}
            <CardContent>
              <BarChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Card variant="outlined" className={classes.pieDetail}>
            <Typography variant="h6" color="primary">
              Payment issues
            </Typography>
            <CardContent>
              <PieChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            variant="outlined"
            className={`${classes.dataTable} ${classes.pieDetail}`}
          >
            <Typography variant="h6" color="primary">
              Transaction history{" "}
            </Typography>
            <CardContent>
              <DataTable datatable={datatable} search={false} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
