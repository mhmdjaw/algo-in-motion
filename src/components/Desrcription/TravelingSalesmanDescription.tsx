import { Typography } from "@material-ui/core";
import React from "react";
import useDescriptionStyles from "./description-styles";

const TravelingSalesmanDescription: React.FC = () => {
  const classes = useDescriptionStyles();

  return (
    <>
      <Typography className={classes.title}>Legends</Typography>
      <Typography variant="h6" className={classes.legend}>
        <span className={classes.primaryLegend}>pink: </span>current best path
        <br />
        <span className={classes.secondaryLegend}>blue: </span>current
        possiblity
      </Typography>

      <Typography className={classes.notice}>
        Cities become undraggable once the visualization begins. This is to
        prevent the distances between cities from changing while the
        visualization is running.
      </Typography>

      <Typography className={classes.title}>Explanation</Typography>
      <Typography>
        The traveling salesman problem is described as a salesman who must
        travel <em className={classes.italic}>n</em> number of cities, and the
        goal is to find the shortest possible route to visit each city exactly
        once. The ordering of cities doesn&apos;t matter.
        <br />
        <br />
        The problem is a famous <strong className={classes.emp}>
          NP-hard
        </strong>{" "}
        problem. Meaning There is no known polynomial time solution for it.
        <br />
        <br />
        The backtracking approach generates all{" "}
        <em className={classes.italic}>n!</em> possible routes, calculates the
        cost of each route, and keeps track of the current best route with the
        minimum cost. Since the algorithm goes over all the different
        possibilities, the time complexity is an exponential{" "}
        <em className={classes.italic}>O (n!)</em>. The reason the maximum
        number of cities in the visualizer is limited to 9.
      </Typography>
    </>
  );
};

export default TravelingSalesmanDescription;
