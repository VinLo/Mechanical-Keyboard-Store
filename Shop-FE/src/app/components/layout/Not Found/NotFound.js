import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
const NotFound = () => {
  return (
    <div className="PageNotFound">
      <SentimentVeryDissatisfiedIcon style={{ color: "#444444" }} />

      <Typography style={{ color: "#444444" }}>404 Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
