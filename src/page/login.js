import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useStyles } from "../style/login";
import axios from 'axios';


export default function Login() {
  const classes = useStyles();
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState(false);
  const [messageError, setMsgError] = useState(" Invalid Email or Password");

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]:
        [e.target.name] == "remember" ? e.target.checked : e.target.value,
    }));
  };

  const onSubmit = (e) => {
    if (data.email !== "" && data.password !== "") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
      urlencoded.append("username", data.email);
      urlencoded.append("password", data.password);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      fetch("http://ec2-18-117-124-197.us-east-2.compute.amazonaws.com/api/employee/login", requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result)
        JSON.parse(result)
        localStorage.setItem("token",`?&token=${JSON.parse(result).token}`);
        if(JSON.parse(result).token !== undefined){
        window.location.href = `/dashBorad?&token=${JSON.parse(result).token}`;  
      }else{
        setError(true)
      }
       })
      
    } else {
      setError(true);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <form className={classes.form} noValidate autoComplete="off">
          <Typography variant="h6" gutterBottom>
            Account Login
          </Typography>
          <div className={classes.loginForm}>
            <TextField
              id="outlined-adornment-email"
              variant="outlined"
              label="Email"
              name="email"
              error={error && data.email === "" ||error? true : false}
              className={classes.inputField}
              value={data.email}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonOutlineOutlinedIcon className={classes.svgLogin} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-adornment-email"
              variant="outlined"
              type="password"
              label="Password"
              name="password"
              error={error && data.password === "" ||error ? true : false}
              helperText={error ? error : ""}
              className={classes.inputField}
              value={data.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockOutlinedIcon className={classes.svgLogin} />
                  </InputAdornment>
                ),
              }}
            />
            {error && (data.email === "" || data.password === "") ||error? (
              <Typography className={classes.errorTypo}>
                {messageError}
              </Typography>
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.remember}
                  onChange={handleChange}
                  name="remember"
                  color="primary"
                />
              }
              className={classes.checkboxLabel}
              label="Remember me"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonPrimaryContained}
              onClick={onSubmit}
              disableElevation
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
