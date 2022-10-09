import React from 'react'

export default function Loading() {
  return (
    <div style={{display: "flex", justifyContent:"center",alignItem:"center",margin:"20px 0"}}>
      <img src="/img/data_1755_animated-loading-gif-28.gif" alt="" height={300} width={300}/>
    </div>
  );
}

// import React, { useEffect, useRef, useState, useCallback } from "react";

// import { makeStyles } from "@mui/styles";
// import clsx from "clsx";
// import { useSelector } from "react-redux";
// import useHandleVibrateLazy from "../../utils/UseHandleVibrateLazy";

// const useStyles = makeStyles({
//   root: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     backgroundColor: (props) => (props.effectFadeOut ? "transparent" : "#fff"),
//     zIndex: -1,
//     transition: "background-color 0.6s ease-in-out",

//     width: "100vw",
//     height: "100vh",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   visible: {
//     zIndex: 99999,
//   },
//   image: {
//     width: 140,
//     animation: "$shake 0.6s infinite",
//     position: "relative",
//   },
//   fadeIn: {
//     animationName: "$fadeIn",
//     animationDuration: "0.6s",
//   },
//   fadeOut: {
//     animationName: "$fadeOut",
//     animationDuration: "0.6s",
//   },
//   "@keyframes shake": {
//     "0%": { transform: "rotate(-10deg)" },
//     "50%": { transform: "rotate(10deg)" },
//     "100%": { transform: "rotate(-10deg)" },
//   },
//   "@keyframes fadeIn": {
//     "0%": { opacity: 0, transform: "scale(0.6,0.6)" },
//     "70%": { opacity: 0.7, transform: "scale(1.1,1.1)" },
//     "100%": { opacity: 1, transform: "scale(1)" },
//   },
//   "@keyframes fadeOut": {
//     "0%": { opacity: 1, transform: "scale(1)" },
//     "70%": { opacity: 0.7, transform: "scale(1.1,1.1)" },
//     "100%": { opacity: 0, transform: "scale(0.6,0.6)" },
//   },
// });

// export default function Loading() {
//   const isLazy = useHandleVibrateLazy();
//   // const isLoadingBackToHome = useSelector(
//   //   (state) => state.LazyReducer.isLoadingBackToHome
//   // );
//   const loadingAuthorList = useSelector(
//     (state) => state.AuthorReducer.loadingAuthorList
//   );
//   const loadingOrderList = useSelector(
//     (state) => state.OrderReducer.loadingOrderList
//   );
//   // const loadingDetailMovie = useSelector(
//   //   (state) => state.MovieReducer.loadingDetailMovie
//   // );
//   // const loadingGetDetailUser = useSelector(
//   //   (state) => state.AuthReducer.loadingGetDetailUser
//   // );
//   // const loadingCurrentUserLogin = useSelector(
//   //   (state) => state.AuthReducer.loadingCurrentUserLogin
//   // );
//   // const loadingDetailDiscount = useSelector(
//   //   (state) => state.DiscountReducer.loadingDetailDiscount
//   // );
//   const loading = isLazy || loadingAuthorList || loadingOrderList; ;
//   // isLazy ||
//   // loadingAuthorList ||
//   // loadingDetailMovie ||
//   // isLoadingBackToHome ||
//   // loadingGetDetailUser ||
//   // loadingCurrentUserLogin ||
//   // loadingDetailDiscount ||
//   // loadingDetailShowtime;
//   const loadingPrevious = useRef(false);

//   const [controlEffect, setControlEffect] = useState({
//     visible: false,
//     effectFadeIn: false,
//     effectFadeOut: false,
//   });
//   const eFadeEffect = useRef(null);
//   const materialStyles = useStyles({
//     loading,
//     visible: controlEffect.visible,
//     effectFadeOut: controlEffect.effectFadeOut,
//   });

//   useEffect(() => {
//     // loadding chuyển từ false sang true
//     if (Number(loadingPrevious.current) < Number(loading)) {
//       // console.log("START: ", loadingPrevious.current, loading);
//       setControlEffect((data) => ({
//         ...data,
//         visible: true,
//         effectFadeIn: true,
//         effectFadeOut: false,
//       }));
//       loadingPrevious.current = true;
//       // loadding chuyển từ true sang false
//     } else if (Number(loadingPrevious.current) > Number(loading)) {
//       // console.log("END: ", loadingPrevious.current, loading);
//       setControlEffect((data) => ({
//         ...data,
//         visible: true,
//         effectFadeIn: false,
//         effectFadeOut: true,
//       }));
//       loadingPrevious.current = false;
//       // khi fadeOut kết thúc thì reset loading
//       eFadeEffect.current?.addEventListener("animationend", resetAnimation);
//     }
//   }, [loading]);

//   const resetAnimation = useCallback((e) => {
//     // dùng useCallback vì removeEventListener chỉ xóa sự kiện dựa trên cùng một function
//     eFadeEffect.current?.removeEventListener("animationend", resetAnimation);
//     setControlEffect((data) => ({
//       ...data,
//       visible: false,
//       effectFadeIn: false,
//       effectFadeOut: false,
//     }));
//   }, []);

//   return (
//     <div
//       className={clsx(
//         `${materialStyles.root}`,
//         controlEffect.visible && `${materialStyles.visible}`
//       )}
//       // khi chuyển url > component mới chưa load xong nên loading(zIndex: -1) hiện ra > cần ẩn đi lúc đó để hiệu ứng fadeIn mượt hơn
//       style={{ display: controlEffect.visible ? "flex" : "none" }}
//     >
//       <div
//         ref={eFadeEffect}
//         className={clsx(
//           controlEffect.effectFadeIn && `${materialStyles.fadeIn}`,
//           controlEffect.effectFadeOut && `${materialStyles.fadeOut}`
//         )}
//       >
//         {/* <div className={materialStyles.loader}></div> */}
//         <img
//           src="/img/data_1755_animated-loading-gif-28.gif"
//           className={materialStyles.image}
//           alt="logo"
//         />
//       </div>
//     </div>
//   );
// }
