import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../ghcomponents/CustomInput";
import { ACCOUNT_SETUP } from "../../constants/commonString";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { COLORS } from "../../themes/Colors";
import CustomSelect from "../../ghcomponents/CustomSelect";
import { userAccountReg } from "./AccountRegister.action";
import appConfig from "../../services/appConfig";
import { useDispatch } from "react-redux";

const AccountRegister = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    designation: "",
    phoneNo: "",
    gender: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    isFullName: false,
    isDesignation: false,
    isPhone: false,
    isGender: false,
    isPassword: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !userDetails.fullName &&
      !userDetails.designation &&
      !userDetails.phoneNo &&
      !userDetails.password
    ) {
      setErrors({
        isFullName: true,
        isDesignation: true,
        isPhone: true,
        isGender: true,
        isPassword: true,
      });
    } else if (!userDetails.fullName) {
      setErrors({ ...errors, isFullName: true });
    } else if (!userDetails.designation) {
      setErrors({ ...errors, isDesignation: true });
    } else if (!userDetails.phoneNo) {
      setErrors({ ...errors, isPhone: true });
    } else if (!userDetails.gender) {
      setErrors({ ...errors, isGender: true });
    } else if (!userDetails.password) {
      setErrors({ ...errors, isPassword: true });
    } else {
      setErrors({
        isFullName: false,
        isDesignation: false,
        isPhone: false,
        isGender: false,
        isPassword: false,
      });
      const data = {
        hash: {
          iv: urlParams.get("vi"),
          content: urlParams.get("content"),
        },
        fullname: userDetails.fullName,
        designation: userDetails.designation,
        gender: userDetails.gender,
        password: userDetails.password,
        number: userDetails.phoneNo,
      };
      const { response, error } = userAccountReg(
        appConfig.API_BASE_URL,
        data,
        dispatch,
        navigate
      );
    }
  };

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      fullName: value,
    });
    setErrors({ ...errors, isFullName: value ? false : true });
  };

  const handleDesignationChange = (event) => {
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      designation: value,
    });
    setErrors({ ...errors, isDesignation: value ? false : true });
  };

  const handlePhoneNoChange = (event) => {
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      phoneNo: value,
    });
    setErrors({ ...errors, isPhone: value ? false : true });
  };

  const handleGenderChange = (event) => {
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      gender: value,
    });
    setErrors({ ...errors, isGender: value ? false : true });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      password: value,
    });
    setErrors({ ...errors, isPassword: value ? false : true });
  };

  return (
    <Container
      component="div"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {ACCOUNT_SETUP.ACCOUNT_REGISTER}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                required
                fullWidth
                autoFocus
                id="Full Name"
                label="Full Name"
                name="Full Name"
                autoComplete="given-name"
                value={userDetails.fullName}
                onChange={(event) => handleFullNameChange(event)}
                error={errors.isFullName}
                helperText={errors.isFullName && ACCOUNT_SETUP.NAME_HELPER_TEXT}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                required
                fullWidth
                id="Designation"
                label="Designation"
                name="Designation"
                autoComplete="Designation"
                value={userDetails.designation}
                onChange={(event) => handleDesignationChange(event)}
                error={errors.isDesignation}
                helperText={
                  errors.isDesignation && ACCOUNT_SETUP.DESIGNATION_HELPER_TEXT
                }
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                required
                fullWidth
                type={"number"}
                id="phone-number"
                label="Phone No."
                name="phone-number"
                autoComplete="phone-number"
                value={userDetails.phoneNo}
                onChange={(event) => handlePhoneNoChange(event)}
                error={errors.isPhone}
                helperText={errors.isPhone && ACCOUNT_SETUP.PHONE_HELPER_TEXT}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomSelect
                required
                error={errors.isGender}
                formStyle={{ width: "100%" }}
                menuItems={ACCOUNT_SETUP.GENDER}
                label={"Gender"}
                inputLabelText={"Gender"}
                value={userDetails.gender}
                handleChange={(event) => handleGenderChange(event)}
              />
              {errors.isGender && (
                <FormHelperText error>
                  {ACCOUNT_SETUP.GENDER_HELPER_TEXT}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel
                  required
                  htmlFor="outlined-adornment-password"
                  error={errors.isPassword}
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={userDetails.password}
                  onChange={(event) => handlePasswordChange(event)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  error={errors.isPassword}
                />
                {errors.isPassword && (
                  <FormHelperText error>
                    {ACCOUNT_SETUP.PASSWORD_HELPER_TEXT}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: COLORS.blue_azure,
              textTransform: "capitalize",
              fontSize: 16,
              letterSpacing: 0.3,
            }}
            onClick={(event) => handleSubmit(event)}
          >
            {ACCOUNT_SETUP.REGISTER}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AccountRegister;
