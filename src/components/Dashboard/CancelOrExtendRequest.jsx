import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { EXTEND_OR_CANCEL_REQUEST } from "../constants/commonString";
import CustomInput from "../ghcomponents/CustomInput";
import CustomSelect from "../ghcomponents/CustomSelect";
import appConfig from "../services/appConfig";
import { COLORS } from "../themes/Colors";
import { extendRoomRequest } from "./dashboard.action";
import CloseIcon from "@mui/icons-material/Close";

const CancelOrExtendRequest = ({
  setLoading,
  setIsModalOpen,
  extendReqData,
}) => {
  const dispatch = useDispatch();
  const [formDetails, setFormDetails] = useState({
    // roomNo: "",
    // requestType: "",
    extendDate: "",
    reason: "",
  });
  const [error, setError] = useState({ isExtendDate: false, isReason: false });

  const handleSubmit = async () => {
    if (!formDetails.extendDate && !formDetails.reason) {
      setError({ isExtendDate: true, isReason: true });
    } else if (!formDetails.extendDate) {
      setError({ ...error, isExtendDate: true });
    } else if (!formDetails.reason) {
      setError({ ...error, isReason: true });
    } else {
      setIsModalOpen(false);
      setLoading(true);
      const data = {
        ruid: extendReqData?.ruid,
        new_checkout: moment(formDetails.extendDate).format("DD/MM/YYYY"),
        reason: formDetails.reason,
      };
      const { response, error } = await extendRoomRequest(
        appConfig.API_BASE_URL,
        data,
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
        <Typography variant="h5">
          {EXTEND_OR_CANCEL_REQUEST.EXTEND_REQUEST}
        </Typography>

        <CloseIcon
          onClick={() => {
            setIsModalOpen(false);
          }}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <CustomInput
              required
              fullWidth
              autoFocus
              id="Alloted Room"
              label="Alloted Room"
              autoComplete="given-name"
              name="Alloted Room"
              value={formDetails.roomNo}
              onChange={(e) =>
                setFormDetails({
                  ...formDetails,
                  roomNo: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomSelect
              formStyle={{ minWidth: "100%" }}
              menuItems={["BU-1", "BU-2", "BU-3", "BU-4", "BU-5", "BU-6"]}
              label={"Request Type"}
              inputLabelText={"Request Type"}
              value={formDetails.requestType}
              handleChange={(e) =>
                setFormDetails({
                  ...formDetails,
                  requestType: e.target.value,
                })
              }
            />
          </Grid> */}
          <Grid item xs={12}>
            <CustomInput
              error={error.isExtendDate}
              required
              fullWidth
              id="Date Of Extend"
              label="Date Of Extend"
              name="Date Of Extend"
              autoComplete="Date Of Extend"
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              value={formDetails.extendDate}
              onChange={(e) => {
                const value = e.target.value;
                console.log("value", value);
                setFormDetails({
                  ...formDetails,
                  extendDate: value,
                });
                setError({ ...error, isExtendDate: value ? false : true });
              }}
              helperText={error.isExtendDate && "Extend Date Is Required"}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              error={error.isReason}
              required
              fullWidth
              multiline
              rows={5}
              name="Reason For Extend"
              label="Reason For Extend"
              id="Reason For Extend"
              autoComplete="Reason For Extend"
              value={formDetails.reason}
              onChange={(e) => {
                const value = e.target.value;
                setFormDetails({
                  ...formDetails,
                  reason: value,
                });
                setError({ ...error, isReason: value ? false : true });
              }}
              helperText={error.isReason && "Reason for Extend Is Required"}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: COLORS.blue_azure }}
          onClick={() => handleSubmit()}
        >
          {EXTEND_OR_CANCEL_REQUEST.SEND}
        </Button>
      </Box>
    </Container>
  );
};

export default CancelOrExtendRequest;
