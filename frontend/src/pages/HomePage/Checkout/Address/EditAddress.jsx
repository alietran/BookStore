import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { updateAddress } from "../../../../redux/action/addressAction";
import useStyles from "./style";

export default function EditAddress({
  setOpenEdit,
  handleClickOpenEdit,
  successDetailAddress,
  openEdit,
  listCity,
}) {
  const classes = useStyles();
  console.log("successDetailAddress24", successDetailAddress);
  console.log("listCity", listCity);
  const [indexProvince, setIndexProvince] = useState("");
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

  useEffect(() => {
    if (listCity && successDetailAddress) {
      let indexCity = listCity?.findIndex(
        (item) => item.name === successDetailAddress?.data.city
      );

      setData((data) => ({
        ...data,
        setCity: listCity[indexCity].idProvince,
      }));

      const getListProvinces = () => {
        fetch(
          `https://sheltered-anchorage-60344.herokuapp.com/district?idProvince=${listCity[indexCity].idProvince}`,
          {
            method: "GET",
          }
        )
          .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("get list provinces  has been failed!");
          })
          .then((result) => {
            let index = result?.filter(
              (item) => item.name === successDetailAddress?.data.district
            );
            setIndexProvince(index[0].idDistrict);
            setData((data) => ({
              ...data,
              setDistrict: index[0].idDistrict,
            }));

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
          })
          .catch(function (error) {
            if (error.response) {
              setData((data) => ({
                ...data,
                errorCallApi: error.response.data,
              }));
            } else if (error.request) {
              setData((data) => ({
                ...data,
                errorCallApi: error.message,
              }));
            }
          });
      };
      getListProvinces();

      console.log("indexProvince", indexProvince);

      const getListWard = () => {
        fetch(
          `https://sheltered-anchorage-60344.herokuapp.com/commune?idDistrict=${indexProvince}`,
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
            if (result.length > 0) {
              let index = result?.filter(
                (item) => item.name === successDetailAddress?.data.ward
              );

              console.log("index", index);
              console.log(
                "successDetailAddress?.data.ward",
                successDetailAddress?.data.ward
              );

              setData((data) => ({
                ...data,
                setWard: index[0]?.idCommune,
              }));

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
              console.log("wardRender", wardRender);
            }
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
    }
  }, [listCity, successDetailAddress]);

  console.log("successDetailAddress", successDetailAddress);

  const [fullName, setFullName] = useState(successDetailAddress?.data.fullName);

  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState(
    successDetailAddress?.data.phoneNumber
  );
  const [email, setEmail] = useState(successDetailAddress?.data.email);
  const [address, setAddress] = useState(successDetailAddress?.data.address);
  const [city, setCity] = useState(successDetailAddress?.data.city);
  const [district, setDistrict] = useState(successDetailAddress?.data.district);
  const [ward, setWard] = useState(successDetailAddress?.data.ward);
  // const handleUpdate = () => {

  // };
  const Createchema = Yup.object().shape({
    fullName: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
    email: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
    phoneNumber: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
    address: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: fullName ? fullName : successDetailAddress?.data.fullName,
      phoneNumber: phoneNumber
        ? phoneNumber
        : successDetailAddress?.data.phoneNumber,
      email: email ? email : successDetailAddress?.data.email,
      city: city ? city : data.cityName,
      district: district ? district : data.districtName,
      ward: ward ? ward : data.wardName,
      address: address ? address : successDetailAddress?.data.address,
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data123", data);
      // if (loadingCreateAuthor) {
      //   return;
      // }
      dispatch(updateAddress(successDetailAddress.data.id, data));

      resetForm({
        values: {
          fullName: "",
          phoneNumber: "",
          email: "",
          city: "",
          district: "",
          ward: "",
          address: "",
        },
      });
      setOpenEdit(false);
      // setOpen(false);
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
  console.log("fullName", values.fullName);

  const handleChangeFullName = (e) => {
    setFullName(e.target.value);
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
  const handleClose = () => {
    setOpenEdit(false);
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
  const handleOpenDistrict = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, district: true },
    }));
  };

  const handleCloseDistrict = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, district: false },
    }));
  };

  const handleCloseWard = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ward: false },
    }));
  };
  const handleOpenWard = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ward: true },
    }));
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

  return (
    <div>
      <Dialog
        open={openEdit}
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
              Ch???nh s???a th??ng tin ng?????i nh???n
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
                    value={
                      fullName ? fullName : successDetailAddress?.data.fullName
                    }
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
                    value={
                      phoneNumber
                        ? phoneNumber
                        : successDetailAddress?.data.phoneNumber
                    }
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
                    value={email ? email : successDetailAddress?.data.email}
                    onChange={handleChangeEmail}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
                <hr />
                <Typography m={2} sx={{ fontSize: "20px", fontWeight: "bold" }}>
                  ?????a ch??? nh???n h??ng
                </Typography>
                <Stack spacing={3} direction="row">
                  {" "}
                  <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                    <InputLabel shrink={true} id="city">
                      T???nh / Th??nh ph???
                    </InputLabel>
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
                    value={
                      address ? address : successDetailAddress?.data.address
                    }
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
                // onClick={handleUpdate}
                // disabled={!isReadyCreateCate}
                className={classes.buttonCreate}
              >
                Ch???nh S???a
              </LoadingButton>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}
