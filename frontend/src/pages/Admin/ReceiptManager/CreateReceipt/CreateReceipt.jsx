import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Breadcrumbs,
  Link,
  Box,
} from "@mui/material";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import BookList from "./BookList";
import { getSupplierList } from "../../../../redux/action/supplierAction";
import { useSelector } from "react-redux";
import BookInfo from "./BookInfo";
import { createReceipt } from "../../../../redux/action/receiptAction";

const steps = [
  "Chọn nhà cung cấp và chọn sách",
  "Tạo phiếu nhập",
  // "Create an ad",
];
export default function CreateReceipt() {
  const { supplierSelected, selectedBook, receiptForm } = useSelector(
    (state) => state.ReceiptReducer
  );
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const dispatch = useDispatch();

  // console.log("selectedBook",selectedBook)
  console.log("supplierSelected", supplierSelected);
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmitReceipt = () => {
    dispatch(createReceipt(receiptForm));
    history.push("/admin/receipts/list");
  };
  useEffect(() => {
    dispatch(getSupplierList());
  }, []);

  const history = useHistory();
  return (
    <Container
      sx={{ paddingRight: "0px !important", paddingLeft: "0px !important" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        mt={3}
      >
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Tạo phiếu nhập hàng
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} sx={{ margin: "0px 85px" }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            {activeStep === 0 && <BookList />}
            {activeStep === 1 && <BookInfo />}
            {activeStep === 2 && <div></div>}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {/* {activeStep !== 0 && (
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
              )} */}
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Quay lại
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep !== steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={selectedBook ? false : true}
                >
                  {activeStep !== steps.length - 1 && "Tiếp"}
                </Button>
              ) : (
                <Button onClick={handleSubmitReceipt}>
                  {activeStep === steps.length - 1 && "Hoàn thành"}
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}
