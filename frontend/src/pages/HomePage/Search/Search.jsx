import { Box, Container } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
export default function Search() {
  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{ margin: "20px auto", backgroundColor: "white" }}
      >
        <Box sx={{ padding: "30px 0" }}>
          <Box
            sx={{
              backgroundColor: "#57b159",
              padding: "20px",
              display: "flex",
            }}
          >
            <ManageSearchIcon sx={{ color: "white", marginRight:"10px" }} />
            <Typography sx={{ color: "white" }}>KẾT QUẢ TÌM KIẾM</Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
