import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  address: {
    display: " grid",
    gap: "10px",
    gridTemplateColumns: " repeat(2, 1fr)",
  },
  address__detailName: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: " 0.875rem",
  },
  address__detail: {
    borderRadius: "4px",
    display: "inline-block",
    userSelect: "none",
    border: "1px solid rgb(20, 53, 195)",
    backgroundColor: "rgb(255, 255, 255)",
    padding: " 0.5rem 1.25rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    height: "120px",
  },

  address__option: {
    display: "flex",
  },
  address__img: {
    marginLeft: "3px",
    height: "20px",
  },
  border__checked: {
    position: "absolute",
    top: "-1px",
    right: "-1px",
    width: "0px",
    height: "0px",
    borderStyle: "solid",
    borderWidth: "0px 36px 36px 0px",
    borderColor: "transparent rgb(20, 53, 195) transparent transparent",
  },
  checked: {
    display: "flex",
    position: "absolute",
    top: "-1px",
    right: "-1px",
    zIndex: "0",
  },
  address__detailAdd: {
    textAlign: "center",
    verticalAlign: "center",
    position: "absolute",
    top: "40px",
    right: "160px",
  },
}));

export default useStyles;
