import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckIcon from "@mui/icons-material/Check";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#2dc258",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#2dc258",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#2dc258",
    // boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    boxShadow: "0 2px 11px 0 rgba(0,0,0,.5)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#2dc258",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  console.log("props", props);
  const icons = {
    1: <ReceiptIcon />,
    2: <LocalShippingIcon />,
    3: <DomainVerificationIcon/>,
    4: <CheckIcon />,
    5: <StarBorderIcon />,
  };
  const iconCancel = {
    1: <ReceiptIcon />,
    2: <ProductionQuantityLimitsIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
function ColorlibStepIconCancel(props) {
  const { active, completed, className } = props;
  console.log(props);
  const iconCancel = {
    1: <ReceiptIcon />,
    2: <ProductionQuantityLimitsIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {iconCancel[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

ColorlibStepIconCancel.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ["Ch??? x??c nh???n", "??ang v???n chuy???n", "???? giao h??ng" ,"???? nh???n", "????nh gi??"];
const stepsCancel = ["Ch??? x??c nh???n", "???? h???y"];
export default function CustomizedSteppers({ orderDetail, successUpdateOrder }) {
  console.log("successUpdateOrders??,", successUpdateOrder);
  console.log("orderDetail,", orderDetail);
  const [step, setStep] = useState(0);
  const [cancelStatus, setCancelStatus] = useState(0);

  useEffect(() => {
    if (orderDetail !== "undefined" && orderDetail.status === "??ang x??? l??") {
      setStep(0);
    } else if (
      orderDetail !== "undefined" &&
      (orderDetail.status === "??ang v???n chuy???n" ||
        orderDetail.status === "???? h???y")
    ) {
      console.log("Step", step);
      setStep(1);
    } else if (
      orderDetail !== "undefined" &&
      orderDetail.status === "???? ????nh gi??"
    ) {
      setStep(4);
    } else if (
      orderDetail !== "undefined" &&
      orderDetail.status === "???? giao h??ng"
    ) {
      // console.log("!4");
      setStep(2);
    } else setStep(3);
  }, [step, successUpdateOrder, orderDetail]);

  return (
    <div>
      {" "}
      <Stack sx={{ width: "100%", margin: "20px 0" }} spacing={4}>
        {orderDetail !== "undefined" && orderDetail.status !== "???? h???y" ? (
          <Stepper
            alternativeLabel
            activeStep={step}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        ) : (
          <Stepper
            alternativeLabel
            activeStep={step}
            connector={<ColorlibConnector />}
          >
            {stepsCancel.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIconCancel}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </Stack>
    </div>
  );
}
