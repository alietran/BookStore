import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  productNew: {
    backgroundColor: "#ffdb15",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    lineHeight: "35px",
    textAlign: "center",
    zIndex: "1",
    position: "absolute",
    top: "10px",
    // right:"0px",
  },
  productItem: {
    position: "relative",
  },
  Arrow: {
    position: "absolute",
    top: "48%",
    border: "1px solid black",
    borderRadius: "50%",
    transform: "translateY(-45%)",
    zIndex: 2,
    padding: "10px",
    fontSize: "5px",
    width: "40px !important",
    height: "40px !important",
    color: "black !important",
    cursor: "pointer",
    opacity: 0,
    transition: "all .2s",
    "&:hover": {
      color: "white !important",
      backgroundColor: "#00ab55",
      border: "1px solid #00ab55",
    },
  },
  bestSell: {
    "&:hover .Arrow": {
      opacity: 1,
    },
  },
  paragraph: {
    "& p": {
      display: "inline",
    },
  },
}));
export default useStyles;
