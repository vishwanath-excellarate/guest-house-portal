import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const CustomInput = ({
  required,
  fullWidth,
  id,
  label,
  name,
  autoFocus,
  value,
  onChange,
  error,
  helperText,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      required={required}
      fullWidth={fullWidth}
      id={id}
      label={label}
      name={name}
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default CustomInput;

CustomInput.propTypes = {
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

CustomInput.defaultProps = {
  required: true,
  fullWidth: true,
  id: "",
  label: "",
  name: "",
  autoFocus: false,
  value: "",
  onChange: "",
  error: false,
  helperText: "",
};
