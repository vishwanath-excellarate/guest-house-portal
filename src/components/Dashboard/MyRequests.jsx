import { Container } from "@mui/system";
import React from "react";
import NoDataFound from "../ghcomponents/NoDataFound";

const MyRequests = ({ setSelectedRequest, setIsModalOpen }) => {
  return (
    <Container component={"div"} maxWidth={false} disableGutters>
      <NoDataFound
        isSubTitle
        onClick={() => {
          setSelectedRequest(1);
          setIsModalOpen(true);
        }}
      />
    </Container>
  );
};

export default MyRequests;
