// import { Fragment } from "react";

// import { Route } from "react-router";
// import SnackbarProviderCustom from "../../components/Snackbar";
// import Footer from "../../layouts/MainLayout/Footer/Footer";
// import Header from "../../layouts/MainLayout/Header/Header";

// const HomeTemplate = (props) => {
//   const { Component, ...restProps } = props;
//   // propsRoute sd để truyền dl khi điều hướng trang như lấy deatail
//   return (
//     <Route
//       {...restProps}
//       render={(propsRoute) => {
//         //props.location,props.history,props.match
//         return (
//           <SnackbarProviderCustom
//             maxSnack={3}
//             anchorOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//           >
//             <Fragment>
//               <Header {...propsRoute} />
//               <Component {...propsRoute} />
//               <Footer {...propsRoute} />
//             </Fragment>
//           </SnackbarProviderCustom>
//         );
//       }}
//     />
//   );
// };
// export default HomeTemplate;
