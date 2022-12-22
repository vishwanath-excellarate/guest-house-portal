import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { FORGOT_PASSWORD } from "../constants/commonString";
import CustomInput from "../ghcomponents/CustomInput";
import { fontStyle } from "../themes/Styles";
import { forgot } from "./Login.action";
import { toast } from "react-toastify";
import appConfig from "../services/appConfig";
import { useDispatch } from "react-redux";
import { CircularLoader, DisabledBackground } from "../ghcomponents/Loader";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.length) {
      setIsError(true);
      return;
    } else {
      setLoading(true);
      setIsError(false);
      const userData = {
        email: email,
      };
      const { response, error } = await forgot(
        appConfig.API_BASE_URL,
        userData,
        dispatch
      );
      if (response) {
        toast.success(response?.data?.message);
        setEmail("");
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
          {FORGOT_PASSWORD.FORGOT_PASSWORD}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <CustomInput
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            error={isError}
            helperText={isError && "Invalid Email Address"}
            value={email}
            onChange={(event) => {
              const value = event.target.value;
              setEmail(value);
              setIsError(value ? false : true);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, ...fontStyle() }}
            onClick={() => handleSubmit()}
          >
            {FORGOT_PASSWORD.SEND}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
