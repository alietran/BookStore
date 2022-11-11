import { Box, Container, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import UserAccount from "./UserAccount/UserAccount";
import OrderHistory from "./OrderHistory/OrderHistory";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

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
export default function UserInfo() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { enqueueSnackbar } = useSnackbar();

  const { successUpdateUserCurrent } = useSelector(
    (state) => state.UserReducer
  );

  useEffect(() => {
    if (successUpdateUserCurrent) {
      enqueueSnackbar("Cập nhật thành công!", {
        variant: "success",
      });
    }
  }, [successUpdateUserCurrent]);
  return (
    <div>
      <Container maxWidth="lg" sx={{ margin: "0px auto" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "white",
            paddingTop:"80px"
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
            <Tab label="Lịch sử đơn hàng" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel
          value={value}
          index={0}
          sx={{ backgroundColor: "white", padding: "0 !important" }}
        >
          <UserAccount />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrderHistory />
        </TabPanel>
      </Container>
    </div>
  );
}
