import { Box, Button, Container, Typography } from "@mui/material";

import React, { useState } from "react";
import { FORGOT_PASSWORD } from "../constants/commonString";
import CustomInput from "../ghcomponents/CustomInput";
import { fontStyle } from "../themes/Styles";
import { reset } from "./Login.action";
import { toast } from "react-toastify";
import appConfig from "../services/appConfig";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleSubmit = async () => {
    if (!pass.length) {
      setIsError(true);
      return;
    } else {
      setLoading(true);
      setIsError(false);
      const userData = {
        hash: {
          iv: urlParams.get("vi"),
          content: urlParams.get("content")
        },
        password: pass
      };
      setIsModalOpen(false);
      const { response, error } = await reset(
        appConfig.API_BASE_URL,
        userData,
        dispatch, 
        navigate
      );
      if (response) {
        toast.success(response?.data?.message);
        setPass("");
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
          <CustomInput
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            name="password"
            autoComplete="password"
            error={isError}
            helperText={isError && "Invalid Email Address"}
            value={pass}
              onChange={(event) => {
                setPass(event.target.value);
              }}
              
          />

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
