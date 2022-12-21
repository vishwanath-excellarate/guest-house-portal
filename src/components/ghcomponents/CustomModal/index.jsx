import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";

const CustomModal = ({ open, onClose, modalStyle, boxStyle, children }) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 3, modalStyle }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300, md: 400 },
          bgcolor: "#fff",
          border: "1px solid #000",
          boxShadow: 24,
          p: 4,
          boxStyle,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;

CustomModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  modalStyle: PropTypes.object,
  boxStyle: PropTypes.object,
};

CustomModal.defaultProps = {
  open: false,
  onClose: "",
  modalStyle: {},
  boxStyle: {},
};
