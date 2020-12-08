import { makeStyles } from "@material-ui/core";

const usePathfindingVisualizerStyles = makeStyles({
  grid: {
    display: "grid",
    // width: "721px",
    // height: "721px",
    justifyContent: "center",
    alignContent: "center",
    margin: "0 auto",
    backgroundColor: "black",
  },
  cell: {
    // height: "7px",
    // width: "7px",
    backgroundColor: "black",
  },
});

export default usePathfindingVisualizerStyles;
