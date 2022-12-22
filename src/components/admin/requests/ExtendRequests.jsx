import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EXTEND_RQUEST_CONSTANT,
  REQUEST_SCREEN_CONSTANT,
} from "../../constants/commonString";
import CustomModal from "../../ghcomponents/CustomModal";
import CustomTable from "../../ghcomponents/CustomTable";
import NoDataFound from "../../ghcomponents/NoDataFound";
import appConfig from "../../services/appConfig";
import {
  declineExtendRoomRequest,
  extendRoomRequest,
  getExtendRomRequests,
} from "./requests.action";
import { CircularLoader, DisabledBackground } from "../../ghcomponents/Loader";
import { fontStyle } from "../../themes/Styles";
import { toast } from "react-toastify";

const ExtendRequests = () => {
  const dispatch = useDispatch();
  const roomRequests = useSelector((state) => state.roomRequestsReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  useEffect(() => {
    let result = roomRequests?.extendRoomReqRes?.filter(
      (item) => item?.status === "pending"
    );
    result = result.map((item, index) => ({
      slNo: index + 1,
      contact_no: item.pnumber,
      project: item.client,
      approved: item.approved_by,
      purpose_of_visit: item.purpose,
      ...item,
    }));
    setData(result);
  }, [roomRequests.extendRoomReqRes]);

  useEffect(() => {
    // setLoading(true);
    getExtendRomRequests(appConfig.API_BASE_URL, dispatch);
    // setLoading(false);
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!data.length) {
    return <NoDataFound />;
  }

  const DeletePopUp = () => {
    return (
      <CustomModal
        open={isDeleteClicked}
        onClose={() => setIsDeleteClicked(!isDeleteClicked)}
      >
        <Box
          sx={{
            paddingBottom: 1,
          }}
        >
          <Typography component="h1" variant="h6" textAlign={"center"}>
            {REQUEST_SCREEN_CONSTANT.ARE_YOU_SURE}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            onClick={() => onDeleteClicked()}
            variant="contained"
            sx={{
              width: "100%",
              marginTop: 2,
              bgcolor: "#EE4B2B",
              "&:hover": { backgroundColor: "#EE4B2B" },
            }}
          >
            Delete
          </Button>
        </Box>
      </CustomModal>
    );
  };

  const onDeleteClicked = async () => {
    setLoading(true);
    const data = {
      uid: selectedRow?.uid,
    };

    const { response, error } = await declineExtendRoomRequest(
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
    setSelectedRow("");
    setIsDeleteClicked(!isDeleteClicked);
  };

  const onExtendRequestSubmit = async (value) => {
    setLoading(true);
    const data = {
      uid: value?.uid,
      checkout: value?.new_checkout,
      ruid: value?.ruid,
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
  };

  return (
    <Grid container sx={{ px: 4, my: 8 }}>
      {loading && (
        <DisabledBackground>
          <CircularLoader />
        </DisabledBackground>
      )}
      <CustomTable
        columns={EXTEND_RQUEST_CONSTANT}
        rows={data}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        renderActionButton={(value) =>
          value?.status.toLowerCase() === "pending" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                sx={{ marginRight: 2, ...fontStyle() }}
                variant="contained"
                onClick={() => onExtendRequestSubmit(value)}
              >
                Extend Request
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#C41E3A",
                  "&:hover": { backgroundColor: "#C41E3A" },
                }}
                onClick={() => {
                  setIsDeleteClicked(!isDeleteClicked);
                  setSelectedRow(value);
                }}
              >
                Decline
              </Button>
            </Box>
          )
        }
      />
      <DeletePopUp />
    </Grid>
  );
};

export default ExtendRequests;
