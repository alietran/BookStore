import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import { Link as RouterLink, useHistory } from "react-router-dom";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { styled } from "@mui/material/styles";
import { useStyles } from "./style";
import { LoadingButton } from "@mui/lab";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import moment from "moment";

import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { createShipper } from "../../../../redux/action/shipperAction";
import { createAuthor } from "../../../../redux/action/authorAction";

export default function CreateAuthor() {
  const { loadingCreateAuthor } = useSelector((state) => state.AuthorReducer);
  // console.log("userRoleList", userRoleList);
  const [srcImage, setSrcImage] = useState(null);
  const handleChangeFile = (e) => {
    //doc file base 64
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      // sau khi thực hiên xong lênh trên thì set giá trị có được
      setSrcImage(e.target.result);
    };
    // Đem dữ liệu file lưu vào formik
    formik.setFieldValue("avatar", file);
  };
  const [isReadyCreateCate, setIsReadyCreateCate] = useState(false);
  const [gender, setGender] = useState("Nam");

  const [valueDate, setValueDate] = useState(null);


  const handleChangeDate = (newValue) => {
    setValueDate(newValue);
  };
  const handleChangeStatus = (event, checked) => {
    setFieldValue("active", checked ? true : false);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

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
      if (loadingCreateAuthor) {
        return;
      }
      dispatch(createAuthor(data));
      resetForm();
      setOpen(false);
    },
  });



  useEffect(() => {
    values.dateOfBirth = moment(valueDate)?.format("YYYY-MM-DDTHH:mm:SS");
  }, [valueDate]);



  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (
      values.name 
     
    )
      setIsReadyCreateCate(true);
    else setIsReadyCreateCate(false);
  }, [
    values.name,
   
  ]);

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
        Thêm tác giả
      </Button>

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
                loading={loadingCreateAuthor}
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
    </Box>
  );
}
