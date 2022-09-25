import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Label from "../../components/Label";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonIcon from "@mui/icons-material/Person";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PhoneIcon from "@mui/icons-material/Phone";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../redux/action/orderAction";
import { NavLink, useHistory } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OrderShipperDetail from "./OrderShipperDetail";
import moment from "moment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import PropTypes from "prop-types";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  paddingRight: 20,
  marginLeft: 80,

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  color: "white",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    "&::placeholder": {
      color: "white",
    },
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function OrderListShipper() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const [valueBottom, setValueBottom] = React.useState(0);
  console.log("valueBottom", valueBottom);
  const { orderList } = useSelector((state) => state.OrderReducer);
  const shipper = JSON.parse(localStorage.getItem("shipper"));
  console.log("shipper", shipper);
  useEffect(() => {
    if (orderList === null) dispatch(getOrderList());
  }, [orderList]);

  const order = orderList?.data.filter(
    (item) => item.shipper?.id === shipper.user.id
  );
  console.log("order", order);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeDetail = (id) => {
    history.push(`/orderListShipper/${id}`);
  };

const handleLogout = ()=>{
  console.log("1414")
   dispatch({ type: "LOGOUT_SHIPPER" });
}

  return (
    <div>
      {" "}
      <div className=" mx-auto text-center bg-white md:w-96 relative h-screen">
        {valueBottom === 0 ? (
          <Box>
            {" "}
            <Box sx={{ backgroundColor: "#57b159", height: "160px" }}>
              {" "}
              <Typography
                sx={{
                  color: "white",
                  padding: "50px 0 20px 0",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                My Shipments
              </Typography>
              <Box sx={{ marginRight: "20px" }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    classnName="placeholder:text-slate-400"
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                margin: "10px 0px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered
                  >
                    {" "}
                    <Tab label="Tất cả" {...a11yProps(0)} />
                    <Tab label="Đang giao" {...a11yProps(1)} />
                    <Tab label="Đã giao" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  {order?.map((orderDetailShip, index) => {
                    return (
                      <Box
                        orderDetailShip={orderDetailShip}
                        onClick={() => handleChangeDetail(orderDetailShip?.id)}
                        sx={{
                          maxWidth: 580,
                          padding: "15px",
                          margin: "15px",
                          display: "flex",
                          borderRadius: "10px",
                          backgroundColor: "#f3f3f3",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="flex justify-center">
                          {" "}
                          <div>
                            {" "}
                            <p>#{orderDetailShip?.id}</p>
                            <p>
                              {orderDetailShip?.address?.fullName} -{" "}
                              {orderDetailShip?.address?.phoneNumber}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p>
                            {" "}
                            {orderDetailShip?.totalPrice.toLocaleString()} ₫
                          </p>
                          <Label color="primary">
                            {orderDetailShip?.status}
                          </Label>
                        </div>
                      </Box>
                    );
                  })}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {order
                    ?.filter((state) => state.status === "Đang vận chuyển")
                    .map((orderDetailShip, index) => {
                      return (
                        <Box
                          orderDetailShip={orderDetailShip}
                          onClick={() =>
                            handleChangeDetail(orderDetailShip?.id)
                          }
                          sx={{
                            maxWidth: 580,
                            padding: "15px",
                            margin: "15px",
                            display: "flex",
                            borderRadius: "10px",
                            backgroundColor: "#f3f3f3",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="flex justify-center">
                            {" "}
                            <div>
                              {" "}
                              <p>#{orderDetailShip?.id}</p>
                              <p>
                                {orderDetailShip?.address?.fullName} -{" "}
                                {orderDetailShip?.address?.phoneNumber}
                              </p>
                              <p></p>
                            </div>
                          </div>
                          <div>
                            <p>
                              {" "}
                              {orderDetailShip?.totalPrice.toLocaleString()} ₫
                            </p>
                            <Label color="primary">
                              {orderDetailShip?.status}
                            </Label>
                          </div>
                        </Box>
                      );
                    })}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  {order
                    ?.filter((state) => state.status === "Đã giao hàng")
                    .map((orderDetailShip, index) => {
                      return (
                        <Box
                          orderDetailShip={orderDetailShip}
                          onClick={() =>
                            handleChangeDetail(orderDetailShip?.id)
                          }
                          sx={{
                            maxWidth: 580,
                            padding: "15px",
                            margin: "15px",
                            display: "flex",
                            borderRadius: "10px",
                            backgroundColor: "#f3f3f3",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="flex justify-center">
                            {" "}
                            <div>
                              {" "}
                              <p>#{orderDetailShip?.id}</p>
                              <p>
                                {orderDetailShip?.address?.fullName} -{" "}
                                {orderDetailShip?.address?.phoneNumber}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p>
                              {" "}
                              {orderDetailShip?.totalPrice.toLocaleString()} ₫
                            </p>
                            <Label color="primary">
                              {orderDetailShip?.status}
                            </Label>
                          </div>
                        </Box>
                      );
                    })}
                </TabPanel>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ backgroundColor: "#e7edef" }}>
            <NavLink to="/shipper" style={{color: "white"}} onClick={handleLogout}>
              {" "}
              <MoreVertIcon className="absolute right-5 top-5 " />
            </NavLink>

            <Box
              sx={{
                backgroundColor: "#57b159",
                height: "160px",
                paddingTop: "90px",
              }}
            >
              {" "}
              <div className="w-36 h-36 relative m-auto rounded-full p-2 border-2 border-dashed border-gray-200 flex">
                <label className="w-full h-full outline-none overflow-hidden rounded-full bottom-6 right-1.5 items-center justify-center absolute flex cursor-pointer  ">
                  <span className="overflow-hidden z-10 w-full h-full block  ">
                    <span className=" w-full h-full bg-cover inline-block">
                      <img
                        src="../../../../img/dk.svg"
                        alt="avatar"
                        className="w-full h-full object-cover mt-5"
                      />
                    </span>
                  </span>
                </label>
              </div>
            </Box>
            <Box
              sx={{
                background: "white",
                height: "auto",

                marginTop: "90px",
                marginBottom: "10px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <PhoneIcon />
                </Grid>
                <Grid item xs={10}>
                  <div className="text-left leading-5">
                    {" "}
                    <p className="m-0">Họ và tên </p>
                    <p>{shipper?.user.name}</p>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                background: "white",
                height: "auto",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <PersonIcon />
                </Grid>
                <Grid item xs={10}>
                  <div className="text-left leading-5">
                    {" "}
                    <p className="m-0">Số điện thoại </p>
                    <p>{shipper?.user.phoneNumber}</p>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                background: "white",
                height: "auto",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <CalendarMonthIcon />
                </Grid>
                <Grid item xs={10}>
                  <div className="text-left leading-5">
                    {" "}
                    <p className="m-0">Ngày sinh</p>
                    <p>
                      {moment(shipper?.user.dateOfBirth)?.format("DD/MM/YYYY")}
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                background: "white",
                height: "auto",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <EmailIcon />
                </Grid>
                <Grid item xs={10}>
                  <div className="text-left leading-5">
                    {" "}
                    <p className="m-0">Email</p>
                    <p>{shipper?.user.email}</p>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            // borderTop:"1px solid gray",
            overflow: "hidden",
            position: "absolute",
            bottom: 0,

            width: "100%",
            boxShadow: "rgb(100 100 111 / 18%) 1px -2px 8px 4px",
          }}
        >
          <BottomNavigation
            showLabels
            value={valueBottom}
            onChange={(event, newValue) => {
              setValueBottom(newValue);
            }}
          >
            <BottomNavigationAction label="Đơn hàng" icon={<ListAltIcon />} />
            <BottomNavigationAction label="Cá nhân" icon={<PersonIcon />} />
          </BottomNavigation>
        </Box>
      </div>
    </div>
  );
}
