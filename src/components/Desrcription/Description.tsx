import React from "react";
import { Box, Container, Paper } from "@material-ui/core";
import { useParams } from "react-router-dom";
import {
  A_STAR_PATHFINDING,
  BFS,
  DFS,
  MERGE_SORT,
  QUICK_SORT,
  TIMES_TABLES,
  TRAVELING_SALESMAN,
} from "../../algorithms/algorithm-types";
import QuickSortDescription from "./QuickSortDescription";
import MergeSortDescription from "./MergeSortDescription";
import BFSDescription from "./BFSDescription";
import DFSDescription from "./DFSDescription";
import useDescriptionStyles from "./description-styles";
import TimesTablesDescription from "./TimesTablesDescription";
import TravelingSalesmanDescription from "./TravelingSalesmanDescription";
import PathfindingDescription from "./PathfindingDescription";

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
          {algorithm === TRAVELING_SALESMAN && <TravelingSalesmanDescription />}
          {algorithm === A_STAR_PATHFINDING && <PathfindingDescription />}
        </Paper>
      </Box>
    </Container>
  );
};

export default Description;
