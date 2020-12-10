import { Typography } from "@material-ui/core";
import React from "react";
import useDescriptionStyles from "./description-styles";

const PathfindingDescription: React.FC = () => {
  const classes = useDescriptionStyles();

  return (
    <>
      <Typography className={classes.title}>Legends</Typography>
      <Typography variant="h6" className={classes.legend}>
        <span className={classes.iterateLegend}>green: </span>starting cell
        <br />
        <span className={classes.swapLegend}>red: </span>target cell
        <br />
        <span className={classes.primaryLegend}>pink: </span>closed cells the
        algorithm expanded through
        <br />
        <span className={classes.secondaryLegend}>blue: </span>path found
      </Typography>

      <Typography className={classes.title}>Explanation</Typography>
      <Typography>
        For the maze generation, there are quite a few available algorithms out
        there (and they are all as fun to watch). In this particular visualizer,
        the randomized breadth-first search is used. It holds an array of all
        the current possible cells the maze could extend to and randomly chooses
        one of them as long as the cell is available (not a white cell yet).
        <br />
        <br />
        A* pathfinding is one of the most efficient pathfinding algorithms and
        the best solution in many cases. You can find its uses in maps, games,
        and many other fields. The secret of its success is driven by its
        ability to cleverly search for the target by using{" "}
        <strong className={classes.emp}>heuristics</strong>. This means it tries
        to guess the distance from the current cell to the target. The guess is
        always underestimated assuming there are no obstacles on the way. The
        current total cost is then calculated for the cell using the formula{" "}
        <em className={classes.italic}>f = g + h</em> which is the main aspect
        of the algorithm. <em className={classes.italic}>g</em> is the current
        cost from the starting cell to the current cell,{" "}
        <em className={classes.italic}>h</em> is the estimated cost of the cell,
        and <em className={classes.italic}>f</em> is the total cost.{" "}
        <em className={classes.italic}>h</em> is based on a formula we apply
        depending on the nature of the graph. In the case of this maze, since
        it&apos;s basically a grid and we&apos;re only allowed to move in four
        directions, we can use the Manhattan distance{" "}
        <em className={classes.italic}>
          h = | x<sub>a</sub> - x<sub>b</sub> | + | y<sub>a</sub> - y
          <sub>b</sub> |
        </em>{" "}
        where <em className={classes.italic}>a</em> is the current cell and{" "}
        <em className={classes.italic}>b</em> is the target. Each step, we pick
        the cell with the lowest <em className={classes.italic}>f</em>, expand
        into it, and calculate the <em className={classes.italic}>f</em> of its
        available children. The process is repeated until the target is found.
      </Typography>
    </>
  );
};

export default PathfindingDescription;
