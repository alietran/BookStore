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
    padding: "15px 15px 0 15px",
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
    alignItems: "flex-end",
  },
  center: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "end",
  },
  "box__content-name-product": {
    fontSize: "15px",
    marginLeft: "20px",
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
    paddingBottom: "18px",
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
    "&:hover": {
      color: "blue",
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
    paddingBottom: "18px",
  },
  quantityValue: {
    backgroundColor: "rgb(248, 248, 252)",
    textAlign: "center",
    backgroundColor: "transparent",
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "rgb(67, 70, 87)",
    width: "25px",
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

// .cart {
//   .container {
//     max-width: 1247px;
//     margin: 0 auto;
//   }
//   &__wrapper {
//     &-breadcrumbs {
//       white-space: nowrap;
//       display: flex;
//       margin: 1rem 0px;
//       .breadcrumbs-icon {
//         height: 32px;
//         width: fit-content;
//         -webkit-box-align: center;
//         align-items: center;
//         display: flex;
//         -webkit-box-pack: center;
//         justify-content: center;
//         white-space: nowrap;
//         margin-right: 10px;
//         &--link {
//           margin-right: 10px;
//           cursor: pointer;
//           overflow: hidden;
//           line-height: 1rem;
//           display: inline-flex;
//           -webkit-box-align: center;
//           align-items: center;
//           -webkit-box-pack: center;
//           justify-content: center;
//           text-align: center;
//           user-select: none;
//           flex-direction: row;
//           position: relative;
//           padding: 8px;
//           color: rgb(51, 51, 51);
//           text-decoration: none;
//           background-color: rgb(255, 255, 255);
//           pointer-events: auto;
//           border: 1px solid rgb(224, 224, 224);
//           border-radius: 9999px;
//           img {
//             width: 16px;
//             height: 16px;
//             display: inline-block;
//           }
//         }
//       }
//       .breadcrumbs-name {
//         height: 32px;
//         width: fit-content;
//         -webkit-box-align: center;
//         align-items: center;
//         display: flex;
//         -webkit-box-pack: center;
//         justify-content: center;
//         white-space: nowrap;
//         a {
//           cursor: pointer;
//           overflow: hidden;
//           line-height: 1rem;
//           display: inline-flex;
//           -webkit-box-align: center;
//           align-items: center;
//           -webkit-box-pack: center;
//           justify-content: center;
//           text-align: center;
//           user-select: none;
//           flex-direction: row;
//           position: relative;
//           padding: 8px;
//           color: #333333;
//           text-decoration: none;
//           background-color: rgb(255, 255, 255);
//           pointer-events: none;
//           border: 1px solid rgb(224, 224, 224);
//           border-radius: 9999px;
//         }
//       }
//     }
//     &-content {
//       display: flex;
//       margin-bottom: 24px;
//       &--main {
//         .cart__title {
//           display: flex;
//           justify-content: space-between;
//           h2 {
//             color: #000;
//           }
//           a {
//             cursor: pointer;
//             transition: all 0.5s;
//             margin-right: 10px;
//           }
//           &:hover {
//             color: blue;
//           }
//         }
//         box-sizing: border-box;
//         margin: 0;
//         min-width: 0;
//         width: 75.6%;
//         margin-right: 16px;
//         .cart__wrapper-content--box {
//           display: flex;

//           flex-direction: row;
//           -webkit-box-align: center;
//           align-items: center;
//           padding: 24px;
//           background: white;
//           border-radius: 8px;
//           .box__option {
//             flex: 0 0 4%;
//             align-items: center;
//             vertical-align: middle;
//           }
//           .box__content {
//             flex: 0 0 96%;
//             display: grid;
//             grid-template-columns: 2.5fr 1fr 1fr 1fr;
//             flex: 0 0 96%;

//             .center {
//               display: flex;
//               align-items: center;
//               justify-content: end;
//             }
//             &-name {
//               display: flex;
//               align-items: flex-end;
//               // .center{
//               //   display: flex;
//               //   align-items: center;
//               // }
//               &-img {
//                 border-style: solid;
//                 border-width: 1px;
//                 border-color: rgb(228, 229, 240);
//                 opacity: 1;
//                 position: relative;
//                 border-radius: 50%;
//                 width: 60px;
//                 height: 60px;
//                 display: flex;
//                 -webkit-box-pack: center;
//                 justify-content: center;
//                 -webkit-box-align: center;
//                 align-items: center;
//                 background-color: unset;
//                 img {
//                   width: 60px;
//                   height: 60px;
//                   padding: 0 12px;
//                   object-fit: contain;
//                 }
//               }
//               &-product {
//                 font-size: 15px;
//                 margin-left: 15px;
//               }
//             }
//           }
//         }
//         .cart__wrapper-content--product {
//           border-top: 1px solid #f3f3f3;
//           display: flex;
//           flex-direction: row;
//           -webkit-box-align: center;
//           align-items: center;
//           padding: 24px;
//           background: white;
//           border-radius: 8px;
//           .box__option {
//             flex: 0 0 4%;
//             align-items: center;
//             vertical-align: middle;
//           }
//           .box__content {
//             flex: 0 0 96%;
//             display: grid;
//             grid-template-columns: 2.5fr 1fr 1fr 1fr;
//             flex: 0 0 96%;
//             .center {
//               display: flex;
//               align-items: center;
//               justify-content: end;
//             }
//             .quanty {
//               align-items: end;
//               display: flex;
//               flex-direction: column;
//               padding-bottom: 18px;
//             }
//             &-quantity {
//               display: flex;
//               .delete {
//                 padding-left: 10px;
//                 cursor: pointer;
//                 &:hover {
//                   color: blue;
//                 }
//               }
//               &-detail {
//                 display: flex;
//                 padding-bottom: 5px;
//                 // .disabled {
//                 //   border: 1px solid #999999;
//                 //   background-color: #cccccc;
//                 //   color: #666666;
//                 //   cursor: not-allowed;
//                 // }
//                 input {
//                   background-color: rgb(248, 248, 252);
//                   text-align: center;
//                   background-color: transparent;
//                   font-size: 0.8125rem;
//                   font-weight: 500;
//                   color: rgb(67, 70, 87);
//                   width: 25px;
//                 }
//                 button{
//                    border: 1px solid #999999;
//                 }
//               }
//             }
//             &-name {
//               display: flex;
//               align-items: center;

//               gap: 12px;
//               &-img {
//                 text-decoration: none;
//                 color: unset;
//                 cursor: pointer;
//                 border-style: solid;
//                 border-width: 1px;
//                 border-color: rgb(228, 229, 240);
//                 opacity: 1;
//                 position: relative;

//                 width: 80px;
//                 height: 80px;
//                 display: flex;
//                 -webkit-box-pack: center;
//                 justify-content: center;
//                 -webkit-box-align: center;
//                 align-items: center;
//                 background-color: unset;
//                 img {
//                   width: 80px;
//                   height: 80px;
//                   padding: 0 12px;
//                   object-fit: contain;
//                 }
//               }
//               &-product {
//                 font-size: 15px;
//               }
//             }
//           }
//         }
//       }
//       &--right {
//         box-sizing: border-box;
//         margin: 0;
//         min-width: 0;
//         width: 24.4%;
//         .cart__wrapper-content--info {
//           padding: 16px;
//           background: white;
//           border-radius: 8px;
//           .info-voucher {
//             display: flex;
//             justify-content: space-between;
//             .apply {
//               border-style: none;
//               border-width: 1px;
//               border-color: unset;
//               opacity: 1;
//               height: 2.5rem;
//               padding: 0rem 1.25rem;
//               border-radius: 0.25rem;
//               background-color: #1435c3;
//               position: relative;
//               display: flex;
//               -webkit-box-align: center;
//               align-items: center;
//               -webkit-box-pack: center;
//               justify-content: center;
//               outline: none;
//               min-width: 2.5rem;
//               color: #fff;
//               cursor: not-allowed;
//               transition-duration: 80ms;
//               transition-property: background-color;
//             }
//             .info-text {
//               border-style: solid;
//               border-radius: 0.25rem;
//               border-width: 1px;
//               opacity: 1;
//               background-color: transparent;
//               height: 40px;
//               padding: 0rem 0.75rem;
//               display: flex;
//               -webkit-box-align: center;
//               align-items: center;
//               border-color: rgb(228, 229, 240);
//               input {
//                 flex: 1 1 0%;
//                 width: 100%;
//                 border: none;
//                 font-size: 13px;
//                 color: rgb(67, 70, 87);
//                 background-color: rgb(255, 255, 255);
//               }
//             }
//           }
//         }
//         .cart__wrapper-content--payment {
//           background: white;
//           border-radius: 8px;
//           margin-top: 20px;
//           h4 {
//             font-size: 20px;
//           }
//           .info-payment {
//             display: flex;
//             flex-direction: column;
//             align-items: flex-end;
//             .payment-tab {
//               width: 100%;
//               caption-side: bottom;
//               border-collapse: collapse;
//               td {
//                 line-height: 1.8rem;
//               }
//             }
//             .VAT {
//               align-items: right;
//             }
//           }
//           .continue {
//             margin-top: 15px;
//             color: #fff;
//             width: 100%;
//             border: none;
//             padding: 10px;
//             font-weight: 500;
//             border-radius: 5px;
//             background-color: #1435c3;
//           }
//         }
//       }
//     }
//   }
// }
