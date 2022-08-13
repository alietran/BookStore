import React from "react";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";

const breadcrumbs = [
  <Link
    underline="hover"
    key="1"
    href="/admin/dashboard"
    color="text.primary"
    sx={{ "&:hover": { color: "#212B36" } }}
  >
    Trang chủ
  </Link>,
  <Link
    underline="hover"
    key="2"
    href="/admin/users/account"
    color="text.primary"
    sx={{ "&:hover": { color: "#212B36" } }}
  >
    Phiếu nhập hàng{" "}
  </Link>,
  <Typography key="3" color="inherit">
    Danh sách
  </Typography>,
];
export default function ReceiptManager() {
  const history = useHistory();
  return (
    <Container
      sx={{ paddingRight: "0px !important", paddingLeft: "0px !important" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        mt={7.5}
      >
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Danh sách phiếu nhập hàng
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          startIcon={<Icon icon={plusFill} />}
          onClick={() => history.push("/admin/receipts/create")}
          sx={{
            "&:hover": { color: "#fff" },
            textTransform: "none !important",
          }}
        >
          Thêm phiếu nhập
        </Button>
      </Stack>
    </Container>
  );
}
