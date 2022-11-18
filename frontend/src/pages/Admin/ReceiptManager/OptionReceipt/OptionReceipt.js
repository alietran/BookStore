import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Option from "../../../../components/OptionDetail&Delete/Option";
import { deleteReceipt } from "../../../../redux/action/receiptAction";

export default function OptionReceipt({ id, receipt, inventoryStatus }) {
  // const { receiptId, bookId } = receipt;
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleCancel = () => {
    setOpenConfirm(false);
  };
  // handleCancel;
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    onClickDelete(id);
  };

  const onClickDelete = (id) => {
    console.log('id',id);
    dispatch(deleteReceipt(id));
  };

  const onClickDetail = (receipt) => {
    setOpen(true);
    history.push(`/admin/receipts/detail/${id}`);
  };

  const handleClickConfirm = () => {
    setOpenConfirm(true);
  };

  return (
    <Box>
      <Option
        onClickDelete={handleClickConfirm}
        onClickDetail={(e) => onClickDetail(receipt)}
        inventoryStatus={inventoryStatus}
      ></Option>

      <Dialog
        open={openConfirm}
        // onClose={handleCloseCnfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa phiếu nhập"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xóa phiếu nhập này.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button
            onClick={handleCloseConfirm}
            autoFocus
            sx={{
              textTransform: "none !important",
            }}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
