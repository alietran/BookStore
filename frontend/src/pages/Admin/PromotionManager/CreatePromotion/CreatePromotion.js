import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
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
  const dispatch = useDispatch();
  const [cate, setCate] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

    const handleChangeDate = (newValue) => {
      setValueDate(newValue);
    };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
    desc: Yup.string().required("*Vui lòng nhập thông tin này"),
    code: Yup.string().required("*Vui lòng nhập thông tin này"),
   
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      percent_discount: "",
      price_discount: "",
      desc: "",
      endDate: "",
      code: "",
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data",data);
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
          values.endDate = moment(valueDate)?.format("YYYY-MM-DDTHH:mm:SS");
        }, [valueDate]);

  // useEffect(() => {
  //   if (values.name && values.parentCateId) setIsReadyCreateCate(true);
  //   else setIsReadyCreateCate(false);
  // }, [values.name, values.parentCateId]);

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
                  autoComplete="name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Tên khuyến mãi "
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  autoComplete="percent_discount"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Phần trăm giảm "
                  {...getFieldProps("percent_discount")}
                  error={Boolean(
                    touched.percent_discount && errors.percent_discount
                  )}
                  helperText={
                    touched.percent_discount && errors.percent_discount
                  }
                />
                <TextField
                  fullWidth
                  autoComplete="price_discount"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Giá giảm"
                  {...getFieldProps("price_discount")}
                  error={Boolean(
                    touched.price_discount && errors.price_discount
                  )}
                  helperText={touched.price_discount && errors.price_discount}
                />
                <TextField
                  fullWidth
                  autoComplete="desc"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Mô tả"
                  {...getFieldProps("desc")}
                  error={Boolean(touched.desc && errors.desc)}
                  helperText={touched.desc && errors.desc}
                />
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
                <TextField
                  fullWidth
                  autoComplete="code"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Mã giảm giá"
                  {...getFieldProps("code")}
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && errors.code}
                />
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
