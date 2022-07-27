import logo from "./logo.svg";
import "./App.css";
import shape from "./theme/shape";
import palette from "./theme/palette";
import typography from "./theme/typography";
import shadows, { customShadows } from "./theme/shadows";
import componentsOverride from "./theme/overrides";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserManager from "./pages/Admin/UserManager/UserManager";
import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Login from "./pages/Auth/Login";
import CategoryManager from "./pages/Admin/CategoryManager/CategoryManager";
import SubCategoryManager from "./pages/Admin/SubCategoryManager/SubCategoryManager";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import CreateUser from "./pages/Admin/UserManager/CreateUser";
function App() {

    const themeOptions = useMemo(
      () => ({
        palette,
        shape,
        typography,
        shadows,
        customShadows,
      }),
      []
    );

    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path={["/"]}>
            <MainLayout>
              <Route exact path="/" component={HomePage} />
            </MainLayout>
          </Route>
          <Route exact path="/login" component={Login} />
          <AdminTemplate exact path="/admin/users" Component={UserManager} />
          <AdminTemplate
            exact
            path="/admin/users/createUser"
            Component={CreateUser}
          />
          <AdminTemplate
            exact
            path="/admin/categories"
            Component={CategoryManager}
          />{" "}
          <AdminTemplate
            exact
            path="/admin/subcategories"
            Component={SubCategoryManager}
          />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
