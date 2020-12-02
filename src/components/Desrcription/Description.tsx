import React from "react";
import { Box, Container, Paper } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { MERGE_SORT, QUICK_SORT } from "../../algorithms/algorithm-types";
import QuickSortDescription from "./QuickSortDescription";
import MergeSortDescription from "./MergeSortDescription";
import useDescriptionStyles from "./description-styles";

const Description: React.FC = () => {
  const classes = useDescriptionStyles();
  const { algorithm } = useParams<{ algorithm: string }>();

  return (
    <Container maxWidth="md">
      <Box my="30vh">
        <Paper className={classes.paper} elevation={7}>
          {algorithm === QUICK_SORT && <QuickSortDescription />}
          {algorithm === MERGE_SORT && <MergeSortDescription />}
        </Paper>
      </Box>
    </Container>
  );
};

export default Description;
