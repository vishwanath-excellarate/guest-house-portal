import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CustomSelect = ({
  menuItems,
  inputLabelText,
  value,
  label,
  handleChange,
  formStyle,
  ...rest
}) => {
  return (
    <FormControl sx={formStyle}>
      <InputLabel id="select-helper-label">{inputLabelText}</InputLabel>
      <Select
        {...rest}
        labelId="select-helper-label"
        id="select-helper"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {menuItems.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;

CustomSelect.propTypes = {
  menuItems: PropTypes.array,
  inputLabelText: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  formStyle: PropTypes.object,
};

CustomSelect.defaultProps = {
  menuItems: [],
  inputLabelText: "",
  value: "",
  label: "",
  handleChange: "",
  formStyle: {},
};
