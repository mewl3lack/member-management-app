import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Skeleton from "@material-ui/lab/Skeleton";

export function TextCustom({
  onChange,
  value,
  name,
  placeholder,
  label,
  checkValidate,
}) {
  return (
    <TextField
      id="outlined-basic"
      value={value}
      label={label}
      placeholder={placeholder}
      variant="outlined"
      onChange={onChange}
      inputProps={{
        maxLength:
          name === "pin"
            ? 6
            : name === "bankAccount" || name === "tel"
            ? 10
            : "",
      }}
      name={name}
      type={name === "pin" ? "password" : ""}
      style={{ width: name === "pin" ? "60%" : "100%" }}
      error={checkValidate && value === ""}
      helperText={checkValidate && value === "" ? `please enter ${label}` : ""}
    />
  );
}
export function AutoCompleteCustom({
  onChange,
  tag,
  option,
  name,
  value,
  label,
  checkValidate,
}) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={option}
      name={name}
      disableClearable
      getOptionLabel={(option) => option.title}
      onChange={(e, values) => {
        onChange(e, values, tag);
      }}
      value={value.title}
      renderInput={(params) => (
        <TextField
          {...params}
          error={checkValidate && value === ""}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}
export default function CreateUser({
  optionBank,
  optionSource,
  createMember,
  checkValidate,
  handleChange,
  data,
  setCreateStatus,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.formCreate}>
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={"h3"}>
            <Skeleton width={340} />{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={"h3"}>
            <Skeleton width={340} />{" "}
          </Typography>
        </Grid>{" "}
        <Grid item md={2} />
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={"h3"}>
            <Skeleton width={340} />{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={"h3"}>
            <Skeleton width={340} />{" "}
          </Typography>
        </Grid>
        <Grid item md={2} />
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={"h3"}>
            <Skeleton width={340} />{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={"h3"}>
            <Skeleton width={340} />{" "}
          </Typography>
        </Grid>
        <Grid item md={2} />
        <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={"h3"}>
            <Skeleton width={340} />{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}></Grid>
        <Grid item md={2} /> <Grid item md={2} />
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="div" variant={"h3"}>
            <Skeleton width={340} />{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}></Grid>
        <Grid item md={2} />
      </Grid>
      <Grid container spacing={3} className={classes.groupButton}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Skeleton width={130} height={80} />
          <Skeleton width={130} height={80} style={{ marginLeft: "8px" }} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
