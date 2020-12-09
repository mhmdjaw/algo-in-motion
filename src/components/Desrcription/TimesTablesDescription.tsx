import { Typography } from "@material-ui/core";
import React from "react";
import Link from "@material-ui/core/Link";
import useDescriptionStyles from "./description-styles";

const TimesTablesDescription: React.FC = () => {
  const classes = useDescriptionStyles();

  return (
    <Typography>
      Taken by this fascinating animation and just can&apos;t stop looking at
      it? I won&apos;t blame you. I could stare at this forever. What
      you&apos;re witnessing here is the artistic side of math. Yes, you heard
      me right. This animation is not really algorithm based. The reason I
      decided to include it is just how fascinating the animation and how
      interesting the concept behind it is.
      <br />
      <br />
      <br />
      The concept is actually pretty simple. Several points are spaced equally
      on the circle. Each point has an index between{" "}
      <em className={classes.italic}>0</em> and{" "}
      <em className={classes.italic}>n - 1</em> (total number of points)
      depending on its position and will be connected to another position on the
      circle with a straight line. The connection is determined by multiplying
      the index of the point by a certain{" "}
      <strong className={classes.emp}>factor</strong>. If the factor is 2, then
      point 1 goes to 2, 3 to 6, 4 to 8, etc. In case the index of the
      destination point is greater than the total number of points, it wraps
      around by using the modulo operator.
      <br />
      <br />
      <br />
      That&apos;s it! The animation is then produced by playing around with the
      factor. Each frame is a different factor starting from{" "}
      <em className={classes.italic}>0</em> and incrementing by{" "}
      <em className={classes.italic}>0.01</em>. We end up with this absolutely
      stunning animation that goes on forever. All it takes is straight lines
      changing positions using basic math to produce this animation. Just
      increase the number of points and animation speed to max and enjoy math
      doing wonders.
      <br />
      <br />
      <br />
      <br />
      The idea was inspired by Mathologer&apos;s video &quot;Times Tables,
      Mandelbrot and the Heart of Mathematics&quot;:
      <Link
        href="https://www.youtube.com/watch?v=qhbuKbxJsk8"
        target="_blank"
        rel="noopener"
      >
        {" "}
        The video
      </Link>
    </Typography>
  );
};

export default TimesTablesDescription;
