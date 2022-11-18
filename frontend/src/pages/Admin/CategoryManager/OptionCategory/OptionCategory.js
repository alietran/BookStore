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

import {
  deleteCate,
  deletelCate,
  getCateList,
  getDetailCate,
  updateCate,
} from "../../../../redux/action/categoryAction";
import { LoadingButton } from "@mui/lab";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { useStyles } from "../CreateCategory/style";
import Option from "../../../../components/OptionEdit&Delete/Option";
import { useSnackbar } from "notistack";

export default function OptionCategory({ id, theCategory }) {
  console.log("theCategory", theCategory);
  const { enqueueSnackbar } = useSnackbar();
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
    console.log("theCategory", theCategory);
    // dispatch(getDetailCate(id));
  };
  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
    // parentCateId: Yup.string().required("*Vui lòng nhập thông tin này"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: theCategory.name,
      parentCateId: theCategory.parentCateId,
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      if (loadingUpdateCate) {
        return;
      }
      dispatch(updateCate(theCategory._id, data));

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
    if (values.name && values.parentCateId) setIsReadyEditCate(true);
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
      dispatch(deleteCate(theCategory._id));
       enqueueSnackbar("Xóa thể loại thành công!", { variant: "success" });
      console.log("idDelete", theCategory._id);
    };
  return (
    <Box>
      {theCategory.parentCateId !== "0" && (
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
            Bạn chắc chắn muốn xóa thể loại này.
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
                <Select
                  labelId="parentCateId"
                  id="parentCateId"
                  value={cate}
                  name="parentCateId"
                  label="Thể loại cha"
                  onChange={handleChangeCategory}
                  {...getFieldProps("parentCateId")}
                >
                  {cateList?.data.map((cate, index) => {
                    console.log("cate", cate);
                    return (
                      <MenuItem value={`${cate._id}`} key={index}>
                        {cate.name}
                      </MenuItem>
                    );
                  })}

                  {/* <MenuItem value={`Nữ`}>Nữ</MenuItem> */}
                </Select>
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
