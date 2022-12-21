import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import NoDataFound from "../ghcomponents/NoDataFound";
import { userMyRequest } from "./dashboard.action";
import appConfig from "../services/appConfig";
import { useDispatch, useSelector } from "react-redux";


const MyRequests = ({ setSelectedRequest, setIsModalOpen }) => {

  const dispatch = useDispatch();
  
  useEffect( () => {
    const { response, error } =  userMyRequest(
      appConfig.API_BASE_URL,
      dispatch
    );
    console.log('Row//', response); 
  }, []);
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
