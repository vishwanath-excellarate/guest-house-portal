import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { ROOM_REQUEST } from "../constants/commonString";
import CustomInput from "../ghcomponents/CustomInput";
import CustomSelect from "../ghcomponents/CustomSelect";
import { COLORS } from "../themes/Colors";

const RoomRequest = () => {
  const [roomRequestFormDetails, setRoomRequestFormDetails] = useState({
    buName: "",
    project: "",
    location: "",
    approvedBy: "",
    checkIn: "",
    checkOut: "",
    purpose: "",
    arrivalTime: "",
  });

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">{ROOM_REQUEST.ROOM_REQUEST_FORM}</Typography>
      <Box
        component="form"
        noValidate
        onSubmit={() => console.log("hi")}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomSelect
              formStyle={{ minWidth: "100%" }}
              menuItems={["BU-1", "BU-2", "BU-3", "BU-4", "BU-5", "BU-6"]}
              label={"Choose BU"}
              inputLabelText={"Choose BU"}
              value={roomRequestFormDetails.buName}
              handleChange={(e) =>
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  buName: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              required
              fullWidth
              id="Project/ Client"
              label="Project/ Client"
              name="Project/ Client"
              autoComplete="family-name"
              value={roomRequestFormDetails.project}
              onChange={(e) =>
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  project: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              required
              fullWidth
              id="Location"
              label="Location"
              name="Location"
              autoComplete="Location"
              value={roomRequestFormDetails.location}
              onChange={(e) =>
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  location: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              required
              fullWidth
              id="Approved By"
              label="Approved By"
              name="Approved By"
              autoComplete="Approved By"
              value={roomRequestFormDetails.approvedBy}
              onChange={(e) =>
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  approvedBy: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              required
              fullWidth
              id="Check In"
              label="Check In"
              name="Check In"
              autoComplete="Check In"
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              value={roomRequestFormDetails.checkIn}
              onChange={(e) =>
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  checkIn: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              required
              fullWidth
              name="Check Out"
              label="Check Out"
              id="Check Out"
              autoComplete="Check Out"
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              value={roomRequestFormDetails.checkOut}
              onChange={(e) =>
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  checkOut: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              required
              fullWidth
              name="Purpose Of Visit"
              label="Purpose Of Visit"
              id="Purpose Of Visit"
              autoComplete="Purpose Of Visit"
              value={roomRequestFormDetails.purpose}
              onChange={(e) =>
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  purpose: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              required
              fullWidth
              name="Arrival Time"
              label="Arrival Time"
              id="Arrival Time"
              autoComplete="Arrival Time"
              type="time"
              InputLabelProps={{ shrink: true, required: true }}
              value={roomRequestFormDetails.arrivalTime}
              onChange={(e) =>
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  arrivalTime: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: COLORS.blue_azure }}
        >
          {ROOM_REQUEST.SEND}
        </Button>
      </Box>
    </Container>
  );
};

export default RoomRequest;
