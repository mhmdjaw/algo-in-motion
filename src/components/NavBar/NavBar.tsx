import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import algorithmMenuItems from "./algorithm-menu-items";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LogoIcon from "../../assets/logoIcon";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import GitHubIcon from "@material-ui/icons/GitHub";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import ReplayIcon from "@material-ui/icons/Replay";
import Slide from "@material-ui/core/Slide";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useNavBarStyles from "./nav-bar-styles";
import { useDispatch, useSelector } from "react-redux";
import {
  resetVisualizer,
  runVisualizer,
  changeVisualizer,
  resetOptions,
} from "../../redux";
import { VisualizerState } from "../../redux/visualizer/visualizer-types";

interface Props {
  children: React.ReactElement;
}

interface RootState {
  visualizer: VisualizerState;
}

const HideOnScroll: React.FC<Props> = (props: Props) => {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const NavBar: React.FC<Props> = (props: Props) => {
  const classes = useNavBarStyles();
  const history = useHistory();
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (algorithmURL: string) => {
    if (algorithmURL === pathname) {
      handleClose();
    } else {
      dispatch(changeVisualizer());
      dispatch(resetOptions());
      history.push(algorithmURL);
    }
    handleClose();
  };

  const handleActionClick = () => {
    if (
      state.visualizer.isRunning ||
      state.visualizer.isComplete ||
      state.visualizer.isGenerating
    ) {
      dispatch(resetVisualizer());
    } else {
      dispatch(runVisualizer());
    }
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar color="inherit">
          <Toolbar>
            <Button
              className={classes.menuButton}
              aria-controls="algorithm-menu"
              aria-haspopup="true"
              onClick={handleClick}
              startIcon={<LogoIcon />}
              endIcon={<ExpandMoreIcon />}
            >
              {algorithmMenuItems.map((menuItem) => {
                const { algorithmTitle, algorithmURL } = menuItem;
                if (algorithmURL === pathname) {
                  return algorithmTitle;
                }
              })}
            </Button>
            <Menu
              id="algorithm-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {algorithmMenuItems.map((menuItem) => {
                const { algorithmTitle, algorithmURL } = menuItem;
                return (
                  <MenuItem
                    key={uuidv4()}
                    onClick={() => handleMenuClick(algorithmURL)}
                  >
                    {algorithmTitle}
                  </MenuItem>
                );
              })}
            </Menu>
            <div className={classes.grow}></div>
            <IconButton
              href="https://github.com/mhmdjaw/algo-in-motion"
              target="_blank"
              className={classes.iconButton}
              aria-label="github-link"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              className={classes.iconButton}
              onClick={handleActionClick}
              aria-label="action-visualizer"
            >
              {state.visualizer.isRunning ||
              state.visualizer.isComplete ||
              state.visualizer.isGenerating ? (
                <ReplayIcon />
              ) : (
                <PlayArrowIcon />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};

export default NavBar;
