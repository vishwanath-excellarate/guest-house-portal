import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import CustomInput from "../../ghcomponents/CustomInput";
import CloseIcon from "@mui/icons-material/Close";
import { fontStyle } from "../../themes/Styles";
import { COLORS } from "../../themes/Colors";

const AddRoom = ({ isModalOpen, setIsModalOpen }) => {
  const [roomDetails, setRoomDetails] = useState({ location: "", roomNo: "" });
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    if (!roomDetails.location && !roomDetails.roomNo) {
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
          Add Room
        </Typography>

        <CloseIcon onClick={() => setIsModalOpen(!isModalOpen)} />
      </Box>

      <Box>
        <CustomInput
          margin="normal"
          required
          fullWidth
          id="location"
          label="Room Location"
          name="location"
          autoComplete="location"
          error={isError}
          helperText={isError && "Enter Location Details"}
          value={roomDetails.location}
          onChange={(event) => {
            setRoomDetails({ ...roomDetails, location: event.target.value });
          }}
        />
        <CustomInput
          margin="normal"
          required
          fullWidth
          id="room_no"
          label="Room No"
          name="Room No"
          autoComplete="Room No"
          error={isError}
          helperText={isError && "Enter Room Details"}
          value={roomDetails.roomNo}
          onChange={(event) => {
            setRoomDetails({ ...roomDetails, roomNo: event.target.value });
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

export default AddRoom;
