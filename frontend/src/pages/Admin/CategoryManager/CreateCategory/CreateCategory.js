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
import { createCate } from "../../../../redux/action/categoryAction";

export default function CreateCategory() {
  // const { loadingCreateCate, successCreateCate } = useSelector(
  //   (state) => state.CateReducer
  // );
   const { cateList, successCreateCate,loadingCreateCate, successUpdateCate } = useSelector(
     (state) => state.CateReducer
   );
   console.log("cateList", cateList)
  const [isReadyCreateCate, setIsReadyCreateCate] = useState(false);

  const dispatch = useDispatch();
  const [cate, setCate] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleChangeCategory = (event) => {
    setCate(event.target.value);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
   
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      parentCateId: "",
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data");
      if (loadingCreateCate) {
        return;
      }
      dispatch(createCate(data));

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
    if (values.name && values.parentCateId) setIsReadyCreateCate(true);
    else setIsReadyCreateCate(false);
  }, [values.name, values.parentCateId]);

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
        Thêm thể loại
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
              Tạo thể loại
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
                <FormControl fullWidth>
                  <InputLabel id="gender">Thể loại cha</InputLabel>
                  {/* {userRoleList?.data.map((role, index) => {
                    return (
                      <MenuItem
                        value={`${role._id}`}
                        key={index}
                        className="capitalize"
                      >
                        {role.roleName}
                      </MenuItem>
                    );
                  })} */}
                  <Select
                    labelId="parentCateId"
                    id="parentCateId"
                    value={cate}
                    name="parentCateId"
                    label="Thể loại cha"
                    onChange={handleChangeCategory}
                    {...getFieldProps("parentCateId")}
                  >
                    {/* <MenuItem value={`${cate.id}` === 0}>Thể loại gốc</MenuItem> */}
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
                </FormControl>
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
                loading={loadingCreateCate}
                onClick={handleCreate}
                disabled={!isReadyCreateCate}
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
