import { SnackbarProvider } from "notistack";
import React from "react";
import PropTypes from "prop-types";

export default function SnackbarProviderCustom({ children, ...other }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .SnackbarItem-variantSuccess": {
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(33, 43, 54)",
        },
        "& .SnackbarItem-variantError": {
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(33, 43, 54)",
        },
        "& .SnackbarContent-root": {
          width: "100% !important",
          padding: " 8px !important",
          margin: "2px 0px !important",
          boxShadow:
            "rgba(145 158 171 !important , 0.16) 0px 8px 16px 0px !important",
          borderRadius: " 8px !important",
        },
        "& .SnackbarItem-message": {
          fontWeight: "600",
          padding: "0px !important",
        },
      }}
      iconVariant={{
        success: (
          <span
            className="mr-3 w-10 h-10 flex rounded-xl items-center justify-center"
            style={{
              color: "rgb(84, 214, 44)",
              backgroundColor: "rgba(84, 214, 44, 0.16)",
            }}
          >
            <img
              className="w-6 h-6"
              src="../../img/icon-success.svg"
              alt="icon-success"
            />
          </span>
        ),
        error: (
          <span
            className="mr-3 w-10 h-10 flex rounded-xl items-center justify-center"
            style={{
              color: "rgb(122, 12, 46)",
              backgroundColor: "rgb(255, 231, 217)",
            }}
          >
            <img
              className="w-6 h-6"
              src="../img/icon-error.svg"
              alt="icon-error"
            />
          </span>
        ),
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

SnackbarProvider.propTypes = {
  children: PropTypes.node,
};
