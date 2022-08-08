import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import React, { useEffect, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import Option from "../../../../components/Option/Option";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { useStyles } from "../CreatePromotion/style";
import { deletelUser, updateUser } from "../../../../redux/action/adminAction";
import {
  deleteShipper,
  getDetailShipper,
  updateShipper,
} from "../../../../redux/action/shipperAction";
import {
 
  getDetailAuthor,
  updateAuthor,
  updateAUTHOR,
} from "../../../../redux/action/authorAction";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { deletePromotion, getDetailPromotion, updatePromotion } from "../../../../redux/action/promotionAction";


export default function OptionPromotion({ id, promotion }) {
  console.log("shipper", promotion);
  const [role, setRole] = useState("Admin");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [valueDate, setValueDate] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  // const [isReadyEditshipper, setIsReadyEditCate] = useState(false);
  const dispatch = useDispatch();
  const { loadingUpdateShipper } = useSelector((state) => state.ShipperReducer);

  const handleChangeStatus = (event, checked) => {
    setFieldValue("active", checked ? true : false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpenConfirm(false);
  };
  // handleCancel;
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    onClickDelete(id);
  };

  const onClickDelete = (id) => {
    dispatch(deletePromotion(promotion._id));
    console.log("idDelete", promotion._id);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const onClickEdit = () => {
    setOpen(true);
    console.log("idEdit", id);
    console.log("promotion", promotion);
    dispatch(getDetailPromotion(id));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: promotion.name,
      percent_discount: promotion.percent_discount,
      price_discount: promotion.price_discount,
      desc: promotion.desc,
      endDate: promotion.endDate,
      code: promotion.code,
    },

    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      if (loadingUpdateShipper) {
        return;
      }
      dispatch(updatePromotion(promotion._id, data));

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
  // useEffect(() => {
  //   if (values.name && values.slug) setIsReadyEditCate(true);
  //   else setIsReadyEditCate(false);
  // }, [values.name, values.slug]);
  useEffect(() => {
    values.endDate = moment(valueDate)?.format("YYYY-MM-DDTHH:mm:SS");
  }, [valueDate]);
  const handleUpdate = () => {
    setOpen(false);
  };
  const handleClickConfirm = () => {
    setOpenConfirm(true);
  };
  const handleChangeDate = (newValue) => {
    setValueDate(newValue);
  };

  return (
    <Box>
      <Option
        // () => {
        //         // onClick = { handleClickOpen };
        //         onClickDelete(id);
        //       }
        onClickDelete={handleClickConfirm}
        onClickEdit={onClickEdit}
      ></Option>
      <Dialog
        open={openConfirm}
        // onClose={handleCloseCnfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa người dùng"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xóa người dùng này.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button onClick={handleCloseConfirm} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
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
              Chỉnh sửa khuyến mãi
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
                loading={loadingUpdateShipper}
                onClick={handleUpdate}
                // disabled={!isReadyEditCate}
                className={classes.buttonCreate}
              >
                Chỉnh sửa
              </LoadingButton>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </Box>
  );
}
