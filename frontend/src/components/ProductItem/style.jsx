import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  productItem: {
    "&:hover": {
      border: "1px solid #03a051 !important",
    },
  },
}));
export default useStyles