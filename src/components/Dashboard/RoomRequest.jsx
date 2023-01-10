import {
  Button,
  Container,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BU_LIST, ROOM_REQUEST } from "../constants/commonString";
import CustomInput from "../ghcomponents/CustomInput";
import CustomSelect from "../ghcomponents/CustomSelect";
import appConfig from "../services/appConfig";
import { COLORS } from "../themes/Colors";
import { userRoomRequest } from "./dashboard.action";
import moment from "moment";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const RoomRequest = ({ loading, setLoading, setIsModalOpen }) => {
  const dispatch = useDispatch();
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
  const [errors, setErrors] = useState({
    isBu: false,
    isProject: false,
    isLocation: false,
    isApproved: false,
    isCheckIn: false,
    isCheckOut: false,
    isPurpose: false,
    isTime: false,
  });

  const handleRoomReqSubmit = async (event) => {
    event.preventDefault();
    if (
      !roomRequestFormDetails.buName &&
      !roomRequestFormDetails.project &&
      !roomRequestFormDetails.location &&
      !roomRequestFormDetails.approvedBy &&
      !roomRequestFormDetails.checkIn &&
      !roomRequestFormDetails.checkOut &&
      !roomRequestFormDetails.purpose &&
      !roomRequestFormDetails.arrivalTime
    ) {
      setErrors({
        isBu: true,
        isProject: true,
        isLocation: true,
        isApproved: true,
        isCheckIn: true,
        isCheckOut: true,
        isPurpose: true,
        isTime: true,
      });
    } else if (!roomRequestFormDetails.buName) {
      setErrors({ ...errors, isBu: true });
    } else if (!roomRequestFormDetails.project) {
      setErrors({ ...errors, isProject: true });
    } else if (!roomRequestFormDetails.location) {
      setErrors({ ...errors, isLocation: true });
    } else if (!roomRequestFormDetails.approvedBy) {
      setErrors({ ...errors, isApproved: true });
    } else if (!roomRequestFormDetails.checkIn) {
      setErrors({ ...errors, isCheckIn: true });
    } else if (!roomRequestFormDetails.checkOut) {
      setErrors({ ...errors, isCheckOut: true });
    } else if (!roomRequestFormDetails.purpose) {
      setErrors({ ...errors, isPurpose: true });
    } else if (!roomRequestFormDetails.arrivalTime) {
      setErrors({ ...errors, isTime: true });
    } else {
      setErrors({
        isBu: false,
        isProject: false,
        isLocation: false,
        isApproved: false,
        isCheckIn: false,
        isCheckOut: false,
        isPurpose: false,
        isTime: false,
      });
      setLoading(true);
      const data = {
        bu: roomRequestFormDetails.buName,
        client: roomRequestFormDetails.project,
        location: roomRequestFormDetails.location,
        approved_by: roomRequestFormDetails.approvedBy,
        checkin: moment(roomRequestFormDetails.checkIn).format("DD/MM/YYYY"),
        checkout: moment(roomRequestFormDetails.checkOut).format("DD/MM/YYYY"),
        arrival: roomRequestFormDetails.arrivalTime,
        purpose: roomRequestFormDetails.purpose,
      };
      const { response, error } = await userRoomRequest(
        appConfig.API_BASE_URL,
        data,
        dispatch
      );
      if (response) {
        toast.success(response?.data?.message);
        setIsModalOpen(false);
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
        <Typography variant="h5">{ROOM_REQUEST.ROOM_REQUEST_FORM}</Typography>
        <CloseIcon
          onClick={() => {
            setIsModalOpen(false);
          }}
        />
      </Box>
      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomSelect
              error={errors.isBu}
              formStyle={{ minWidth: "100%" }}
              menuItems={BU_LIST}
              label={"Choose BU"}
              inputLabelText={"Choose BU"}
              value={roomRequestFormDetails.buName}
              handleChange={(e) => {
                const value = e.target.value;
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  buName: value,
                });
                setErrors({ ...errors, isBu: value ? false : true });
              }}
            />
            {errors.isBu && (
              <FormHelperText error>{ROOM_REQUEST.BU_REQUIRED}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              error={errors.isProject}
              required
              fullWidth
              id="Project/ Client"
              label="Project/ Client"
              name="Project/ Client"
              autoComplete="family-name"
              value={roomRequestFormDetails.project}
              onChange={(e) => {
                const value = e.target.value;
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  project: value,
                });
                setErrors({ ...errors, isProject: value ? false : true });
              }}
              helperText={errors.isProject && ROOM_REQUEST.PROJECT}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              error={errors.isLocation}
              required
              fullWidth
              id="Location"
              label="Location"
              name="Location"
              autoComplete="Location"
              value={roomRequestFormDetails.location}
              onChange={(e) => {
                const value = e.target.value;
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  location: value,
                });
                setErrors({ ...errors, isLocation: value ? false : true });
              }}
              helperText={errors.isLocation && ROOM_REQUEST.LOCATION}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              error={errors.isApproved}
              required
              fullWidth
              id="Approved By"
              label="Approved By"
              name="Approved By"
              autoComplete="Approved By"
              value={roomRequestFormDetails.approvedBy}
              onChange={(e) => {
                const value = e.target.value;
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  approvedBy: value,
                });
                setErrors({ ...errors, isApproved: value ? false : true });
              }}
              helperText={errors.isApproved && ROOM_REQUEST.APPROVED_BY}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              error={errors.isCheckIn}
              required
              fullWidth
              id="Check In"
              label="Check In"
              name="Check In"
              autoComplete="Check In"
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              value={roomRequestFormDetails.checkIn}
              onChange={(e) => {
                const value = e.target.value;
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  checkIn: value,
                });
                setErrors({ ...errors, isCheckIn: value ? false : true });
              }}
              helperText={errors.isCheckIn && ROOM_REQUEST.CHECK_IN}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              error={errors.isCheckOut}
              required
              fullWidth
              name="Check Out"
              label="Check Out"
              id="Check Out"
              autoComplete="Check Out"
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              value={roomRequestFormDetails.checkOut}
              onChange={(e) => {
                const value = e.target.value;
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  checkOut: value,
                });
                setErrors({ ...errors, isCheckOut: value ? false : true });
              }}
              helperText={errors.isCheckOut && ROOM_REQUEST.CHECK_OUT}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              error={errors.isPurpose}
              required
              fullWidth
              name="Purpose Of Visit"
              label="Purpose Of Visit"
              id="Purpose Of Visit"
              autoComplete="Purpose Of Visit"
              value={roomRequestFormDetails.purpose}
              onChange={(e) => {
                const value = e.target.value;
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  purpose: value,
                });
                setErrors({ ...errors, isPurpose: value ? false : true });
              }}
              helperText={errors.isPurpose && ROOM_REQUEST.PURPOSE_OF_VISIT}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              error={errors.isTime}
              required
              fullWidth
              name="Arrival Time"
              label="Arrival Time"
              id="Arrival Time"
              autoComplete="Arrival Time"
              type="time"
              InputLabelProps={{ shrink: true, required: true }}
              value={roomRequestFormDetails.arrivalTime}
              onChange={(e) => {
                const value = e.target.value;
                setRoomRequestFormDetails({
                  ...roomRequestFormDetails,
                  arrivalTime: value,
                });
                setErrors({ ...errors, isTime: value ? false : true });
              }}
              helperText={errors.isTime && ROOM_REQUEST.TIME}
            />
          </Grid>
        </Grid>
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: COLORS.blue_azure }}
          onClick={(event) => handleRoomReqSubmit(event)}
        >
          {ROOM_REQUEST.SEND}
        </Button>
      </Box>
    </Container>
  );
};

export default RoomRequest;
