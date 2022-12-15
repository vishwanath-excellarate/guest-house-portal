import React, { useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import CustomInput from "../ghcomponents/CustomInput";
import { EXCELLARATE_ICON } from "../assets/images";
import { SIGN_UP } from "../constants/commonString";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { COLORS } from "../themes/Colors";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signUpdetails, setSignUpdetails] = useState({
    fullName: "",
    designation: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    isFullName: false,
    isDesignation: false,
    isPhone: false,
    isEmail: false,
    isPassword: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !signUpdetails.fullName &&
      !signUpdetails.designation &&
      !signUpdetails.phoneNo &&
      !signUpdetails.email &&
      !signUpdetails.password
    ) {
      setErrors({
        isFullName: true,
        isDesignation: true,
        isPhone: true,
        isEmail: true,
        isPassword: true,
      });
    } else if (!signUpdetails.fullName) {
      setErrors({ ...errors, isFullName: true });
    } else if (!signUpdetails.designation) {
      setErrors({ ...errors, isDesignation: true });
    } else if (!signUpdetails.phoneNo) {
      setErrors({ ...errors, isPhone: true });
    } else if (!signUpdetails.email) {
      setErrors({ ...errors, isEmail: true });
    } else if (!signUpdetails.password) {
      setErrors({ ...errors, isPassword: true });
    } else {
      setErrors({
        isFullName: false,
        isDesignation: false,
        isPhone: false,
        isEmail: false,
        isPassword: false,
      });
      navigate("/login");
    }
  };

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setSignUpdetails({
      ...signUpdetails,
      fullName: value,
    });
    setErrors({ ...errors, isFullName: value ? false : true });
  };

  const handleDesignationChange = (event) => {
    const value = event.target.value;
    setSignUpdetails({
      ...signUpdetails,
      designation: value,
    });
    setErrors({ ...errors, isDesignation: value ? false : true });
  };

  const handlePhoneNoChange = (event) => {
    const value = event.target.value;
    setSignUpdetails({
      ...signUpdetails,
      phoneNo: value,
    });
    setErrors({ ...errors, isPhone: value ? false : true });
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setSignUpdetails({
      ...signUpdetails,
      email: value,
    });
    setErrors({ ...errors, isEmail: value ? false : true });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setSignUpdetails({
      ...signUpdetails,
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
        {/* <Box
          component="img"
          sx={{
            height: 65,
            width: 65,
          }}
          alt="logo"
          src={EXCELLARATE_ICON}
          loading="lazy"
        /> */}
        <Typography component="h1" variant="h5">
          {SIGN_UP.SIGN_UP}
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
                value={signUpdetails.fullName}
                onChange={(event) => handleFullNameChange(event)}
                error={errors.isFullName}
                helperText={errors.isFullName && SIGN_UP.NAME_HELPER_TEXT}
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
                value={signUpdetails.designation}
                onChange={(event) => handleDesignationChange(event)}
                error={errors.isDesignation}
                helperText={
                  errors.isDesignation && SIGN_UP.DESIGNATION_HELPER_TEXT
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
                value={signUpdetails.phoneNo}
                onChange={(event) => handlePhoneNoChange(event)}
                error={errors.isPhone}
                helperText={errors.isPhone && SIGN_UP.PHONE_HELPER_TEXT}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                required
                fullWidth
                type={"email"}
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={signUpdetails.email}
                onChange={(event) => handleEmailChange(event)}
                error={errors.isEmail}
                helperText={errors.isEmail && SIGN_UP.EMAIL_HELPER_TEXT}
              />
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
                  value={signUpdetails.password}
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
                    {SIGN_UP.PASSWORD_HELPER_TEXT}
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
            {SIGN_UP.SIGN_UP}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link
                href="/login"
                variant="body2"
                onClick={() => navigate("/login")}
                sx={{
                  color: COLORS.blue_azure,
                  letterSpacing: 0.3,
                  fontSize: 16,
                }}
              >
                {SIGN_UP.ALREADY_ACCOUNT}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
