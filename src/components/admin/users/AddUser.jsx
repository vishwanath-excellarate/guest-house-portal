import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import CustomInput from "../../ghcomponents/CustomInput";
import CloseIcon from "@mui/icons-material/Close";
import { USER_SCREEN_CONSTANT } from "../../constants/commonString";
import { fontStyle } from "../../themes/Styles";
import { COLORS } from "../../themes/Colors";
import { addUserRequest } from "./User.action";
import appConfig from "../../services/appConfig";
import { toast } from "react-toastify";

const AddUser = ({ isModalOpen, setIsModalOpen, dispatch, setLoading }) => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

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
      setIsModalOpen(false);
      const { response, error } = await addUserRequest(
        appConfig.API_BASE_URL,
        userData,
        dispatch
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingBottom: 1,
        }}
      >
        <Typography component="h1" variant="h6" textAlign={"left"}>
          {USER_SCREEN_CONSTANT.ADD_USER}
        </Typography>

        <CloseIcon onClick={() => setIsModalOpen(!isModalOpen)} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <CustomInput
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          error={isError}
          helperText={isError && "Invalid Email Address"}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </Box>
      <Box
        sx={{
          paddingTop: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            ...fontStyle(),
            width: "100%",
           
          }}
          onClick={() => handleSubmit()}
        >
          Send Invite Link
        </Button>
      </Box>
    </Container>
  );
};

export default AddUser;
