import { Typography } from "@material-ui/core";
import React from "react";
import useDescriptionStyles from "./description-styles";

const BFSDescription: React.FC = () => {
  const classes = useDescriptionStyles();

  return (
    <>
      <Typography className={classes.title}>Legends</Typography>
      <Typography variant="h6" className={classes.legend}>
        <span className={classes.primaryLegend}>pink: </span>visited node or
        edge
        <br />
        <span className={classes.secondaryLegend}>blue: </span>dequeued node
      </Typography>

      <Typography className={classes.title}>Explanation</Typography>
      <Typography>
        Breadth First Search is a graph traversing algorithm. The goal of it is
        to visit every node of the graph once. The time complexity of BFS is
        <em className={classes.italic}> O (V + E) </em> where{" "}
        <em className={classes.italic}>V </em>
        is the number of vertices (nodes) and{" "}
        <em className={classes.italic}>E </em>
        is the number of edges. This is because the algorithm checks every
        vertex and edge once to see if it&apos;s visited.
        <br />
        <br />
        The algorithm follows a breadthward strategy. It covers the whole depth
        level of the current vertex by checking all its neighbors, visiting the
        unvisited ones and adding them to the queue. Once done, another vertex
        is dequeued and the same process is applied. The process is repeated
        starting from a random vertex and until the queue becomes empty.
      </Typography>
    </>
  );
};

export default BFSDescription;
