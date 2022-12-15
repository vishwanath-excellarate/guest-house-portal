import { Container } from "@mui/material";
import React from "react";
import NoDataFound from "../ghcomponents/NoDataFound";

const ApprovedRequests = () => {
  return (
    <Container component={"div"} maxWidth={false} disableGutters>
      <NoDataFound />
    </Container>
  );
};

export default ApprovedRequests;
