import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddress,
  deleteAddress,
  getAddressList,
  getDetailAddress,
  getListProvinces,
  updateAddress,
} from "../../../../redux/action/addressAction";
import EditAddress from "./EditAddress";

export default function Address() {
  const {
    addressProvincesList,
    successCreateAddress,
    addressList,
    successDetailAddress,
    successUpdateAddress,
  } = useSelector((state) => state.AddressReducer);
  console.log("successCreateAddress", successCreateAddress);
  console.log("addressList", addressList);
  console.log("successDetailAddress", successDetailAddress);
  const classes = useStyles();
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [listCity, setListCity] = useState("");
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  let [addressIsChoose, setAddressIsChoose] = React.useState("");
  const [addressId, setAddressId] = useState();
  const handleChangeFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleClickConfirm = (id) => {
    setOpenConfirm(true);
    setAddressId(id);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  // const [city, setCity] = useState("");
  // const [district, setDistrict] = useState("");
  // const [ward, setWard] = useState("");
  const handleCloseConfirm = () => {
    // setOpenConfirm(false);
    dispatch(deleteAddress(addressId));
  };
console.log("addressId",addressId);
  useEffect(() => {
    if (successCreateAddress || successUpdateAddress) {
      dispatch(getAddressList());
    }
  }, [successCreateAddress, successUpdateAddress]);
  useEffect(() => {
    if (!addressList) {
      dispatch(getAddressList());
    }
  }, [addressList]);

  useEffect(() => {
    let addressItem = addressList?.data.filter((item) => item.isDefault);
    console.log("addressItem123", addressItem);

    if (addressItem) {
      localStorage.setItem("address", JSON.stringify(addressItem[0]));

      dispatch({
        type: "ORDER_ADDRESS",
        payload: {
          data: addressItem[0],
        },
      });
    }
  }, [addressList]);

  const handleAddress = (item, index) => {
    console.log("!245");
    let addressIsDefault = addressList?.data.filter((item) => item.isDefault);
    addressIsDefault[0].isDefault = false;
    dispatch(updateAddress(addressIsDefault[0].id, addressIsDefault[0]));

    setTimeout(async () => {
      item.isDefault = true;
      await dispatch(updateAddress(item.id, item));
    }, 100);

    setTimeout(async () => {
      await dispatch({
        type: "ORDER_ADDRESS",
        payload: {
          data: item,
        },
      });
    }, 200);
  };

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
  const handleCancel = () => {
    setOpenConfirm(false);
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
  // const handleCreate = () => {
  //   // if (isReadyCreateCate)
  //   setOpen(false);
  // };

  const Createchema = Yup.object().shape({
    fullName: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
    email: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
    phoneNumber: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
    address: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName,
      phoneNumber,
      email,
      city: data.cityName,
      district: data.districtName,
      ward: data.wardName,
      address,
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data123", data);
      // if (loadingCreateAuthor) {
      //   return;
      // }
      dispatch(createAddress(data));
      //  fullName:"";
      resetForm({
        fullName: "",
        phoneNumber: "",
        email: "",
        city: "",
        district: "",
        ward: "",
        address: "",
      });

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

  const onClickEdit = (id) => {
    setOpenEdit(true);
    console.log("idEdit", id);
    // console.log("author", author);
    dispatch(getDetailAddress(id));
  };

  return (
    <div>
      <Typography
        component="div"
        variant="subtitle1"
        sx={{ marginBottom: "10px" }}
      >
        Th??ng tin nh???n h??ng
      </Typography>

      {addressList?.data.length >= 4 ? (
        <Typography sx={{ color: "red", paddingBottom: "10px" }}>
          Kh??ch h??ng ???????c th??m t???i ??a 4 ?????a ch??? nh???n h??ng
        </Typography>
      ) : (
        ""
      )}

      <EditAddress
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        listCity={listCity}
        successDetailAddress={successDetailAddress}
      />
      <div className={classes.address}>
        {addressList?.data.map((item, index) => {
          return (
            <div
              className={
                item.isDefault
                  ? `${classes.address__detail} ${classes.address__detail__hover}`
                  : `${classes.address__detail}`
              }
              // className={classes.address__detail}
              onClick={(e) => handleAddress(item, index)}
            >
              <div className={classes.address__option}>
                <p className={classes.address__detailName}>{item.fullName}</p>
                {/* C?? x??? l?? truy???n id th?? sd arrow func kh th?? ch??? c???n g???i handle */}

                <div
                  onClick={(e) => {
                    onClickEdit(item._id);
                  }}
                >
                  <img
                    className={classes.address__img}
                    src="./img/icon-edit.svg"
                    alt="icon-edit"
                  />
                </div>

                {/* <div>
                  <DeleteOutlineIcon
                    onClick={() => handleClickConfirm(item._id)}
                  />
                </div> */}
              </div>
              <p className="m-0">{item.phoneNumber}</p>
              <p style={{ color: "#999999", margin: 0 }}>
                {`${item.address}, ${item.ward}, ${item.city}`}
              </p>

              {/* <div>
                <div className={classes.border__checked}></div>
                <span className={classes.checked}>
                  <img
                    className={classes.address__img}
                    src="./img/icon-check.svg"
                    alt="icon-check"
                  />
                </span>
              </div> */}

              {item.isDefault && (
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
              )}
            </div>
          );
        })}

        {addressList?.data.length >= 4 ? (
          ""
        ) : (
          <div className={classes.address__detail} onClick={handleClickOpen}>
            <div className={classes.address__detailAdd}>
              <AddIcon />
              <p style={{ color: "#999999" }}>Th??m ?????a ch???</p>
            </div>
          </div>
        )}

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
                Th??ng tin ng?????i nh???n
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
                      autoComplete="fullName"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="H??? t??n"
                      // {...getFieldProps("fullName")}
                      value={fullName}
                      onChange={handleChangeFullName}
                      error={Boolean(touched.fullName && errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
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
                      label="S??? ??i???n tho???i"
                      value={phoneNumber}
                      onChange={handleChangePhoneNumber}
                      // {...getFieldProps("phoneNumber")}
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
                      value={email}
                      onChange={handleChangeEmail}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                  <hr />
                  <Typography
                    m={2}
                    sx={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    ?????a ch??? nh???n h??ng
                  </Typography>
                  <Stack spacing={3} direction="row">
                    {" "}
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                      <InputLabel id="city">T???nh / Th??nh ph???</InputLabel>
                      <Select
                        labelId="city"
                        id="demo-simple-select"
                        value={data.setCity ? data.setCity : null}
                        name="city"
                        displayEmpty
                        label="T???nh / Th??nh ph???"
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
                      <InputLabel id="district">Qu???n / Huy???n</InputLabel>
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
                        label="Qu???n / Huy???n"
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
                      <InputLabel id="ward">Ph?????ng / X??</InputLabel>
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
                        label="Ph?????ng / X??"
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
                    <TextField
                      fullWidth
                      autoComplete="address"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="S??? nh??"
                      // {...getFieldProps("address")}
                      value={address}
                      onChange={handleChangeAddress}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
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
                  Hu???
                </Button>
                <LoadingButton
                  sx={{ width: "100%", height: "33px !important" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  // loading={loadingCreateAuthor}
                  // onClick={handleCreate}
                  // disabled={!isReadyCreateCate}
                  className={classes.buttonCreate}
                >
                  T???o
                </LoadingButton>
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
        <Dialog
          open={openConfirm}
          // onClose={handleCloseCnfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"X??a ng?????i d??ng"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              B???n ch???c ch???n mu???n x??a ?????a ch??? n??y.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>H???y</Button>
            <Button onClick={handleCloseConfirm} autoFocus>
              ?????ng ??
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
