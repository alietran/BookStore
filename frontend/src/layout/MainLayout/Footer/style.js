import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  textColor: {
    "& > li > a": {
      color: "#333333",
    },
    "& > li ": {
      margin: "5px 0",
    },
    "& > a": {
      color: "#333333",
    },
  },
  footer: {
    backgroundColor: "#f4f4f4",
    padding: "0 20px",
  },
}));

export default useStyles;
