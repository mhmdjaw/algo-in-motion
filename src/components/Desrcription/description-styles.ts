import { makeStyles } from "@material-ui/core";

const useDescriptionStyles = makeStyles((theme) => ({
  paper: {
    padding: "3%",
    justifyContent: "center",
  },
  title: {
    fontSize: theme.typography.h3.fontSize as string,
    marginBottom: "3%",
  },
  emp: {
    color: theme.palette.primary.main,
  },
  italic: {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  notice: {
    lineHeight: "2",
    marginBottom: "10%",
  },
  legend: {
    lineHeight: "2",
    marginBottom: "10%",
  },
  primaryLegend: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  secondaryLegend: {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
  whiteLegend: {
    color: "white",
    fontWeight: "bold",
  },
  blackLegend: {
    color: "black",
    fontWeight: "bold",
  },

  pivotLegend: {
    color: "yellow",
    fontWeight: "bold",
  },
  swapLegend: {
    color: "red",
    fontWeight: "bold",
  },
  iterateLegend: {
    color: "lime",
    fontWeight: "bold",
  },
}));

export default useDescriptionStyles;
