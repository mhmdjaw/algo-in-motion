import React, { ChangeEvent } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Box, CssBaseline } from "@material-ui/core";
import useOptionsStyles from "./options-styles";

const Options: React.FC = () => {
  const classes = useOptionsStyles();
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (
    event: ChangeEvent<Record<string, unknown>>,
    newValue: number | number[]
  ) => {
    setValue(newValue as number);
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
        <Box width="20%" display="flex" alignItems="center">
          <Typography className={classes.typographyItems} variant="body2">
            NODES
          </Typography>
          <Slider
            className={classes.sliderItems}
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Box>
        <Box width="20%" display="flex" alignItems="center">
          <Typography className={classes.typographyItems} variant="body2">
            EDGES
          </Typography>
          <Slider
            className={classes.sliderItems}
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Box>
        <Box width="20%" display="flex" alignItems="center">
          <Typography className={classes.typographyItems} variant="body2">
            SPEED
          </Typography>
          <Slider
            className={classes.sliderItems}
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Box>
      </Box>
    </>
  );
};

export default Options;
