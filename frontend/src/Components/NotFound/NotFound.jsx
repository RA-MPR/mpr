import { Paper, Typography } from "@material-ui/core";
import React from "react";
import "./NotFound.css";

const NotFound = () => (
  <div className="divNotFound">
    <Paper className="paperNotFound">
      <Typography variant="h1">Chyba 404</Typography>
      <Typography variant="h4">Stránka nenalezena!</Typography>
    </Paper>
  </div>
);

export default NotFound;
