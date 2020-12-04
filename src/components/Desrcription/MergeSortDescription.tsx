import { Typography } from "@material-ui/core";
import React from "react";
import useDescriptionStyles from "./description-styles";

const MergeSortDescription: React.FC = () => {
  const classes = useDescriptionStyles();

  return (
    <>
      <Typography className={classes.title}>Legends</Typography>
      <Typography variant="h6" className={classes.legend}>
        <span className={classes.primaryLegend}>pink: </span>merging left and
        right halves
        <br />
        <span className={classes.secondaryLegend}>blue: </span>merged version of
        the partition
      </Typography>

      <Typography className={classes.title}>Explanation</Typography>
      <Typography>
        Just like Quick Sort, Merge Sort is a Divide and Conquer algorithm, and
        one of its main competitors. The main difference is that unlike Quick
        Sort, Merge Sort is <strong className={classes.emp}>stable </strong>,
        which means it has the same complexity of{" "}
        <em className={classes.italic}>O (n log n) </em> from its best to its
        worst case. The reason why in the worst case it performs better than
        Quick Sort which has a complexity of{" "}
        <em className={classes.italic}>
          O (n<sup>2</sup>),{" "}
        </em>{" "}
        although in general, its performance is lower because it makes more
        comparisons than Quick Sort on average.
        <br />
        <br />
        Merge Sort is based on the idea of dividing the list in two halves
        recursively until there is only one element in each sublist. At this
        point, each sublist is considered to be sorted. After that comes the
        process of merging back two sorted sublists at a time until the main
        list is completely sorted.
      </Typography>
    </>
  );
};

export default MergeSortDescription;
