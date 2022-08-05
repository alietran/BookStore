import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Option from "../../../../components/Option/Option";
import {
  deleteCate,
  deletelCate,
  getCateList,
  getDetailCate,
  updateCate,
} from "../../../../redux/action/categoryAction";
import { LoadingButton } from "@mui/lab";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { useStyles } from "../CreateSupplier/style";
import { deleteSupplier, updateSupplier } from "../../../../redux/action/supplierAction";

export default function OptionSupplier({ id, supplier }) {
  console.log("supplier", supplier);

  const {
    loadingDetailCate,
    successDetailCate,
    errorDetailCate,
    successDeleteCate,
    loadingUpdateCate,
    cateList,
  } = useSelector((state) => state.CateReducer);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cate, setCate] = useState("");
  const [isReadyEditCate, setIsReadyEditCate] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleChangeCategory = (event) => {
    setCate(event.target.value);
  };

  const onClickEdit = () => {
    setOpen(true);
    console.log("idEdit", id);
    console.log("supplier", supplier);
    // dispatch(getDetailCate(id));
  };
  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
    // parentCateId: Yup.string().required("*Vui lòng nhập thông tin này"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: supplier.name,
      phoneNumber: supplier.phoneNumber,
      address: supplier.address,
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      if (loadingUpdateCate) {
        return;
      }
      dispatch(updateSupplier(supplier._id, data));

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
    if (values.name && values.phoneNumber && values.address)
      setIsReadyEditCate(true);
    else setIsReadyEditCate(false);
  }, [values.name, values.parentCateId]);

  const handleUpdate = () => {
    if (isReadyEditCate) setOpen(false);
  };
  const handleClickConfirm = () => {
    setOpenConfirm(true);
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
    dispatch(deleteSupplier(supplier._id));
    console.log("idDelete", supplier._id);
  };
  return (
    <Box>
      {supplier.parentCateId !== "0" && (
        <Option
          // onClickDelete={() => {
          //   onClickDelete(id);
          // }}
          onClickDelete={handleClickConfirm}
          onClickEdit={onClickEdit}
        ></Option>
      )}
      <Dialog
        open={openConfirm}
        // onClose={handleCloseCnfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa thể loại"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xóa NCC này.
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
              Chỉnh sửa thể loại
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
                  label="Tên thể loại "
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  autoComplete="phoneNumber"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Số điện thoại"
                  {...getFieldProps("phoneNumber")}
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
                <TextField
                  fullWidth
                  autoComplete="address"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Địa chỉ"
                  {...getFieldProps("address")}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
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
                loading={loadingUpdateCate}
                onClick={handleUpdate}
                disabled={!isReadyEditCate}
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
