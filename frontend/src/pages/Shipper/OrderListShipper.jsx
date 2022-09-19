import { Box, Typography } from "@mui/material";
import React from "react";
import Label from "../../components/Label";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
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

export default function OrderListShipper() {
  const [value, setValue] = React.useState(0);
  const [valueBottom, setValueBottom] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {" "}
      <div className=" mx-auto text-center bg-white md:w-96 relative h-screen">
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
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Tất cả" />
            <Tab label="Đang giao" />
            <Tab label="Đã giao" />
          </Tabs>
        </Box>
        <div>
          <Box
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
                <p>TNguyễn văn X - 0946585669</p>
                <p>#SGGSG2423443</p>
              </div>
            </div>
            <div>
              <p> Tổng tiền</p>
              <Label color="primary">Trạng thái</Label>
            </div>
          </Box>
          <Box
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
                <p>TNguyễn văn X - 0946585669</p>
                <p>#SGGSG2423443</p>
              </div>
              <p>12334</p>
            </div>
            <div>
              <p> Tổng tiền</p>
              <Label color="primary">Trạng thái</Label>
            </div>
          </Box>
          <Box
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
                <p>TNguyễn văn X - 0946585669</p>
                <p>#SGGSG2423443</p>
              </div>
            </div>
            <div>
              <p> Tổng tiền</p>
              <Label color="primary">Trạng thái</Label>
            </div>
          </Box>
        </div>

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
