import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";

export default function CreateUser({ setCreateStatus }) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.formCreate}>
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Tel no."
            placeholder="000-000-0000"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}></Grid> <Grid item md={2} />
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Bank</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="" disabled>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>1</MenuItem>
              <MenuItem value={20}>2</MenuItem>
              <MenuItem value={30}>3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Bank Account no."
            variant="outlined"
          />
        </Grid>
        <Grid item md={2} /> <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            placeholder="000-000-0000"
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            id="outlined-basic"
            label="first name"
            variant="outlined"
            placeholder="first name"
          />
        </Grid>
        <Grid item md={2} />
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Surname"
            placeholder="Surname"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}></Grid> <Grid item md={2} />
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            id="outlined-basic"
            label="PIN"
            placeholder="xxxxxx"
            variant="outlined"
            type="password"
            style={{ width: "60%" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}></Grid>
        <Grid item md={2} /> <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              How Did You Hear About Us
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="" disabled>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>1</MenuItem>
              <MenuItem value={20}>2</MenuItem>
              <MenuItem value={30}>3</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={12} sm={12} md={4}></Grid>
        <Grid item md={2} />
      </Grid>
      <Grid container spacing={3} className={classes.groupButton}>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            onClick={() => setCreateStatus(false)}
            style={{ textAlign: "-webkit-right" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            style={{ background: "#23C19A" }}
            onClick={() => setCreateStatus(true)}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Divider className={classes.fullDivider} />
    </React.Fragment>
  );
}
