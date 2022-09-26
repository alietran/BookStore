import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    backgroundCellShow: {
      backgroundColor: "#f5f5f5",
    

      "&:hover": {
        backgroundColor: "#f5f5f5 !important",
      },
    },
    backgroundCellHidden: {
      backgroundColor: "white",
    },
  };
});

export { useStyles };
