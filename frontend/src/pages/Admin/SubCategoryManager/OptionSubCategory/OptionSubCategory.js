import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import Option from "../../../../components/Option/Option";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { useStyles } from "../SubCreateCategory/style";

export default function OptionSubCategory({ id, theSubCategory }) {
  const {
    loadingDetailCate,
    successDetailCate,
    errorDetailCate,
    loadingUpdateCate,
  } = useSelector((state) => state.CateReducer);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isReadyEditCate, setIsReadyEditCate] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const onClickDelete = (id) => {
    console.log("idDelete", id);
  };

  const onClickEdit = () => {
    setOpen(true);
    console.log("idEdit", id);
    console.log("theSubCategory", theSubCategory);
    // dispatch(getDetailCate(id));
  };
  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
    slug: Yup.string().required("*Vui lòng nhập thông tin này"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: theSubCategory.name,
      slug: theSubCategory.slug,
      remember: true,
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
    //   if (loadingUpdateCate) {
    //     return;
    //   }
    //   dispatch(updateCate(theSubCategory._id, data));

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
    if (values.name && values.slug) setIsReadyEditCate(true);
    else setIsReadyEditCate(false);
  }, [values.name, values.slug]);

  const handleUpdate = () => {
    if (isReadyEditCate) setOpen(false);
  };

  return (
    <Box>
      <Option
        onClickDelete={() => {
          onClickDelete(id);
        }}
        onClickEdit={onClickEdit}
      ></Option>

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
              Tạo danh mục
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
                  label="Tên danh mục "
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  autoComplete="code"
                  label="Bí danh"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="mt-0"
                  {...getFieldProps("slug")}
                  error={Boolean(touched.slug && errors.slug)}
                  helperText={touched.slug && errors.slug}
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
