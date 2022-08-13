import { Button, Card, Dialog, DialogActions, DialogContent, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useStyles from "./style";
import AddIcon from '@mui/icons-material/Add';
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";

import { LoadingButton } from "@mui/lab";

export default function Address() {
  const classes = useStyles();
 const [open, setOpen] = useState(false);
   const handleClose = () => {
    setOpen(false);
  };
  //   const [isReadyCreateCate, setIsReadyCreateCate] = useState(false);
  //   useEffect(() => {
  //   if (
  //     values.name 
     
  //   )
  //     setIsReadyCreateCate(true);
  //   else setIsReadyCreateCate(false);
  // }, [
  //   values.name,
   
  // ]);
   const handleCreate = () => {
    // if (isReadyCreateCate) 
    setOpen(false);
  };

  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
  
  });
  const handleClickOpen = () => {
    setOpen(true);
  };


 const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      // if (loadingCreateAuthor) {
      //   return;
      // }
      // dispatch(createAuthor(data));
      resetForm();
      setOpen(false);
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
  return (
    <div>
      <Typography component="div" variant="subtitle1">
        Thông tin nhận hàng
      </Typography>
      <div className={classes.address}>
        <div className={classes.address__detail}>
          <div className={classes.address__option}>
            <p className={classes.address__detailName}>Thành Đạt</p>
            <div>
              <img
                className={classes.address__img}
                src="./img/icon-edit.svg"
                alt="icon-edit"
              />
            </div>
            <div>
              <i
                className="fa-solid fa-trash-can"
                style={{ color: "#3498DB", padding: " 0 10px" }}
              ></i>
            </div>
          </div>
          <p style={{ color: "#999999" }}>Đia chỉ </p>
          <p>phone</p>
          <div>
            <div className={classes.border__checked}></div>
            <span className={classes.checked}>
              <img
                className={classes.address__img}
                src="./img/icon-check.svg"
                alt="icon-check"
              />
            </span>
          </div>
        </div>
        <div className={classes.address__detail}  onClick={handleClickOpen}>
          <div className={classes.address__detailAdd}>
            <AddIcon />
            <p style={{ color: "#999999" }}>Add address</p>
          </div>
        </div>
         <Dialog
        open={open}
        onClose={handleClose}
        className="text-center"
        fullWidth={true}
        maxWidth="md"
      >
        <Formik value={formik}>
          <Form onSubmit={handleSubmit}>
            <ModalDialog
              sx={{ fontSize: "23px !important" }}
              onClose={handleClose}
            >
              {" "}
              Tạo tác giả mới
            </ModalDialog>

            <DialogContent dividers>
              {/* <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3 "> */}
              <Card
                sx={{
                  borderRadius: " 16px",
                  zIndex: 0,
                  padding: " 20px 24px",
                }}
              >
                <Stack spacing={3}>
                  {" "}
                  <TextField
                    fullWidth
                    autoComplete="name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Họ tên"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>
              </Card>
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
                // loading={loadingCreateAuthor}
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
      </div>
    </div>
  );
}
