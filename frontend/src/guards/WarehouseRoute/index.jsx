import React from "react";
import { Redirect, useHistory,useLocation } from "react-router-dom";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function WarehouseRoute(props) {
  const { userLogin } = useSelector((state) => state.AuthReducer);
  const history = useHistory();
  const { component: ComponentAdmin, ...restProps } = props;
  let location = useLocation();
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        if (userLogin) {
          if (
            userLogin.user?.idRole?.roleName === "Admin" ||
            userLogin.user?.idRole?.roleName === "NV Kho"
          ) {
            return <ComponentAdmin {...propsRoute} />;
          }
        }

        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Bạn không có quyền truy cập",
          showConfirmButton: false,
          timer: 1500,
        });
      }}
    />
  );
}
