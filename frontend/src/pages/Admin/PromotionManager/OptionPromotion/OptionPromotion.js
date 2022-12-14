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
import {
  deletePromotion,
  getDetailPromotion,
  updatePromotion,
} from "../../../../redux/action/promotionAction";

export default function OptionPromotion({ id, promotion }) {
  console.log("shipper", promotion);
  const [role, setRole] = useState("Admin");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
    const [valueDateStart, setValueDateStart] = useState(null);
  const [valueDate, setValueDate] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  // const [isReadyEditshipper, setIsReadyEditCate] = useState(false);
  const dispatch = useDispatch();
  const { loadingUpdatePromotion } = useSelector((state) => state.PromotionReducer);
  const handleChangeDateStart = (newValue) => {
    setValueDateStart(newValue);
  };
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
    const promotions = {
      activeCode: "K???t th??c",
    };
    console.log("promotions", promotions);
    dispatch(updatePromotion(promotion._id, promotions));
    // onClickDelete(id);
  };

  const onClickEnd = () => {
    setOpenConfirm(true);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const onClickEdit = () => {
    setOpen(true);
    // console.log("idEdit", id);
    // console.log("promotion", promotion);
    dispatch(getDetailPromotion(id));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: promotion.title,
      price:promotion.price,
      miniPrice: promotion.miniPrice,
      startDate:
        moment(valueDateStart).format("YYYY-MM-DD") !== "Invalid date"
          ? moment(valueDateStart).format("YYYY-MM-DD")
          : moment(promotion.startDate).format("YYYY-MM-DD"),
      expiryDate:
        moment(valueDate).format("YYYY-MM-DD") !== "Invalid date"
          ? moment(valueDate).format("YYYY-MM-DD")
          : moment(promotion.expiryDate).format("YYYY-MM-DD"),
    },

    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      if (loadingUpdatePromotion) {
        return;
      }
      dispatch(updatePromotion(promotion._id, data));

      resetForm();
    },
  });
  useEffect(() => {
    values.startDate = moment(promotion.startDate)?.format(
      "YYYY-MM-DDTHH:mm:SS"
    );
  }, [valueDateStart]);
  useEffect(() => {
    values.expiryDate = moment(promotion.expiryDate)?.format(
      "YYYY-MM-DDTHH:mm:SS"
    );
  }, [valueDate]);

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
      {/* <Option
        // () => {
        //         // onClick = { handleClickOpen };
        //         onClickDelete(id);
        //       }
        onClickDelete={handleClickConfirm}
        onClickEdit={onClickEdit}
      ></Option> */}
      {promotion.activeCode !== "K???t th??c" ? (
        <Box>
          <Button
            variant="contained"
            sx={{ margin: "10px" }}
            onClick={onClickEdit}
          >
            Ch???nh s???a{" "}
          </Button>
          <br />
          <Button variant="outlined" color="error" onClick={onClickEnd}>
            K???t th??c
          </Button>
        </Box>
      ) : (
        ""
      )}

      <Dialog
        open={openConfirm}
        // onClose={handleCloseCnfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"K???t th??c khuy???n m??i"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            B???n ch???c ch???n mu???n d???ng khuy???n m??i n??y.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>H???y</Button>
          <Button onClick={handleCloseConfirm} autoFocus>
            ?????ng ??
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
              Ch???nh s???a khuy???n m??i
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
                  label="T??n khuy???n m??i "
                  {...getFieldProps("title")}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                {promotion.activeCode !== "??ang di???n ra" ? (
                  <>
                    {" "}
                    <TextField
                      fullWidth
                      autoComplete="price"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Gi???m gi??"
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
                      label="??i???u ki???n"
                      {...getFieldProps("miniPrice")}
                      error={Boolean(touched.miniPrice && errors.miniPrice)}
                      helperText={touched.miniPrice && errors.miniPrice}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          label="Ng??y b???t ?????u"
                          inputFormat="MM/dd/yyyy"
                          value={
                            valueDateStart
                              ? valueDateStart
                              : moment(promotion.startDate).format("YYYY-MM-DD")
                          }
                          onChange={handleChangeDateStart}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      autoComplete="price"
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Gi???m gi??"
                      {...getFieldProps("price")}
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                    />
                    <TextField
                    disabled
                      fullWidth
                      autoComplete="miniPrice"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="??i???u ki???n"
                      {...getFieldProps("miniPrice")}
                      error={Boolean(touched.miniPrice && errors.miniPrice)}
                      helperText={touched.miniPrice && errors.miniPrice}
                    />
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          label="Ng??y b???t ?????u"
                          inputFormat="MM/dd/yyyy"
                          disabled
                          value={
                            valueDateStart
                              ? valueDateStart
                              : moment(promotion.startDate).format("YYYY-MM-DD")
                          }
                          onChange={handleChangeDateStart}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </>
                )}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Ng??y h???t h???n"
                      inputFormat="MM/dd/yyyy"
                      value={
                        valueDate
                          ? valueDate
                          : moment(promotion.expiryDate).format("YYYY-MM-DD")
                      }
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
                Hu???
              </Button>
              <LoadingButton
                sx={{ width: "100%", height: "33px !important" }}
                size="large"
                type="submit"
                variant="contained"
                loading={loadingUpdatePromotion}
                onClick={handleUpdate}
                // disabled={!isReadyEditCate}
                className={classes.buttonCreate}
              >
                Ch???nh s???a
              </LoadingButton>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </Box>
  );
}
