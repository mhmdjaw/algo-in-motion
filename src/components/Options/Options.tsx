import React, { ChangeEvent } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Box, CssBaseline } from "@material-ui/core";
import useOptionsStyles from "./options-styles";
import { OptionsState } from "../../redux/options/options-types";
import { useDispatch, useSelector } from "react-redux";
import { changeSize, changeSpeed } from "../../redux";
import { VisualizerState } from "../../redux/visualizer/visualizer-types";

interface rootState {
  options: OptionsState;
  visualizer: VisualizerState;
}

const Options: React.FC = () => {
  const classes = useOptionsStyles();
  const state = useSelector((state: rootState) => state);
  const dispatch = useDispatch();

  const handleChange = (name: string) => (
    event: ChangeEvent<Record<string, unknown>>,
    newValue: number | number[]
  ) => {
    const value = newValue as number;
    console.log(name);
    console.log(value);

    if (name === "size") {
      dispatch(changeSize(value));
    } else if (name === "speed") {
      dispatch(changeSpeed(value));
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        width="95vw"
        justifyContent="space-around"
        mx="auto"
        my="10vh"
      >
        {/* <Box width="20%" display="flex" alignItems="center">
          <Typography className={classes.typographyItems} variant="body2">
            NODES
          </Typography>
          <Slider
            className={classes.sliderItems}
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Box> */}
        <Box width="20%" display="flex" alignItems="center">
          <Typography className={classes.typographyItems} variant="body2">
            SIZE
          </Typography>
          <Slider
            className={classes.sliderItems}
            max={310}
            min={5}
            value={state.options.size}
            onChange={handleChange("size")}
            aria-labelledby="continuous-slider"
          />
        </Box>
        <Box width="20%" display="flex" alignItems="center">
          <Typography className={classes.typographyItems} variant="body2">
            SPEED
          </Typography>
          <Slider
            className={classes.sliderItems}
            value={state.options.speed}
            onChange={handleChange("speed")}
            disabled={state.visualizer.isRunning}
            aria-labelledby="continuous-slider"
          />
        </Box>
      </Box>
    </>
  );
};

export default Options;
