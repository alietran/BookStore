import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import Zoom from "@mui/material/Zoom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PropTypes from "prop-types";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function Option(props) {
  const { onClickDelete, onClickDetail, inventoryStatus, shipper } = props;
  return (
    <Box className="flex">
      <Tooltip TransitionComponent={Zoom} title="Chi tiết" arrow>
        <IconButton
          onClick={onClickDetail}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255, 72, 66, 0.08)",
              padding: "8px",
              borderRadius: "50%",
            },
          }}
        >
          <VisibilityIcon
            className="text-blue-500"
            sx={{
              fontSize: 32,
            }}
          />
        </IconButton>
      </Tooltip>
      {(!inventoryStatus || shipper) && (
        <Tooltip TransitionComponent={Zoom} title="Xoá" arrow>
          <IconButton
            onClick={onClickDelete}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 72, 66, 0.08)",
                padding: "8px",
                borderRadius: "50%",
              },
            }}
          >
            <DeleteForeverIcon
              className="text-red-500"
              sx={{
                fontSize: 32,
              }}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

Option.propTypes = {
  onClickDelete: PropTypes.func.isRequired,
  onClickDetail: PropTypes.func.isRequired,
};
