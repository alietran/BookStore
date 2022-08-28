import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Item from 'antd/lib/list/Item';
import React from 'react'
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export default function ConfirmOrder() {
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      // textAlign: "center",
      color: theme.palette.text.secondary,
    }));
    return (
      <Container>
        <Box
          sx={{
            width: "80%",
            margin: "20px auto",
            height: "auto",
            backgorundColor: "white",
          }}
          className="shadow-2xl"
        >
          <Stack spacing={2}>
            <Item sx={{ padding: "30px" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
              >
                <Grid item xs={4}>
                  <img src="../../../../img/bookstore.jpg" />
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    component="div"
                    variant="subtitle1"
                    className="text-center"
                  >
                    Thanh Toán Thành Công
                  </Typography>

                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                    className="mb-8"
                  >
                    <Grid item xs={4} className="text-left place-items-start ">
                      <Item>Họ và Tên:</Item>
                      <Item>Số điện thoại</Item>
                      <Item>Địa chỉ</Item>
                      <Item>Tổng tiền</Item>
                      <Item>Chi tiết sản phẩm</Item>
                    </Grid>
                    <Grid item xs={8} className="text-right place-items-end">
                      <Item>Ngoc Diep</Item>
                      <Item>0946379</Item>
                      <Item>12345, Kien Giang</Item>
                      <Item sx={{ color: "red", fontWeight: 600 }}>
                        120.000 d
                      </Item>
                      <Item>Sự lây lan kỳ lạ * 1</Item>
                      <Item>Sự lây lan kỳ lạ * 1</Item>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    className="mt-8 w-4/5 "
                    sx={{ margin : "0 55px"}}
                  >
                    Xác nhận
                  </Button>
                </Grid>
              </Grid>
            </Item>
          </Stack>
        </Box>
      </Container>
    );
}
