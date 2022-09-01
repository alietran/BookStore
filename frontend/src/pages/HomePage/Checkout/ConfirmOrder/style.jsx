import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  checkoutTitle: {
    color: "red",
    fontFamily: "BalooExtra",
    fontSize: "25px",
    textTransform: "uppercase",
    fontWeight: "900",
  },
  checkoutPopup: {
    lineHeight: "1.5",
    color: "#212529",
    fontWeight: "400",
    width: "100%",
    "& tbody": {
      fontFamily: "Barlow",
      fontSize: "17px",
    },
    "& tbody tr td:first-child": {
      width: " 20%",
      color: "#696969 !important",
      "& h3": {
        fontSize: "17px",
        fontWeight: "900",
        color: "#696969 !important",
        marginBottom: "0px",
      },
    },
    "& tbody tr td:last-child": {
      width: "80%",
      textAlign: "end",
      "& h3": {
        fontSize: "20px !important",
        fontWeight: "900",
        marginBottom: "0px",
        lineHeight: "1.2",
      },
      "& i": {
        fontSize: "21px !important",
        fontWeight: "900",
      },
    },
  },
  productInfo: {
    fontSize: "17px !important",
  },
  confirmButton: {
    padding: " 5px 0 !important",
    width: "100% !important",
    borderRadius: " 25px !important",
    color: "#ffffff !important",
    fontSize: " 21px !important",
    display: "block !important",
    textAlign: "center !important",
    textTransform: "uppercase !important",
    backgroundColor: "rgb(190 24 93/1) !important",
    marginTop: " 30px !important",
    marginBottom: "15px !important",
    "&:hover": {
      backgroundColor: "rgb(157 23 77/1) !important",
    },
  },
}));
export default useStyles;
