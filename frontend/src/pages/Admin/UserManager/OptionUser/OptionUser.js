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
import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { useStyles } from "../CreateUser/style";
import { deletelUser, updateAdmin } from "../../../../redux/action/adminAction";
import { updateUser } from "../../../../redux/action/userAction";
import Option from "../../../../components/OptionEdit&Delete/Option";

export default function OptionUser({ id, User }) {
  console.log("User", User);
  const [role, setRole] = useState("Admin");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  // const [isReadyEditUser, setIsReadyEditCate] = useState(false);
  const dispatch = useDispatch();
  const { userRoleList } = useSelector((state) => state.AdminReducer);

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
    dispatch(deletelUser(User._id));
    console.log("idDelete", User._id);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const onClickEdit = () => {
    setOpen(true);
    console.log("idEdit", id);
    console.log("User123456", User);
    // dispatch(getDetailCate(id));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idRole: User.idRole._id,
      active: User.active,
    },

    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      let dataUser = {
        active: data.active,
      };
      if (User.googleId || User.phoneUID)
        dispatch(updateUser(User._id, dataUser));
      else dispatch(updateAdmin(User._id, data));

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

  const handleUpdate = () => {
    setOpen(false);
  };
  const handleClickConfirm = () => {
    setOpenConfirm(true);
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
              Chỉnh sửa người dùng
            </ModalDialog>

            <DialogContent dividers>
              <Stack spacing={3}>
                {" "}
                {User.idRole._id && (
                  <FormControl fullWidth>
                    <InputLabel id="role">Quyền</InputLabel>
                    <Select
                      labelId="role"
                      id="role"
                      value={role}
                      label="Quyền"
                      onChange={handleChangeRole}
                      {...getFieldProps("idRole")}
                    >
                      {userRoleList?.data.map((role, index) => {
                        return (
                          <MenuItem
                            value={`${role._id}`}
                            key={index}
                            className="capitalize"
                          >
                            {role.roleName}
                          </MenuItem>
                        );
                      })}

                      {/* <MenuItem value={`Staff`}>Nhân viên</MenuItem> */}
                    </Select>
                  </FormControl>
                )}
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
                // loading={loadingUpdateCate}
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
