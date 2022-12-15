import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { EXTEND_OR_CANCEL_REQUEST } from "../constants/commonString";
import CustomInput from "../ghcomponents/CustomInput";
import CustomSelect from "../ghcomponents/CustomSelect";
import { COLORS } from "../themes/Colors";

const CancelOrExtendRequest = () => {
  const [formDetails, setFormDetails] = useState({
    roomNo: "",
    requestType: "",
    extendDate: "",
    reason: "",
  });

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">
        {EXTEND_OR_CANCEL_REQUEST.EXTEND_REQUEST}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={() => console.log("hi")}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              required
              fullWidth
              id="Date Of Extend"
              label="Date Of Extend"
              name="Date Of Extend"
              autoComplete="Date Of Extend"
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              value={formDetails.extendDate}
              onChange={(e) =>
                setFormDetails({
                  ...formDetails,
                  extendDate: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              required
              fullWidth
              multiline
              rows={5}
              name="Reason For Cancelation / Extend"
              label="Reason For Cancelation / Extend"
              id="Reason For Cancelation / Extend"
              autoComplete="Reason For Cancelation / Extend"
              value={formDetails.reason}
              onChange={(e) =>
                setFormDetails({
                  ...formDetails,
                  reason: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: COLORS.blue_azure, }}
        >
          {EXTEND_OR_CANCEL_REQUEST.SEND}
        </Button>
      </Box>
    </Container>
  );
};

export default CancelOrExtendRequest;
