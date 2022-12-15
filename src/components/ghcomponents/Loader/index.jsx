import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, styled } from "@mui/system";

export const CircularLoader = ({ size, color }) => {
  return (
    <CircularProgress
      size={size}
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        color: color,
      }}
    />
  );
};

export const LinearLoader = () => {
  return <LinearProgress sx={{ zIndex: 2 }} />;
};

export const DisabledBackground = styled(Box)({
  width: "100%",
  height: "100%",
  position: "fixed",
  background: "#ccc",
  opacity: 0.5,
  zIndex: 1,
});

CircularLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

CircularLoader.defaultProps = {
  size: 70,
  color: "#1976d2",
};
