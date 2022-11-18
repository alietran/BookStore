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
import { useStyles } from "../CreateShipper/style";
import { deletelUser, updateUser } from "../../../../redux/action/adminAction";
import { deleteShipper, getDetailShipper, updateShipper } from "../../../../redux/action/shipperAction";
import Option from "../../../../components/OptionEdit&Delete/Option";

export default function OptionUser({ id, shipper }) {
  console.log("shipper", shipper);
  const [role, setRole] = useState("Admin");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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
    dispatch(deleteShipper(shipper._id));
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const onClickEdit = () => {
    setOpen(true);
    dispatch(getDetailShipper(id));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      
      active: shipper.active,
    },

    onSubmit: (data, { resetForm }) => {
        if (loadingUpdateShipper) {
          return;
        }
      dispatch(updateShipper(shipper._id, data));

      resetForm();
    },
  });

  const {
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;

  const handleUpdate = () => {
    setOpen(false);
  };
  const handleClickConfirm = () => {
    setOpenConfirm(true);
  };

  return (
    <Box>
      <Option
        onClickDelete={handleClickConfirm}
        onClickEdit={onClickEdit}
      ></Option>
      <Dialog
        open={openConfirm}
        // onClose={handleCloseCnfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa shipper"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xóa shipper này.
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
              Chỉnh sửa người dùng
            </ModalDialog>

            <DialogContent dividers>
              <Stack spacing={3}>
                <FormGroup>
                  <FormControlLabel
                    label="Trạng Thái"
                    control={
                      <Switch
                        checked={values.active}
                        value={values.active}
                        onChange={handleChangeStatus}
                        name="active"
                      />
                    }
                    {...getFieldProps("active")}
                  />
                </FormGroup>
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
