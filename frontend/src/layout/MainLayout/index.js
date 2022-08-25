import React from "react";
import SnackbarProviderCustom from "../../components/Snackbar";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function MainLayout(props) {
  return (
    <div>
      <SnackbarProviderCustom
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Header />
        {props.children}
        <Footer />
      </SnackbarProviderCustom>
    </div>
  );
}
