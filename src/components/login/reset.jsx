import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { FORGOT_PASSWORD } from "../constants/commonString";
import { fontStyle } from "../themes/Styles";
import { reset } from "./Login.action";
import { toast } from "react-toastify";
import appConfig from "../services/appConfig";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CircularLoader, DisabledBackground } from "../ghcomponents/Loader";

const ResetPassword = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    isPassword: false,
    isNewPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [reserData, setReserData] = useState({ password: "", newPassword: "" });
  const [showPassword, setShowPassword] = useState({
    isPass1: false,
    isPass2: false,
  });
  const [helperTest, setHelperTest] = useState({
    text1: "Passwod Is Required",
    text2: "New Password Is Required",
  });

  const handleSubmit = async () => {
    if (!reserData.password && !reserData.newPassword) {
      setErrors({ isPassword: true, isNewPassword: true });
    } else if (!reserData.password) {
      setErrors({ ...errors, isPassword: true });
    } else if (!reserData.newPassword) {
      setErrors({ ...errors, isNewPassword: true });
    } else if (reserData.password !== reserData.newPassword) {
      setErrors({ isPassword: true, isNewPassword: true });
      setHelperTest({
        text1: "Both Passwords Must Match",
        text2: "Both Passwords Must Match",
      });
    } else {
      setErrors({ isPassword: false, isNewPassword: false });
      setLoading(true);
      const userData = {
        hash: {
          iv: urlParams.get("vi"),
          content: urlParams.get("content"),
        },
        password: reserData.password,
      };
      const { response, error } = await reset(
        appConfig.API_BASE_URL,
        userData,
        dispatch,
        navigate
      );
      if (response) {
        toast.success(response?.data?.message);
      }
      if (error) {
        toast.error(error?.data.message);
      }
      setLoading(false);
    }
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
      {loading && (
        <DisabledBackground>
          <CircularLoader />
        </DisabledBackground>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {FORGOT_PASSWORD.RESET_TITLE}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel
              required
              htmlFor="outlined-adornment-password-1"
              error={errors.isPassword}
            >
              Password
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password-1"
              type={showPassword.isPass1 ? "text" : "password"}
              value={reserData.password}
              onChange={(event) => {
                const value = event.target.value;
                setReserData({ ...reserData, password: value });
                setErrors({ ...errors, isPassword: value ? false : true });
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        isPass1: !showPassword.isPass1,
                      })
                    }
                    edge="end"
                  >
                    {showPassword.isPass1 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              error={errors.isPassword}
            />
            {errors.isPassword && (
              <FormHelperText error>{helperTest.text1}</FormHelperText>
            )}
          </FormControl>

          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel
              required
              htmlFor="outlined-adornment-password-2"
              error={errors.isNewPassword}
            >
              New Password
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password-2"
              type={showPassword.isPass2 ? "text" : "password"}
              value={reserData.newPassword}
              onChange={(event) => {
                const value = event.target.value;
                setReserData({ ...reserData, newPassword: value });
                setErrors({ ...errors, isNewPassword: value ? false : true });
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        isPass2: !showPassword.isPass2,
                      })
                    }
                    edge="end"
                  >
                    {showPassword.isPass2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              error={errors.isNewPassword}
            />
            {errors.isNewPassword && (
              <FormHelperText error>{helperTest.text2}</FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, ...fontStyle() }}
            onClick={() => handleSubmit()}
          >
            {FORGOT_PASSWORD.RESET}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
