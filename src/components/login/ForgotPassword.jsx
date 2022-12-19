import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { FORGOT_PASSWORD } from "../constants/commonString";
import CustomInput from "../ghcomponents/CustomInput";
import { fontStyle } from "../themes/Styles";

const ForgotPassword = () => {
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
            // autoFocus
            // value={logInDetails.email}
            // onChange={(e) =>
            //   setLogInDetails({ ...logInDetails, email: e.target.value })
            // }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, ...fontStyle() }}
          >
            {FORGOT_PASSWORD.SEND}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
