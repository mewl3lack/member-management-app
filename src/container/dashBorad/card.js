import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

export default function OutlinedCard({ color, label, amount }) {
  const classes = useStyles();

  return (
    <Card className={classes.rootCard} variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h2">
          {label}
        </Typography>

        <Typography variant="body1" component="p" style={{ color: color }}>
          {amount}
        </Typography>
      </CardContent>
    </Card>
  );
}
