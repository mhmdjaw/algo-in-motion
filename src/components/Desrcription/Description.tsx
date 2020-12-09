import React from "react";
import { Box, Container, Paper } from "@material-ui/core";
import { useParams } from "react-router-dom";
import {
  BFS,
  DFS,
  MERGE_SORT,
  QUICK_SORT,
  TIMES_TABLES,
} from "../../algorithms/algorithm-types";
import QuickSortDescription from "./QuickSortDescription";
import MergeSortDescription from "./MergeSortDescription";
import BFSDescription from "./BFSDescription";
import DFSDescription from "./DFSDescription";
import useDescriptionStyles from "./description-styles";
import TimesTablesDescription from "./TimesTablesDescription";

const Description: React.FC = () => {
  const classes = useDescriptionStyles();
  const { algorithm } = useParams<{ algorithm: string }>();

  return (
    <Container maxWidth="md">
      <Box my="30vh">
        <Paper className={classes.paper} elevation={7}>
          {algorithm === QUICK_SORT && <QuickSortDescription />}
          {algorithm === MERGE_SORT && <MergeSortDescription />}
          {algorithm === BFS && <BFSDescription />}
          {algorithm === DFS && <DFSDescription />}
          {algorithm === TIMES_TABLES && <TimesTablesDescription />}
        </Paper>
      </Box>
    </Container>
  );
};

export default Description;
