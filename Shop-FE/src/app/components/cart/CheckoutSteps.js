import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import React, { Fragment } from "react";
import InfoIcon from "@mui/icons-material/Info";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Thông tin liên lạc</Typography>,
      icon: <InfoIcon />,
    },
    {
      label: <Typography>Xác nhận đơn hàng</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Thanh toán</Typography>,
      icon: <LocalAtmIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    background:
      "linear-gradient(45deg,rgba(66, 183, 245, 0.8) 0%,rgba(66, 245, 189, 0.4) 100%)",
  };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#f1870c" : "rgba(0,0,0,0.649",
              }}
              icon={item.icon}
            >
              {" "}
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
