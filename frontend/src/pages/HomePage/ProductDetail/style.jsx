import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  "productDetail__wrapper-breadcrumbs": {
    whiteSpace: "nowrap",
    display: "flex",
    margin: "1rem 0px",
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
  "productDetail__wrapper-content": {
    display: "flex",
    marginBottom: "24px",
  },
  "productDetail__wrapper-content--left": {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
    width: "75.6%",
    marginRight: "16px",
  },
  "productDetail__wrapper-content--box": {
    padding: "24px",
    background: "white",
    borderRadius: "8px",
  },
  //           .loading {
  //             display: flex;
  //             margin-top: 100px;
  //             // align-items: center;
  //             justify-content: center;
  //             // margin: 0 auto;
  //             // margin-left: 50px;
  //           }
  box__content: {
    display: "flex",
  },
  "box__content-left": {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
    width: "40.5%",
    paddingRight: " 16px",
  },
  img__box: {
    cursor: "pointer",
    position: "relative",
    marginBottom: "0.5rem",
  },
  img__content: {
    position: "relative",
    overflow: "hidden",
    flex: " 1 0 auto",
    display: "flex",
    cursor: "pointer",
    zIndex: 0,
    margin: "auto",
    borderRadius: "8px",

    width: "100%",
  },
  img__library: {
    display: "flex",

    justifyContent: "flex-start",
    gap: "0.5rem",
  },
  active: {
    width: "100%",
    borderRadius: " 4px",
    border: "1px solid rgb(20, 53, 195)",
  },
  "img__library-content": {
    position: "relative",
    cursor: "pointer",
    width: "50px",
    height: "50px",
    overflow: "hidden",
  },
  "img__library-content--item": {
    position: "relative",
    display: "inline-block",
    overflow: "hidden",
    borderRadius: "4px",
    height: "50px",
    width: "50px",
    "& img": {
      width: "100%",
      height: "50px",
      objectFit: "contain",
      transition: "transform 0.3s ease 0s",
    },
  },

  content__line: {
    display: "flex",
    padding: "10px",
    backgroundColor: "transparent",
    margin: " 0.75rem 0rem",
  },
  line: {
    display: "flex",
    width: "100%",
    color: "#e4e5f0",
    borderWidth: "1px",
    borderStyle: "dashed",
  },
  "box__content-right": {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
    width: "59.5%",
  },
  content__discount: {
    display: "flex",
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px solid rgb(228, 229, 240)",
    cursor: "pointer",
  },
  "content__discount-gift": {
    height: "64px",
    width: "64px",
    display: "flex",

    justifyContent: "center",

    alignItems: "center",
    marginRight: "12px",
    borderRadius: "4px",
    backgroundColor: " rgb(251, 236, 236)",
  },
  "content__discount-box": {
    flex: " 1 1 0%",
    display: "flex",
    flexDirection: "column",

    justifyContent: "space-between",
  },

  "box-title": {
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "20px",
    overflow: "hidden",
    textOverflow: "ellipsis",

    color: "rgb(67, 70, 87)",
  },
  "box-expiryDay": {
    display: "flex",

    justifyContent: "space-between",
    marginTop: "8px",
  },

  "box-expiryDay-apply": {
    fontSize: "14px",
    lineHeight: "20px",
    color: "seagreen",
  },
  content__button: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  buttonAction: {
    width: "100%",
    //   border: "1px solid #03a051",
    padding: "0rem 1.25rem",
    borderRadius: "0.25rem",
    //   backgroundColor: "seagreen",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    minWidth: "2.5rem",
    color: "#ffffff",
    transitionDuration: "80ms",
    transitionProperty: "background-color",
    height: "46px",
    cursor: "pointer",
  },
  "content__button--buy": {
    "&:hover": {
      backgroundColor: " #1230b0",
    },
  },
  "content__button--add": {
    backgroundColor: "#ffffff",
    border: "1px solid seagreen",
    color: "seagreen",
    fontWeight: 600,
  },
  "productDetail__wrapper-content--right--right": {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
    width: "24.4%",
  },
  "productDetail__wrapper-content--info": {
    padding: "16px",
    background: "white",
    borderRadius: "8px",
  },

  "info-policy": {
    borderStyle: "none",
    borderWidth: "1px",
    borderColor: "unset",
    opacity: 1,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: " 0.5rem",
  },
  "productDetail__wrapper-desc": {
    background: "white",
    borderRadius: "0.5rem",
    padding: "10px 16px",
  },
  desc__title: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    height: "auto",
    backgroundColor: "unset",
  },

  infoDetail: {
    "& td": {
      border: " 1px solid #dddddd",
      textAlign: "left",
      padding: "8px",
    },
    "& th": {
      textAlign: "left",
      padding: "8px",
    },

    " & tr:nth-child(even)": {
      backgroundColor: "#fafafa",
    },
  },
    danhGia: {
    marginBottom: 15,
  },
  inputRoot: {
    maxWidth: "100%",
    margin: "auto",
    padding: "0",
    position: "relative",
    cursor: "pointer",
    width: "100%",
  },
  avatarReviewer: {
    position: "absolute",
    top: "20%",
    left: "1%",
  },
  avatar: {
    display: "inline-block",
    float: "left",
  },
  avatarImg: {
    height: "36px",
    width: "36px",
    borderRadius: "25px",
  },
  inputReviwer: {
    cursor: "pointer",
    padding: "10px 10px 10px 60px",
    width: "100%",
    height: "60px",
    borderRadius: "4px",
    border: "1px solid #e8e8e9",
    background: "#fff",
    color: "#9b9b9b",
    fontSize: "14px",
    "&:focus": {
      outline: "none",
    },
  },
  imgReviewerStar: {
    position: "absolute",
    top: "50%",
    right: "3%",
    transform: "translateY(-50%) ",
    display: "flex",
    margin: "auto",
  },

  itemDis: {
    padding: "20px 20px 12px",
    border: "1px solid #e6e6e6",
    borderBottom: "none",
    borderRadius: "3px",
    backgroundColor: "#fff",
    maxWidth: "580px",
    width: "100%",
    margin: "auto",
    color: "#4a4a4a",
    marginBottom: 15,
  },
  infoUser: {},
  liveUser: {
    marginLeft: 10,
    display: "inline-block",
  },
  userName: {
    color: "#000",
    fontWeight: 500,
    fontSize: 14,
    // textTransform: "capitalize",
  },
  timePost: {
    color: "#9b9b9b",
    fontSize: 12,
  },

  left: {
    float: "left",
  },
  right: {
    textAlign: "center",
    float: "right",
  },
  btnDang: {
    backgroundColor: "#fb4226 !important",
    borderColor: "#fb4226 !important",
    color: "#fff !important",
    padding: "7px 25px !important",
    margin: "0px 0px 7px 0px !important",
    "&:hover": {
      backgroundColor: "#fb4226 !important",
      borderColor: "#fb4226 !important",
    },
  },
  dialogContent: {
    minHeight: (props) => (props.isMobile ? 70 : 95),
  },
  textField: {
    "& .MuiInputLabel-root": {
      transform: "translate(18px, 29px) scale(1)",
      color: "#4a4a4a",
      right: 18,
      top: (props) => (props.isMobile ? -15 : 0),
    },
    "& label.Mui-focused": {
      display: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "purple",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        top: 0,
        "& legend": {
          display: "none",
        },
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fb4226",
        boxShadow:
          "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(251 66 38 / 60%)",
        borderWidth: 1,
      },
      "& input": {
        padding: (props) => (props.isMobile ? "20px 20px" : "30px 20px"),
      },
    },
  },
  starPopup: {
    fontSize: (props) => (props.isMobile ? 27 : 40),
  },
  pointPopup: {
    color: "#7ed321",
    fontSize: (props) => (props.isMobile ? 27 : 40),
  },
  dialog: {
    "& .MuiDialog-container": {
      "& .MuiPaper-root": {
        // ...customScrollbar,
      },
    },
  },
  rootcloseButton: {
    margin: "0 !important",
    padding: "0 !important",
  },
  // closeButton: {
  //   position: "absolute !important",
  //   right: `${theme.spacing(1)} !important`,
  //   top: `${theme.spacing(1)} !important`,
  //   color: `${theme.palette.grey[500]} !important`,
  // },

  moreMovie: {
    margin: "30px auto",
    textAlign: "center",
    display: (props) => (props.hideBtn ? "none" : "block"),
  },
  moreMovieButton: {
    color: "#949494 !important",
    borderColor: "#949494 !important",
    padding: "7px 25px !important",
    backgroundColor: "transparent !important",
    "&:hover": {
      backgroundColor: "#fb4226 !important",
      borderColor: "#fb4226 !important",
      color: "#fff !important",
    },
    "@media (hover: none)": {
      "&:hover": {
        color: "#949494",
        borderColor: "#949494",
        backgroundColor: "transparent",
      },
    },
  }
}));

export default useStyles;
