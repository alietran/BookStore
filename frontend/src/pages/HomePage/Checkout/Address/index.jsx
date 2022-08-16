import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./style";
import AddIcon from "@mui/icons-material/Add";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";

import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getListProvinces } from "../../../../redux/action/addressAction";

export default function Address() {
  const { addressProvincesList } = useSelector((state) => state.AddressReducer);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [listCity, setListCity] = useState("");
  const [open, setOpen] = useState(false);

  // const [city, setCity] = useState("");
  // const [district, setDistrict] = useState("");
  // const [ward, setWard] = useState("");

  const [address, setAddress] = useState("");
  const [data, setData] = useState({
    setCity: "",
    cityName: "",
    districtRender: [],
    districtName: "",
    startRequest: false,
    disabledDistrict: true,

    errorCallApi: "",
    setDistrict: "",
    wardRender: [],
    disabledWard: true,

    wardName: "",

    cityDataSelected: [],
    setWard: "",
    openCtr: { city: false, district: false, ward: false },
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenDistrict = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, district: true },
    }));
  };
  const handleOpenWard = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ward: true },
    }));
  };
  const handleCloseWard = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ward: false },
    }));
  };
  const handleCloseDistrict = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, district: false },
    }));
  };

  const handleChangeCity = (e) => {
    setData((data) => ({
      ...data,
      startRequest: true,
      setCity: e.target.value,
      setDistrict: "",
      setWard: "",
      disabledDistrict: false,
      disabledWard: true,
      wardRender: [],
      openCtr: { ...data.openCtr, district: true },
    }));

    const indexSelectName = listCity.findIndex(
      (item) => item.idProvince === e.target.value
    );

    const cityName = listCity[indexSelectName].name;
    console.log("cityName", cityName);

    setData((data) => ({
      ...data,
      cityName,
    }));

    const getListProvinces = () => {
      fetch(
        `https://sheltered-anchorage-60344.herokuapp.com/district?idProvince=${e.target.value}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("get list provinces  has been failed!");
        })
        .then((result) => {
          console.log("result", result);
          setData((data) => ({ ...data, startRequest: false }));

          const districtRender = result.reduce((colect, item) => {
            return [...colect, item];
          }, []);
          // const districtRender = districtData.map((item) => item.idDistrict);
          // console.log("districtRender", districtRender);

          // const districtRender = result.map((item) => item.name);
          setData((data) => ({
            ...data,
            districtRender,
          }));
          console.log("data", data);
        })
        .catch(function (error) {
          if (error.response) {
            setData((data) => ({
              ...data,
              errorCallApi: error.response.data,
            }));
          } else if (error.request) {
            setData((data) => ({ ...data, errorCallApi: error.message }));
          }
        });
    };
    getListProvinces();
  };

  const handleSelectDistrict = (e) => {
    setData((data) => ({
      ...data,
      setDistrict: e.target.value,
      setWard: "",
      disabledWard: false,
      wardRender: [],
      openCtr: { ...data.openCtr, ward: true },
    }));

    const indexSelectName = data.districtRender.findIndex(
      (item) => item.idDistrict === e.target.value
    );

    const districtName = data.districtRender[indexSelectName].name;
    console.log("districtName", districtName);

    setData((data) => ({
      ...data,
      districtName,
    }));
    console.log("data", data);

    const getListWard = () => {
      fetch(
        `https://sheltered-anchorage-60344.herokuapp.com/commune?idDistrict=${e.target.value}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("get list provinces  has been failed!");
        })
        .then((result) => {
          console.log("result123", result);

          const wardRender = result.reduce((colect, item) => {
            return [...colect, item];
          }, []);
          // const districtRender = districtData.map((item) => item.idDistrict);
          // console.log("districtRender", districtRender);

          // const districtRender = result.map((item) => item.name);
          setData((data) => ({
            ...data,
            wardRender,
          }));
          console.log("data", data);
        })
        .catch(function (error) {
          if (error.response) {
            setData((data) => ({
              ...data,
              errorCallApi: error.response.data,
            }));
          } else if (error.request) {
            setData((data) => ({ ...data, errorCallApi: error.message }));
          }
        });
    };
    getListWard();
  };
  const handleSelectWard = (e) => {
    setData((data) => ({
      ...data,
      setWard: e.target.value,
      openCtr: { ...data.openCtr, ward: true },
    }));

    const indexSelectName = data.wardRender.findIndex(
      (item) => item.idCommune === e.target.value
    );

    const wardName = data.wardRender[indexSelectName].name;
    console.log("wardName", wardName);

    setData((data) => ({
      ...data,
      wardName,
    }));
    console.log("data", data);
  };
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    const getListProvinces = () => {
      fetch("https://sheltered-anchorage-60344.herokuapp.com/province", {
        method: "GET",
      })
        .then((response) => {
          // console.log("response",response.json())
          if (response.status === 200) return response.json();
          // throw new Error("get list provinces  has been failed!");
        })
        .then((resObject) => {
          setListCity(resObject);
          console.log("resObject", resObject);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getListProvinces();
  }, []);
  console.log("listCity", listCity);
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
      fullName: "",
      city: data.cityName,
      district: data.districtName,
      ward: data.wardName,
    },
    // validationSchema: Createchema,
    onSubmit: (data123, { resetForm }) => {
      console.log("data123", data123);
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
        <div className={classes.address__detail} onClick={handleClickOpen}>
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
          maxWidth="sm"
        >
          <Formik value={formik}>
            <Form onSubmit={handleSubmit}>
              <ModalDialog
                sx={{ fontSize: "23px !important" }}
                onClose={handleClose}
              >
                {" "}
                Thông tin người nhận
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
                  <Stack direction="row" spacing={3} mt={2} mb={3}>
                    {" "}
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
                      autoComplete="email"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Email"
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                  <hr />
                  <Typography
                    m={2}
                    sx={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    Địa chỉ nhận hàng
                  </Typography>
                  <Stack spacing={3} direction="row">
                    {" "}
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                      <InputLabel id="city">Tỉnh / Thành phố</InputLabel>
                      <Select
                        labelId="city"
                        id="demo-simple-select"
                        value={data.setCity ? data.setCity : null}
                        name="city"
                        displayEmpty
                        label="Tỉnh / Thành phố"
                        onChange={handleChangeCity}
                      >
                        {listCity &&
                          listCity?.map((item, index) => {
                            return (
                              <MenuItem
                                classes={{
                                  root: classes.menu__item,
                                  selected: classes["menu__item--selected"],
                                }}
                                value={`${item.idProvince}`}
                                key={index}
                              >
                                {item.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                      <InputLabel id="district">Quận / Huyện</InputLabel>
                      <Select
                        value={data.setDistrict}
                        open={data.openCtr.district}
                        onOpen={handleOpenDistrict}
                        onClose={handleCloseDistrict}
                        onChange={handleSelectDistrict}
                        labelId="district"
                        id="district-id"
                        displayEmpty
                        name="district"
                        label="Quận / Huyện"
                        sx={{
                          "&.Mui-disabled": {
                            backgroundColor: "whitesmoke",
                          },
                        }}
                        disabled={data.disabledDistrict}

                        // onChange={handleChangeDistrict}
                      >
                        {data.districtRender.map((item, index) => (
                          <MenuItem
                            value={`${item.idDistrict}`}
                            key={index}
                            classes={{
                              root: classes.menu__item,
                              selected: classes["menu__item--selected"],
                            }}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack spacing={3} direction="row">
                    {" "}
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                      <InputLabel id="ward">Phường / Xã</InputLabel>
                      <Select
                        open={data.openCtr.ward}
                        onOpen={handleOpenWard}
                        onClose={handleCloseWard}
                        onChange={handleSelectWard}
                        labelId="ward"
                        id="ward-id"
                        displayEmpty
                        value={data.setWard}
                        name="ward"
                        label="Phường / Xã"
                        sx={{
                          "&.Mui-disabled": {
                            backgroundColor: "whitesmoke",
                          },
                        }}
                        disabled={data.disabledWard}
                      >
                        {data.wardRender.map((item, index) => (
                          <MenuItem
                            value={`${item.idCommune}`}
                            key={index}
                            classes={{
                              root: classes.menu__item,
                              selected: classes["menu__item--selected"],
                            }}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                      <InputLabel id="address">Số nhà</InputLabel>
                      <Select
                        labelId="address"
                        id="address"
                        value={address}
                        name="address"
                        label="Tỉnh / Thành phố"
                        onChange={handleChangeAddress}
                        {...getFieldProps("address")}
                      >
                        <MenuItem value={`Nam`}>Nam</MenuItem>
                        <MenuItem value={`Nữ`}>Nữ</MenuItem>
                      </Select>
                    </FormControl>
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
