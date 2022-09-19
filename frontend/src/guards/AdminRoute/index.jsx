import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";

export default function AdminRoute(props) {
  const { userLogin } = useSelector((state) => state.AuthReducer);
  const history = useHistory();
  const { component: ComponentAdmin, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        if (userLogin) {
          if (userLogin.user?.idRole?.roleName === "Admin" || userLogin.user?.idRole?.roleName === "NV Kho" || userLogin.user?.idRole?.roleName === "NV Bán Hàng") {
            return <ComponentAdmin {...propsRoute} />;
          }
        }

        return history.push("/login");
      }}
    />
  );
}
