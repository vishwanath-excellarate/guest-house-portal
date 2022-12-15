import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import CustomInput from "../../ghcomponents/CustomInput";
import CloseIcon from "@mui/icons-material/Close";
import { USER_SCREEN_CONSTANT } from "../../constants/commonString";
import { fontStyle } from "../../themes/Styles";
import { COLORS } from "../../themes/Colors";

const AddUser = ({ isModalOpen, setIsModalOpen }) => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    if (!email.length) {
      setIsError(true);
      return;
    }
    setIsError(false);
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
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{ marginRight: 2, ...fontStyle() }}
          onClick={() => handleSubmit()}
        >
          Add
        </Button>
        <Button variant="contained" sx={{ ...fontStyle(COLORS.red) }}>
          Cacnel
        </Button>
      </Box>
    </Container>
  );
};

export default AddUser;
