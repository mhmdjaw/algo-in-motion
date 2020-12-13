import React, { useState } from "react";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import { useTheme } from "@material-ui/core/styles";
import logo from "../../assets/logo.svg";
import algorithms from "../../assets/algorithms.mp4";
import playButton from "../../assets/play-button.mp4";
import options from "../../assets/options.png";
import description from "../../assets/description.mp4";
import { makeStyles, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles({
  tutorialItem: {
    height: "80%",
    width: "80%",
  },
});

const Tutorial: React.FC = () => {
  const classes = useStyles();

  const [isTutorial, setIsTutorial] = useState<boolean>(
    (localStorage.getItem("isFirstTime") ?? "true") === "true"
  );

  const onTutorialExit = () => {
    localStorage.setItem("isFirstTime", "false");
    setIsTutorial(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const color = theme.palette;
  const [BACKGROUND, PAPER] = [
    color.background.default,
    color.background.paper,
  ];

  return (
    <AutoRotatingCarousel
      label="Close Tutorial"
      open={isTutorial}
      onStart={onTutorialExit}
      mobile={isMobile}
      ButtonProps={{ color: "primary", variant: "outlined" }}
      autoplay={false}
    >
      <Slide
        media={<img src={logo} className={classes.tutorialItem} />}
        mediaBackgroundStyle={{ backgroundColor: BACKGROUND }}
        style={{ backgroundColor: PAPER }}
        title="Welcome to Algo in Motion"
        subtitle="Let's walk through the tutorial! Feel free to skip it by clicking on the button below."
      />
      <Slide
        media={
          <video
            className={classes.tutorialItem}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={algorithms} type="video/mp4" />
          </video>
        }
        mediaBackgroundStyle={{ backgroundColor: BACKGROUND }}
        style={{ backgroundColor: PAPER }}
        title="Algorithms"
        subtitle="Choose your algorithm from the menu list."
      />
      <Slide
        media={
          <video
            className={classes.tutorialItem}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={playButton} type="video/mp4" />
          </video>
        }
        mediaBackgroundStyle={{ backgroundColor: BACKGROUND }}
        style={{ backgroundColor: PAPER }}
        title="Visualizing"
        subtitle="Use the action button to run the visualizer or reset it."
      />
      <Slide
        media={<img src={options} />}
        mediaBackgroundStyle={{ backgroundColor: BACKGROUND }}
        style={{ backgroundColor: PAPER }}
        title="Options"
        subtitle="Each visualizer has a set of options you can control."
      />
      <Slide
        media={
          <video
            className={classes.tutorialItem}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={description} type="video/mp4" />
          </video>
        }
        mediaBackgroundStyle={{ backgroundColor: BACKGROUND }}
        style={{ backgroundColor: PAPER }}
        title="Description"
        subtitle="Scroll down to read the decription of the visualizer."
      />
    </AutoRotatingCarousel>
  );
};

export default Tutorial;
