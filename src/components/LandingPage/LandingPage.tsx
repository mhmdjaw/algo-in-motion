import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import useLandingPageStyles from "./landing-page-styles";
import landingPageAnimationVariants from "./landing-page-animation-variants";

const LandingPage: React.FC = () => {
  const classes = useLandingPageStyles();
  const {
    leftContainerVariants,
    svgVariants,
    pathVariants,
  } = landingPageAnimationVariants;
  const history = useHistory();

  const MotionBox = motion.custom(Box);
  const MotionTypography = motion.custom(Typography);
  const MotionButton = motion.custom(Button);

  return (
    <Box display="flex" justifyContent="center" height="100vh" width="100vw">
      <Box alignSelf="center" mx="5%">
        <MotionTypography
          variant="h1"
          className={classes.typography}
          custom={0}
          initial="hidden"
          animate="visible"
          variants={leftContainerVariants}
        >
          ALGO
        </MotionTypography>
        <MotionTypography
          variant="h1"
          className={classes.typography}
          custom={1}
          initial="hidden"
          animate="visible"
          variants={leftContainerVariants}
        >
          IN
        </MotionTypography>
        <MotionTypography
          variant="h1"
          className={classes.typography}
          custom={2}
          initial="hidden"
          animate="visible"
          variants={leftContainerVariants}
        >
          MOTION
        </MotionTypography>
        <MotionButton
          className={classes.button}
          variant="outlined"
          color="primary"
          fullWidth={true}
          size="large"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={leftContainerVariants}
          onClick={() => history.push("/algorithms")}
        >
          START
        </MotionButton>
      </Box>
      <MotionBox
        height="60%"
        width="30%"
        mx="5%"
        alignSelf="center"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        className={classes.item}
      >
        <svg
          id="Layer_1_1_"
          // enableBackground="new 0 0 100 100"
          height="100%"
          viewBox="0 0 64 64"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g fill="#68607c" style={{ stroke: "#68607c" }}>
            <motion.path
              d="m13.55 13h14.9v2h-14.9z"
              transform="matrix(.94 -.342 .342 .94 -3.524 8.035)"
              variants={pathVariants}
            />
            <motion.path
              d="m42 9.686h2v22.627h-2z"
              transform="matrix(.707 -.707 .707 .707 -2.255 36.556)"
              variants={pathVariants}
            />
            <motion.path
              d="m42 24.444h1.999v12.113h-1.999z"
              transform="matrix(.136 -.991 .991 .136 6.926 68.943)"
              variants={pathVariants}
            />
            <motion.path
              d="m20 14.556h2v17.889h-2z"
              transform="matrix(.447 -.894 .894 .447 -9.41 31.775)"
              variants={pathVariants}
            />
            <motion.path
              d="m19.825 41.406h2.001v16.018h-2.001z"
              transform="matrix(.448 -.894 .894 .448 -32.685 45.919)"
              variants={pathVariants}
            />
            <motion.path d="m31 33h2v17h-2z" variants={pathVariants} />
            <motion.path
              d="m5.513 26h30.974v2h-30.974z"
              transform="matrix(.544 -.839 .839 .544 -13.08 29.93)"
              variants={pathVariants}
            />
            <motion.path
              d="m31.824 42.25h22.832v2h-22.832z"
              transform="matrix(.691 -.723 .723 .691 -17.903 44.594)"
              variants={pathVariants}
            />
            <motion.path
              d="m19.785 20.006h2v32.257h-2z"
              transform="matrix(.86 -.511 .511 .86 -15.542 15.688)"
              variants={pathVariants}
            />
          </motion.g>
          <motion.path
            style={{ stroke: "#4e9bb9" }}
            d="m17 44c0 1.13-.26 2.19-.74 3.13-1.14 2.3-3.52 3.87-6.26 3.87-3.87 0-7-3.13-7-7s3.13-7 7-7c1.41 0 2.71.41 3.8 1.12 1.93 1.25 3.2 3.41 3.2 5.88z"
            fill="#4e9bb9"
            variants={pathVariants}
          />
          <motion.path
            d="m37.31 49.45c1.06 1.22 1.69 2.81 1.69 4.55 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-.81.14-1.58.39-2.3.48-1.41 1.4-2.6 2.6-3.44 1.13-.8 2.51-1.26 4.01-1.26 2.13 0 4.04.95 5.31 2.45z"
            fill="#91cbd7"
            style={{ stroke: "#91cbd7" }}
            variants={pathVariants}
          />
          <motion.path
            d="m54 25c3.87 0 7 3.13 7 7s-3.13 7-7 7c-1.88 0-3.58-.73-4.83-1.95-1.34-1.26-2.17-3.06-2.17-5.05 0-.32.02-.63.07-.94.2-1.56.92-2.95 1.98-4.01 1.27-1.27 3.01-2.05 4.95-2.05z"
            fill="#ffd086"
            style={{ stroke: "#ffd086" }}
            variants={pathVariants}
          />
          <motion.path
            d="m38.93 29.94c-.45 3.42-3.38 6.06-6.93 6.06-3.87 0-7-3.13-7-7 0-1.13.26-2.19.74-3.13 1.14-2.3 3.52-3.87 6.26-3.87 3.87 0 7 3.13 7 7 0 .32-.02.63-.07.94z"
            fill="#ed6571"
            style={{ stroke: "#ed6571" }}
            variants={pathVariants}
          />
          <motion.path
            d="m32 3c3.87 0 7 3.13 7 7 0 1.94-.78 3.68-2.05 4.95s-3.01 2.05-4.95 2.05c-1.41 0-2.71-.41-3.8-1.12-1.27-.82-2.26-2.04-2.78-3.49-.27-.74-.42-1.55-.42-2.39 0-3.87 3.13-7 7-7z"
            fill="#f69489"
            style={{ stroke: "#f69489" }}
            variants={pathVariants}
          />
          <motion.path
            d="m16.58 15.61c.27.74.42 1.55.42 2.39 0 1.13-.26 2.19-.74 3.13-.6 1.2-1.53 2.2-2.68 2.88-1.04.63-2.27.99-3.58.99-3.87 0-7-3.13-7-7s3.13-7 7-7c3.03 0 5.6 1.92 6.58 4.61z"
            fill="#91cbd7"
            style={{ stroke: "#91cbd7" }}
            variants={pathVariants}
          />
        </svg>
      </MotionBox>
    </Box>
  );
};

export default LandingPage;
