import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Tab,
  Stack,
  Grid,
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
import Address from "./Address";

export default function Checkout() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className="m-5">
      <Container maxWidth="lg">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8}>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                backgroundColor: "#fff",
                borderRadius: "10px",
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      sx={{
                        flexDirection: "row",
                        textTransform: "none !important",
                      }}
                      label="Nhận hàng tại nhà"
                      value="1"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Address />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              {" "}
              Thông tin đơn hàng
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
