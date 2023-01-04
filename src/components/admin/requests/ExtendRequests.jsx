import { Box, Button, Fab, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COMMON_STRING,
  DOWNLOAD,
  EXTEND_RQUEST_CONSTANT,
  REQUEST_SCREEN_CONSTANT,
  REQUEST_TYPE,
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
import CustomSelect from "../../ghcomponents/CustomSelect";
import { COLORS } from "../../themes/Colors";
import { exportToExcel } from "../../constants/exportToExcel";
import DownloadIcon from "@mui/icons-material/Download";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CustomInput from "../../ghcomponents/CustomInput";

const ExtendRequests = () => {
  const dispatch = useDispatch();
  const roomRequests = useSelector((state) => state.roomRequestsReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [requestType, setRequestType] = useState("All");
  const [reason, setReason] = useState("");

  useEffect(() => {
    let result = [];
    if (requestType === "All") {
      result = roomRequests?.extendRoomReqRes.filter(
        (item) => item.status === "approved" || item.status === "pending"
      );
    } else {
      result = roomRequests?.extendRoomReqRes?.filter(
        (item) => requestType.toLowerCase() === item.status
      );
    }
    result = result.map((item, index) => ({
      slNo: index + 1,
      contact_no: item.pnumber,
      project: item.client,
      approved: item.approved_by,
      purpose_of_visit: item.purpose,
      ...item,
    }));
    setData(result);
  }, [roomRequests.extendRoomReqRes, requestType]);

  useEffect(() => {
    // setLoading(true);
    getExtendRomRequests(appConfig.API_BASE_URL, dispatch);
    // setLoading(false);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!data.length) {
    return <NoDataFound title={"No Extend Requests Found ...!"} />;
  }

  const onDeleteClicked = async () => {
    setLoading(true);
    const data = {
      uid: selectedRow?.uid,
      decline_reason: reason,
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
    <Grid container sx={{ px: 4 }}>
      {loading && (
        <DisabledBackground>
          <CircularLoader />
        </DisabledBackground>
      )}
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <CustomSelect
          formStyle={{ minWidth: { xs: "60%", md: "20%" } }}
          menuItems={REQUEST_TYPE}
          label={"Request Type"}
          inputLabelText={"Request Type"}
          value={requestType}
          handleChange={(e) => setRequestType(e.target.value)}
        />
      </Grid>
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
                {COMMON_STRING.EXTEND_REQUEST}
              </Button>
              <Button
                variant="contained"
                sx={{
                  ...fontStyle(),
                  width: 120,
                  height: 40,
                  letterSpacing: 0.4,
                  bgcolor: COLORS.bright_red,
                  "&:hover": { backgroundColor: COLORS.bright_red },
                }}
                onClick={() => {
                  setIsDeleteClicked(!isDeleteClicked);
                  setSelectedRow(value);
                }}
              >
                {COMMON_STRING.DECLINE}
              </Button>
            </Box>
          )
        }
      />

      <CustomModal
        open={isDeleteClicked}
        onClose={() => setIsDeleteClicked(!isDeleteClicked)}
      >
        <Box display={"flex"} alignItems="center" flexDirection={"column"}>
          <ErrorOutlineIcon sx={{ fontSize: 70, color: COLORS.bright_red }} />
          <Typography
            component="h6"
            sx={{ fontSize: 24, letterSpacing: 0.4, fontWeight: "bold", px: 1 }}
          >
            {REQUEST_SCREEN_CONSTANT.ARE_YOU_SURE}
          </Typography>
          <Typography
            component="h6"
            sx={{ fontSize: 16, letterSpacing: 0.3, paddingTop: 0.5 }}
          >
            {REQUEST_SCREEN_CONSTANT.SUB_TEXT}
          </Typography>

          <CustomInput
            autoFocus={false}
            sx={{ my: 2 }}
            required
            fullWidth
            id="Reason"
            label="Reason for decline"
            name="Reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />

          <Button
            onClick={() => onDeleteClicked()}
            variant="contained"
            sx={{
              width: "100%",
              marginTop: 2,
              bgcolor: COLORS.bright_red,
              "&:hover": { backgroundColor: COLORS.bright_red },
            }}
            disabled={!reason.length}
          >
            {COMMON_STRING.DELETE}
          </Button>
        </Box>
      </CustomModal>

      {data.length && (
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: { xs: 20, md: 80 },
            right: { xs: 20, md: 70 },
            backgroundColor: COLORS.blue_azure,
          }}
          onClick={() => exportToExcel(data, "Extended-Requests")}
        >
          {DOWNLOAD}
          <DownloadIcon sx={{ ml: 1 }} />
        </Fab>
      )}
    </Grid>
  );
};

export default ExtendRequests;
