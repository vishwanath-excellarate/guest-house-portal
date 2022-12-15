import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import CustomInput from "../ghcomponents/CustomInput";
import { EXCELLARATE_LOGO } from "../assets/images";
import { SIGN_IN } from "../constants/commonString";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { emailRegex } from "../constants/utils";
import { COLORS } from "../themes/Colors";

const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = true;
  const isAdmin = false;
  const [showPassword, setShowPassword] = useState(false);
  const [logInDetails, setLogInDetails] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    isEmailError: false,
    isPasswordError: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isAdmin && isAuthenticated) {
      navigate("/dashboard");
      return;
    } else {
      navigate("/admin-dashboard");
      return;
    }

    // if (!logInDetails.email && !logInDetails.password) {
    //   setErrors({ isEmailError: true, isPasswordError: true });
    // } else if (!logInDetails.email || !emailRegex.test(logInDetails.email)) {
    //   setErrors({ ...errors, isEmailError: true });
    // } else if (!logInDetails.password) {
    //   setErrors({ ...errors, isPasswordError: true });
    // } else {
    //   setErrors({ isEmailError: false, isPasswordError: false });
    //   if (!isAdmin && isAuthenticated) {
    //     navigate("/dashboard");
    //     return;
    //   } else {
    //     navigate("/admin-dashboard");
    //     return;
    //   }
    // }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setLogInDetails({ ...logInDetails, email: value });
    setErrors({
      ...errors,
      isEmailError: value.length ? false : true,
    });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setLogInDetails({ ...logInDetails, password: value });
    setErrors({
      ...errors,
      isPasswordError: value.length ? false : true,
    });
  };

  return (
    <Container
      component="div"
      maxWidth={"xs"}
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
        <Box
          component="img"
          sx={{
            height: 65,
            paddingBottom: 2,
          }}
          alt="logo"
          src={EXCELLARATE_LOGO}
          loading="lazy"
        />
        <Typography component="h1" variant="h5">
          {SIGN_IN.SIGN_IN}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <CustomInput
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoFocus
            value={logInDetails.email}
            onChange={(event) => handleEmailChange(event)}
            error={errors.isEmailError}
            helperText={errors.isEmailError && SIGN_IN.EMAIL_HELPER_TEXT}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel
              required
              htmlFor="outlined-adornment-password"
              error={errors.isPasswordError}
            >
              Password
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={logInDetails.password}
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
              error={errors.isPasswordError}
            />
            {errors.isPasswordError && (
              <FormHelperText error>
                {SIGN_IN.PASSWORD_HELPER_TEXT}
              </FormHelperText>
            )}
          </FormControl>
          <Grid
            container
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={SIGN_IN.REMEMBER_ME}
              />
            </Grid>
            <Grid item>
              <Link
                href="/forgot-password"
                variant="body2"
                onClick={() => navigate("/forgot-password")}
                sx={{ color: COLORS.blue_azure, letterSpacing: 0.3 }}
              >
                {SIGN_IN.FORGOT_PASSWORD}
              </Link>
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
            {SIGN_IN.SIGN_IN}
          </Button>
          <Grid textAlign={"center"}>
            <Link
              href="/register"
              variant="body1"
              onClick={() => navigate("/register")}
              sx={{ color: COLORS.blue_azure, letterSpacing: 0.3 }}
            >
              {SIGN_IN.DONT_AN_ACCOUNT}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
