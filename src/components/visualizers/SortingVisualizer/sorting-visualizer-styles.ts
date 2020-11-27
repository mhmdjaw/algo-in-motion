import { makeStyles } from "@material-ui/core";

const useSortingVisualizerStyles = makeStyles((theme) => ({
  container: {
    height: "95vh",
    width: "95vw",
  },
  bar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default useSortingVisualizerStyles;
