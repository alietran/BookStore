import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  productNew: {
    backgroundColor: "#ffdb15",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    lineHeight: "35px",
    textAlign: "center",
    zIndex: "1",
    position: "absolute",
    top: "10px",
    // right:"0px",
  },
  productItem: {
    position: "relative",
  },
}));
export default useStyles;
