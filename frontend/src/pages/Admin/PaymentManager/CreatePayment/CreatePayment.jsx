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


export default function CreatePayment() {
  // const { loadingCreateCate, successCreateCate } = useSelector(
  //   (state) => state.CateReducer
  // );
  const { loadingCreateSupplier } = useSelector(
    (state) => state.SupplierReducer
  );

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
     
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      if (loadingCreateSupplier) {
        return;
      }
    //   dispatch(createSupplier(data));

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
    if (values.name && values.address && values.phoneNumber)
      setIsReadyCreateCate(true);
    else setIsReadyCreateCate(false);
  }, [values.name, values.address, values.phoneNumber]);

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
        Thêm NCC
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
              Tạo NCC
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
                  label="Tên NCC"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
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
                loading={loadingCreateSupplier}
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
