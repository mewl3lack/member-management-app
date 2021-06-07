import React from "react";
import Grid from "@material-ui/core/Grid";
import CreateUser from "./createForm";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { useStyles } from "./styles";
import DataTable from "../../component/dataTable";
import random from "random-name";
import Button from "@material-ui/core/Button";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";

export default function User() {
  const classes = useStyles();
  let rows = [];
  let columns = [
    {
      label: "Name",
      field: "name",
      width: 150,
      attributes: {
        "aria-controls": "DataTable",
        "aria-label": "Name",
      },
    },
    {
      label: "Bank",
      field: "Bank",
      width: 270,
    },
    {
      label: "Bank account number",
      field: "BankAccountNumber",
      width: 270,
    },
    {
      label: "Create Date and time",
      field: "date",
      sort: "asc",
      width: 100,
    },
  ];
  const [datatable, setDatatable] = React.useState({
    columns,
  });
  const [createStatus, setCreateStatus] = React.useState(false);

  React.useEffect(() => {
    for (let i = 0; i < 30; i++) {
      rows.push({
        name: random.first() + " " + random.last(),
        Bank: i % Math.floor(Math.random() * 10 + 1) === 0 ? "SCB" : "KBANK",
        date: "2021/09/15",
        BankAccountNumber: Math.floor(Math.random() * 10000000000 + 1),
      });
    }
    setDatatable({
      columns,
      rows,
    });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <Card className={classes.root} variant="outlined">
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} md={8}>
              <Typography variant="h6" color="primary">
                {createStatus ? "Create member" : " Member List"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={4} className={classes.flexEnd}>
              {createStatus ? (
                ""
              ) : (
                <Button
                  variant="contained"
                  disableElevation
                  color="primary"
                  className={classes.createButton}
                  startIcon={<AddTwoToneIcon />}
                  onClick={() => setCreateStatus(true)}
                >
                  Create User
                </Button>
              )}
            </Grid>
          </Grid>{" "}
          {createStatus ? <CreateUser setCreateStatus={setCreateStatus} /> : ""}
          <CardContent>
            {createStatus ? (
              <Typography
                variant="body1"
                color="primary"
                style={{ marginLeft: "0px !impotant" }}
              >
                Member List
              </Typography>
            ) : (
              ""
            )}

            <DataTable datatable={datatable} search={false} type={"border"} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
