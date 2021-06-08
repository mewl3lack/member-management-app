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
import axios from 'axios';

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
      sort: 'disabled',
    },
    {
      label: "Bank account number",
      field: "BankAccountNumber",
      width: 270,         sort: 'disabled',

    },
    {
      label: "Create Date and time",
      field: "date",
      sort: "asc",
      width: 100,        sort: 'disabled',

    },
  ];
  const [datatable, setDatatable] = React.useState({
    columns,
  });
  const [createStatus, setCreateStatus] = React.useState(false);

  React.useEffect(() => {
    getDataFromAPI()
  }, []);


  const getDataFromAPI = () => {
    var config = {
      method: 'get',
      url: 'http://ec2-18-117-124-197.us-east-2.compute.amazonaws.com/api/member/getList',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RBZG1pbiIsInVzZXJJZCI6IjYwYmQwY2NmOTIzMmRlMDY3ZjJmZDU4NCIsImlhdCI6MTYyMzE1OTU0NywiZXhwIjoxNjIzMTYzMTQ3fQ.lTEKw5U4tz9lZt2gNNQRouo7QeZT1leWgQCuM-I1exY'
      }
    };
    axios(config)
    .then(function (response) {
       getDataObject(response)
     })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  function getDataObject(dataItems) {
    if (dataItems !== undefined  ) {
       let len = dataItems.data.length;
      for (let i = 0; i < len; i++) {
        rows.push({
          name: dataItems.data[i].first_name +' '+dataItems.data[i].last_name,
          Bank: dataItems.data[i]._id  ,
          BankAccountNumber: dataItems.data[i]._id  ,
          date: dataItems.data[i]._id  , 
        });     

      }

         setDatatable({
      columns,
      rows,
    });
     }
  }


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
