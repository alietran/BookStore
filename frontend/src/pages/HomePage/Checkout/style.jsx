import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  "info-text": {
    borderStyle: "solid",
    borderRadius: "0.25rem",
    borderWidth: "1px",
    opacity: 1,
    backgroundColor: "transparent",
    height: "60px",
    padding: "0rem 0.75rem",
    display: "flex",

    alignItems: "center",
    borderColor: "rgb(228, 229, 240)",
    "& img": {
      height: "40px !important",
      width: "40px !important",
    },
  },
  "info-product": {
    marginLeft: "20px",
    flex: "0 0 70%",
    lineHeight:0.8,
  },
}));

export default useStyles;
