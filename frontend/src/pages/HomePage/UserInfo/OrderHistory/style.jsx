import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((them) => ({
  inputReviwer: {
    cursor: "pointer",
    padding: "10px 10px 10px 10px",
    width: "100%",
    height: "60px",
    borderRadius: "4px",
    border: "1px solid #e8e8e9",
    background: "#fff",
    color: "#9b9b9b",
    fontSize: "14px",
    "&:focus": {
      outline: "none",
    },
  },
}));
export default useStyles;