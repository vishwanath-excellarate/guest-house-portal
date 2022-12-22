import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, styled } from "@mui/system";
import { ToastContainer } from "react-toastify";

export const Toaster = ({ position, theme }) => {
  return (
    <ToastContainer
      position={position}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme={theme}
    />
  );
};
Toaster.propTypes = {
  position: PropTypes.string,
  theme: PropTypes.string,
};

Toaster.defaultProps = {
  position: "top-right",
  theme: "colored",
};

export const CircularLoader = ({ size, color }) => {
  return (
    <CircularProgress
      size={size}
      sx={{
        position: "fixed",
        left: { xs: "41%", sm: "45%", md:"48%" },
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
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
  zIndex: 10,
});

CircularLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

CircularLoader.defaultProps = {
  size: 70,
  color: "#1976d2",
};
