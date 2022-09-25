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
    color: "rgb(51, 51, 51)",
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
  "cart__wrapper-content": {
    display: "flex",
    marginBottom: "24px",
  },
  "cart__wrapper--main": {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
    width: "75.6%",
    marginRight: "16px",
  },
  itemCart: {
    padding: "24px",
    background: "white",
  },
  "cart__wrapper-content--left": {
    marginRight: "20px",
    width: "800px",
  },
  "cart__wrapper-content--box": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 15px 10px 15px",
    background: "white",
    borderRadius: "8px",
  },
  box__content: {
    flex: "0 0 96%",
    display: "grid",
    gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
  },
  amount: {},
  "box__content-name": {
    display: "flex",
    
  },
  center: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "end",
  },
  "box__content-name-product": {
    fontSize: "15px",
    marginLeft: "20px",
    textAlign:"center",
    color:"black",
    "&:hover":{
       color:"green"
    }
  },
  bookName : {
    marginBottom:"0"
  },
  "box__content-name-img": {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgb(228, 229, 240)",
    opacity: 1,
    position: "relative",
    borderRadius: "50%",
    width: "80px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "unset",
    "& img": {
      width: "60px",
      height: "60px",
      padding: "0 12px",
      objectFit: "contain",
    },
  },
  quanty: {
    alignItems: "end",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "30px !important" ,
  },
  "box__content-quantity": {
    display: "flex",
  },
  container: {
    maxWidth: "1247px",
    margin: "0 auto",
  },
  delete: {
    paddingLeft: "10px",
    cursor: "pointer",
    transition: "all 0.5s",
    "&:hover": {
      color: "red",
    },
  },
  "box__content-quantity-detail": {
    display: "flex",
    paddingBottom: "5px",
  },
  "cart__wrapper-content--right": {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
    width: "32%",
  },
  "cart__wrapper-content--info": {
    padding: "16px",
    background: "white",
    borderRadius: "8px",
  },
  info__voucher: {
    display: "flex",
    justifyContent: "space-between",
  },

  "info-text": {
    borderStyle: "solid",
    borderRadius: "0.25rem",
    borderWidth: "1px",
    opacity: 1,
    backgroundColor: "transparent",
    height: "40px",
    padding: "0rem 0.75rem",
    display: "flex",

    alignItems: "center",
    borderColor: "rgb(228, 229, 240)",
  },
  "box__content-quantity-detail": {
    display: "flex",
    paddingBottom: "5px",
    backgroundColor: "#f8f8f8",
    // .disabled {
    //   border: 1px solid #999999;
    //   background-color: #cccccc;
    //   color: #666666;
    //   cursor: not-allowed;
    // }
    "& input": {
      backgroundColor: "rgb(248, 248, 252)",
      textAlign: "center",
      backgroundColor: "transparent",
      fontSize: "0.8125rem",
      fontWeight: 500,
      color: "rgb(67, 70, 87)",
      width: "25px",
    },
    "& button": {
      padding: "3px 10px",
    },
  },
  quantity: {
    alignItems: "end",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "30px",
  },
  quantityValue: {
    backgroundColor: "rgb(248, 248, 252)",
    textAlign: "center",
   
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "rgb(67, 70, 87)",
   
  },

  apply: {
    borderStyle: "none",
    borderWidth: "1px",
    borderColor: "unset",
    opacity: 1,
    height: "2.5rem",
    padding: "0rem 1.25rem",
    borderRadius: "0.25rem",
    backgroundColor: "seagreen",
    position: "relative",
    display: "flex",

    alignItems: "center",

    justifyContent: "center",
    outline: "none",
    minWidth: "2.5rem",
    color: "#fff",
    cursor: "not-allowed",
    transitionDuration: "80ms",
    transitionProperty: "background-color",
  },
  "cart__wrapper-content--payment": {
    background: "white",
    borderRadius: "8px",
    margin: "20px 0",
  },
  "info-payment": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  "payment-tab": {
    width: "100%",
    captionSide: "bottom",
    borderCollapse: "collapse",
    "& td": {
      lineHeight: "1.8rem",
    },
  },
}));
export default useStyles;

