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

      <Typography className={classes.title}>Algorithm Explanation</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </>
  );
};

export default MergeSortDescription;
