import { Typography } from "@material-ui/core";
import React from "react";
import useDescriptionStyles from "./description-styles";

const QuickSortDescription: React.FC = () => {
  const classes = useDescriptionStyles();

  return (
    <>
      <Typography className={classes.title}>Legends</Typography>
      <Typography variant="h6" className={classes.legend}>
        <span className={classes.pivotLegend}>yellow: </span>current pivot
        <br />
        <span className={classes.iterateLegend}>green: </span>iterating on low
        and high
        <br />
        <span className={classes.swapLegend}>red: </span>swaping values
      </Typography>

      <Typography className={classes.title}>Explanation</Typography>
      <Typography>
        Quick Sort is a Divide and Conquer algorithm, which means the problem is
        recursively divided into smaller problems until they are easy to solve.
        The time complexity of quick sort is
        <em className={classes.italic}> O(n log n)</em> in the best and average
        case, and{" "}
        <em className={classes.italic}>
          O(n<sup>2</sup>)
        </em>{" "}
        in the worst case. However, on average it has the best sorting
        performance which is the reason why it is considered the{" "}
        <strong className={classes.emp}>fastest </strong>
        sorting algorithm.
        <br />
        <br />
        The algorithm first picks a random pivot and places all elements with
        values that are less than the pivot on the left and elements with
        greater values than the pivot on the right. The process is then repeated
        recursively on the left and right partitions until no further
        partitioning can be made.
      </Typography>
    </>
  );
};

export default QuickSortDescription;
