import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  address: {
    display: " grid",
    gap: "10px",
    gridTemplateColumns: " repeat(2, 1fr)",
  },
  address__detailName: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: " 0.875rem",
    marginBottom: 0,
  },
  address__detail: {
    borderRadius: "4px",
    display: "inline-block",
    userSelect: "none",
    // border: "1px solid rgb(20, 53, 195)",
    border: "1px solid rgb(224, 224, 224)",

    backgroundColor: "rgb(255, 255, 255)",
    padding: " 0.5rem 1.25rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    height: "110px",
    transition: "all 0.2s",
    "&:hover": {
      background: " rgb(243, 243, 243)",
    },
  },
  address__detail__hover: {
    border: "1px solid rgb(0,171, 85) !important",
    "&:hover": {
      background: "transparent !important",
    },
  },
  menu__item: {
    width: "100% !important",
    minHeight: "auto !important",
    display: "block",
    padding: "3px 20px !important",
    fontSize: "14px !important",
    color: "#333 !important",
    backgroundColor: "transparent !important",
    "& li ~ li": {
      fontSize: 11,
      color: "#aaa !important",
    },
    // màu nền và chữ khi hover
    "&:hover": {
      backgroundColor: "#00AB55 !important",
      color: "#fff !important",
      "& li ~ li": {
        color: "#fff !important",
      },
    },
  },
  menu__item__li: {
    width: "100% !important",
    minHeight: "auto !important",
    display: "block !important",
    padding: "3px 20px !important",
    fontSize: "14px !important",
    color: "#333 !important",
    backgroundColor: "transparent !important",
    "& li ~ li": {
      fontSize: 11,
      color: "#aaa !important",
    },
    // màu nền và chữ khi hover
    "&:hover": {
      backgroundColor: "#00AB55 !important",
      color: "#fff !important",
      "& li ~ li": {
        color: "#fff !important",
      },
    },
  },
  "menu__item--selected": {
    backgroundColor: "#00AB55 !important",

    color: "#fff !important",
    "& li ~ li": {
      color: "#fff !important",
    },
  },
  address__option: {
    display: "flex",
  },
  address__img: {
    marginLeft: "3px",
    height: "20px",
  },
  border__checked: {
    position: "absolute",
    top: "-1px",
    right: "-1px",
    width: "0px",
    height: "0px",
    borderStyle: "solid",
    borderWidth: "0px 36px 36px 0px",
    borderColor: "transparent rgb(0, 171,85) transparent transparent",
  },
  checked: {
    display: "flex",
    position: "absolute",
    top: "-1px",
    right: "-1px",
    zIndex: "0",
  },
  address__detailAdd: {
    textAlign: "center",
    verticalAlign: "center",
    position: "absolute",
    top: "40px",
    right: "160px",
  },
}));

export default useStyles;
