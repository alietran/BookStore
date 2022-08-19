import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { styled } from "@mui/material/styles";
import { useStyles } from "./style";
import { LoadingButton } from "@mui/lab";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { createPromotion } from "../../../../redux/action/promotionAction";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";

export default function CreatePromotion() {
  // const { loadingCreateCate, successCreateCate } = useSelector(
  //   (state) => state.CateReducer
  // );
  const { promotionList, loadingCreatePromotion } = useSelector(
    (state) => state.PromotionReducer
  );
  // console.log("cateList", cateList);
  const [isReadyCreateCate, setIsReadyCreateCate] = useState(false);
  const [valueDate, setValueDate] = useState(null);
  const [valueDateStart, setValueDateStart] = useState(null);
  const dispatch = useDispatch();
  const [cate, setCate] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleChangeDate = (newValue) => {
    setValueDate(newValue);
  };
  const handleChangeDateStart = (newValue) => {
    setValueDateStart(newValue);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Createchema = Yup.object().shape({
    title: Yup.string().required("*Vui lòng nhập thông tin này"),

    code: Yup.string().required("*Vui lòng nhập thông tin này"),
    price: Yup.string().required("*Vui lòng nhập thông tin này"),
    miniPrice: Yup.string().required("*Vui lòng nhập thông tin này"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      price: "",
      miniPrice: "",
      code: "",
      startDate: "",
      expiryDate: "",
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      if (loadingCreatePromotion) {
        return;
      }
      dispatch(createPromotion(data));

      resetForm();
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;

  useEffect(() => {
    values.expiryDate = moment(valueDate)?.format("YYYY-MM-DDTHH:mm:SS");
  }, [valueDate]);
  useEffect(() => {
    values.startDate = moment(valueDateStart)?.format("YYYY-MM-DDTHH:mm:SS");
  }, [valueDateStart]);

  useEffect(() => {
    if (values.title && values.price && values.miniPrice && values.code)
      setIsReadyCreateCate(true);
    else setIsReadyCreateCate(false);
  }, [values.title, values.price, values.miniPrice, values.code]);

  const handleCreate = () => {
    if (isReadyCreateCate) setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        component={RouterLink}
        onClick={handleClick}
        to="#"
        startIcon={<Icon icon={plusFill} />}
        sx={{ "&:hover": { color: "#fff" } }}
      >
        Thêm chương trình KM
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        className="text-center"
        fullWidth={true}
        maxWidth="xs"
      >
        <Formik value={formik}>
          <Form onSubmit={handleSubmit}>
            <ModalDialog
              sx={{ fontSize: "23px !important" }}
              onClose={handleClose}
            >
              {" "}
              Tạo khuyến mãi
            </ModalDialog>

            <DialogContent dividers>
              <Stack spacing={3}>
                {" "}
                <TextField
                  fullWidth
                  autoComplete="title"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Tên khuyến mãi "
                  {...getFieldProps("title")}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  fullWidth
                  autoComplete="price"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Giảm giá"
                  {...getFieldProps("price")}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
                <TextField
                  fullWidth
                  autoComplete="miniPrice"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Điều kiện"
                  {...getFieldProps("miniPrice")}
                  error={Boolean(touched.miniPrice && errors.miniPrice)}
                  helperText={touched.miniPrice && errors.miniPrice}
                />
                <TextField
                  fullWidth
                  autoComplete="code"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Mã giảm"
                  {...getFieldProps("code")}
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && errors.code}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Ngày bắt đầu"
                      inputFormat="MM/dd/yyyy"
                      value={valueDateStart}
                      onChange={handleChangeDateStart}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Ngày hết hạn"
                      inputFormat="MM/dd/yyyy"
                      value={valueDate}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ margin: "0 16px !important" }}>
              <Button
                sx={{
                  color: "gray",
                  borderColor: "gray ",
                  "&:hover": { color: "primary.main" },
                  width: "100%",
                  height: "33px !important",
                }}
                variant="outlined"
                onClick={handleClose}
                className={classes.buttonCreate}
              >
                Huỷ
              </Button>
              <LoadingButton
                sx={{ width: "100%", height: "33px !important" }}
                size="large"
                type="submit"
                variant="contained"
                loading={loadingCreatePromotion}
                onClick={handleCreate}
                // disabled={!isReadyCreateCate}
                className={classes.buttonCreate}
              >
                Tạo
              </LoadingButton>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </Box>
  );
}
