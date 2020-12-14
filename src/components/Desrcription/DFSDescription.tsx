import { Typography } from "@material-ui/core";
import React from "react";
import useDescriptionStyles from "./description-styles";

const DFSDescription: React.FC = () => {
  const classes = useDescriptionStyles();

  return (
    <>
      <Typography className={classes.title}>Legends</Typography>
      <Typography variant="h6" className={classes.legend}>
        <span className={classes.primaryLegend}>pink: </span>visited node or
        edge
        <br />
        <span className={classes.secondaryLegend}>blue: </span>backtracked node
        or edge
      </Typography>

      <Typography className={classes.title}>Explanation</Typography>
      <Typography>
        Like Breadth First Search, Depth First Search is also a graph traversing
        algorithm, and has the same time complexity of
        <br />
        <em className={classes.italic}>O (V + E) </em>. The approach however is
        the opposite as the name states.
        <br />
        <br />
        DFS, unlike BFS, follows a depthward strategy. Starting from a random
        vertex, it goes as deep as possible from a vertex to another, each step
        moving immediately to the first unvisited neighbor. Upon reaching a dead
        end (when all the neighbors of the current vertex are visited), it
        starts backtracking one step at a time looking for another unvisited
        vertex and repeating the same process going back and forth until it
        backtracks to the first vertex it started from.
      </Typography>
    </>
  );
};

export default DFSDescription;
