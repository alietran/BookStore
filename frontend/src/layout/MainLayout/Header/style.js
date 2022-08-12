import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    menuCate: {
      display: "none",
      position: "absolute",
      top: "60px",
      zIndex: "10",
      width: "50%",
      padding: "20px",
      right: "25%",
      borderRadius: "5px",
      backgroundColor: "#f5f5fa",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
      "& a": {
        lineHeight: 1.7,
        color: "black",
      },
    },
    titleCate: {
      "& :hover": {
        "& $menuCate": {
          display: "block",
          backgroundColor: "red",
        },
      },
    },
    title: {
      display: "block",
      paddingBottom: "15px",
      fontWeight: "bold",
      borderBottom: "2px #eaeaea solid",
      marginBottom: "5px",
    },
  };
});

export { useStyles };
