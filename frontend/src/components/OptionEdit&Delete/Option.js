import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import Zoom from "@mui/material/Zoom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PropTypes from "prop-types";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
export default function Option(props) {
  const {
    onClickDelete,
    onClickEdit,
    activeIconDelete,
    hidden,
    hiddenEditAdmin,
  } = props;
  console.log("hiddenEditAdmin", hiddenEditAdmin);
  return (
    <Box className="flex">
      {!hiddenEditAdmin && (
        <Tooltip TransitionComponent={Zoom} title="Chỉnh sửa" arrow>
          <IconButton
            onClick={onClickEdit}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 72, 66, 0.08)",
                padding: "8px",
                borderRadius: "50%",
              },
            }}
          >
            <ModeEditIcon
              className="text-blue-500"
              sx={{
                fontSize: 32,
              }}
            />
          </IconButton>
        </Tooltip>
      )}

      {!activeIconDelete && !hidden && (
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
  onClickEdit: PropTypes.func.isRequired,
  activeIconDelete: PropTypes.bool,
  hiddenEditAdmin: PropTypes.bool
};
