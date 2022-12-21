import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import NoDataFound from "../ghcomponents/NoDataFound";
import { userMyRequest } from "./dashboard.action";
import appConfig from "../services/appConfig";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../ghcomponents/CustomTable";
import { MY_RQUEST_CONSTANT } from "../constants/commonString";
import { Box, Button } from "@mui/material";

const MyRequests = ({ setSelectedRequest, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const myRoomReq = useSelector((state) => state.userRoomRequestReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const result = myRoomReq?.myReqResult?.map((item, index) => ({
      slNo: index + 1,
      project: item.client,
      approved: item.approved_by,
      purpose_of_visit: item.purpose,
      ...item,
    }));
    setData(result);
  }, [myRoomReq.myReqResult]);

  useEffect(() => {
    async function fetchMyRequests() {
      const { response, error } = await userMyRequest(
        appConfig.API_BASE_URL,
        dispatch
      );
    }
    fetchMyRequests();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!data.length) {
    return (
      <NoDataFound
        isSubTitle
        onClick={() => {
          setSelectedRequest(1);
          setIsModalOpen(true);
        }}
      />
    );
  }

  return (
    <Container component={"div"} maxWidth={false} sx={{my:6}}>
      <CustomTable
        columns={MY_RQUEST_CONSTANT}
        rows={data}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default MyRequests;
