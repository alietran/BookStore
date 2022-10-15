import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  "cart__wrapper-breadcrumbs": {
    whiteSpace: "nowrap",
    display: "flex",
    width: "90%",
    margin: "1rem 1rem 1rem 0",
  },
  breadcrumbsIcon: {
    height: "32px",
    width: "fit-content",

    alignItems: "center",
    display: "flex",

    justifyContent: "center",
    whiteSpace: "nowrap",
    marginRight: "10px",
  },
  breadcrumbsIconLink: {
    marginRight: "10px",
    cursor: "pointer",
    overflow: "hidden",
    lineHeight: "1rem",
    display: "inline-flex",

    alignItems: "center",

    justifyContent: "center",
    textAlign: "center",
    userSelect: "none",
    flexDirection: "row",
    position: "relative",
    padding: "8px",
    color: "#00ab55",
    textDecoration: "none",
    backgroundColor: "rgb(255, 255, 255)",
    pointerEvents: "auto",
    border: "1px solid rgb(224, 224, 224)",
    borderRadius: "9999px",
    "& img": {
      width: "16px",
      height: "16px",
      display: "inline-block",
    },
    "&:hover": {
      color: "#03a051",
    },
  },
  breadcrumbsName: {
    height: " 32px",
    width: " fit-content",

    alignItems: "center",
    display: "flex",

    justifyContent: "center",
    whiteSpace: "nowrap",
  },
  breadcrumbsLink: {
    cursor: "pointer",
    overflow: "hidden",
    lineHeight: "1rem",
    display: "inline-flex",

    alignItems: "center",

    justifyContent: "center",
    textAlign: "center",
    userSelect: "none",
    flexDirection: "row",
    position: "relative",
    padding: "8px",
    color: "#333333",
    textDecoration: "none !important",
    backgroundColor: "rgb(255, 255, 255)",
    pointerEvents: "none",
    border: "1px solid rgb(224, 224, 224)",
    borderRadius: "9999px",
  },
  "info-text": {
    borderStyle: "solid",
    borderRadius: "0.25rem",
    borderWidth: "1px",
    opacity: 1,
    backgroundColor: "transparent",
    height: "100px",
    padding: "0rem 0.75rem",
    display: "flex",
    margin: "10px 0",
    alignItems: "center",
    borderColor: "rgb(228, 229, 240)",
    "& img": {
      height: "60px !important",
      width: "60px !important",
    },
  },
  "info-product": {
    marginLeft: "20px",
    flex: "0 0 70%",
    lineHeight: 0.8,
  },
  "payment-tab": {
    width: "100%",
    captionSide: "bottom",
    borderCollapse: "collapse",
    "& td": {
      lineHeight: "1.8rem",
    },
  },
  "info-payment": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
}));

export default useStyles;
