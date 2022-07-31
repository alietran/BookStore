// material
import { Stack, Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth } from "../../utils/firebase";

// component

// ----------------------------------------------------------------------

export default function AuthSocial() {
  // const [signInWithGoogle, _user, _loading, error] =
  //   useSignInWithGoogle(auth);

  // const getUser = async () => {
  //   const response = await axios
  //     .get("http://localhost:8080/api/v1/admins/login/success", {
  //       withCredentials: true,
  //     })
  //     .catch((err) => {
  //       console.log("Not properly authenticated");
  //       // dispatch(setIsAuthenticated(false));
  //       // dispatch(setAuthUser(null));
  //       // history.push("/login/error");
  //     });

  //   if (response && response.data) {
  //     console.log("User: ", response.data);
  //     // dispatch(setIsAuthenticated(true));
  //     // dispatch(setAuthUser(response.data));
  //     // history.push("/welcome");
  //   }
  // };

  // const redirectToGoogleSSO = async () => {
  //   // let timer: NodeJS.Timeout | null = null;
  //   const googleLoginURL = "http://127.0.0.1:8080/api/v1/admins/login/google";
  //   const newWindow = window.open(
  //     googleLoginURL,
  //     "_blank",
  //     "width=500,height=600"
  //   );
  //   if (newWindow) {
  //     if (newWindow.closed) {
  //       console.log("Yay we're authenticated");
  //       getUser();
  //     }
  //   }
  // };

  // const signIn = () => {
  //   //  const googleLoginURL = "http://127.0.0.1:8080/api/v1/users/login/google";
  //   //  const newWindow = window.open(
  //   //    googleLoginURL,
  //   //    "_self",
  //   //    "width=500,height=600"
  //   //  );
  //   signInWithGoogle();
  // };


    const google = () => {
      window.open("http://localhost:8080/api/v1/users/google", "_self");
    };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={google}
        >
          <img
            src="/img/media/social-google.svg"
            alt="google"
            width="22"
            height="22"
          />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <img
            src="/img/media/social-facebook.svg"
            alt="facebook"
            width="26"
            height="26"
          />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <img
            src="/img/media/social-github.svg"
            alt="github"
            width="27"
            height="27"
          />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
