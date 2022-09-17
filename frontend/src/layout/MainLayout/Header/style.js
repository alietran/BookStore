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
    dataResult: {
      marginTop: "5px",
      width: "300px",
      height: "auto",
      backgroundColor: "darrk",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      overflow: "hidden",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    dataItem: {
      width: "100%",
      height: "50px",
      display: "flex",
      alignItems: "center",
      color: "black",
      "& p": {
        marginLeft: "10px",
      },

      "& a": {
        textDecoration: "none",
      },
      "&:hover": {
        color: "black",
        backgroundColor: "lightgrey",
      },
    },
  };
});

export { useStyles };
