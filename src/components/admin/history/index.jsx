import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HISTORY_CONSTANT } from "../../constants/commonString";
import CustomTable from "../../ghcomponents/CustomTable";
import NoDataFound from "../../ghcomponents/NoDataFound";
import appConfig from "../../services/appConfig";
import { getHistoryRequests } from "./history.action";

const RoomDetails = () => {
  const dispatch = useDispatch();
  const historyResult = useSelector((state) => state.historyReqReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);

  // console.log('historyResult.historyReqResult', historyResult.historyReqResult);
  useEffect(() => {
    getHistoryRequests(appConfig.API_BASE_URL, dispatch);
  }, []);

  useEffect(() => {
    const result = historyResult.historyReqResult.map((item, index) => ({
      slNo: index + 1,
      contact_no: item.pnumber,
      project: item.client,
      approved: item.approved_by,
      purpose_of_visit: item.purpose,
      ...item,
    }));
    setData(result);
  }, [historyResult.historyReqResult]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!data.length) {
    return <NoDataFound title={"No History Found ...!"} />;
  }

  return (
    <Grid container sx={{ px: 4, my: 8 }}>
      <CustomTable
        columns={HISTORY_CONSTANT}
        rows={data}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Grid>
  );
};

export default RoomDetails;
