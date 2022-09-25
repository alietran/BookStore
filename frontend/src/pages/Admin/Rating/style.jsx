import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    backgroundCellShow: {
      backgroundColor: "#f8f8f8",
      "& td": {
        color: "white",
      },

      "&:hover": {
        backgroundColor: "#f8f8f8 !important",
      },
    },
    backgroundCellHidden: {
      backgroundColor: "white",
    },
  };
});

export { useStyles };
