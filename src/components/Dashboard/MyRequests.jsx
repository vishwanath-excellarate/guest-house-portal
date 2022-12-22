import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import NoDataFound from "../ghcomponents/NoDataFound";
import { checkOutRoom, userMyRequest } from "./dashboard.action";
import appConfig from "../services/appConfig";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../ghcomponents/CustomTable";
import { MY_RQUEST_CONSTANT } from "../constants/commonString";
import { Box, Button } from "@mui/material";
import { fontStyle } from "../themes/Styles";
import { toast } from "react-toastify";

const MyRequests = ({
  setSelectedRequest,
  setIsModalOpen,
  setExtendReqData,
  setLoading,
}) => {
  const dispatch = useDispatch();
  const myRoomReq = useSelector((state) => state.userRoomRequestReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);

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
    userMyRequest(appConfig.API_BASE_URL, dispatch);
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
    <Container component={"div"} maxWidth={false} sx={{ my: 6 }}>
      <CustomTable
        columns={MY_RQUEST_CONSTANT}
        rows={data}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        renderActionButton={(value) =>
          value.status === "approved" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                sx={{ marginRight: 2, ...fontStyle() }}
                variant="contained"
                onClick={() => {
                  setSelectedRequest(2);
                  setIsModalOpen(true);
                  setExtendReqData(value);
                }}
              >
                Extend Room Request
              </Button>
              <Button
                variant="contained"
                sx={{
                  ...fontStyle(),
                  bgcolor: "#C41E3A",
                  "&:hover": { backgroundColor: "#C41E3A" },
                }}
                onClick={async () => {
                  setLoading(true);
                  const data = {
                    room_id: value?.uid,
                  };
                  const { response, error } = await checkOutRoom(
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
                }}
              >
                Check Out
              </Button>
            </Box>
          )
        }
      />
    </Container>
  );
};

export default MyRequests;
