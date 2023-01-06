import {
  Box,
  Button,
  Container,
  Fab,
  FormHelperText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COMMON_STRING,
  DOWNLOAD,
  REQUEST_SCREEN_CONSTANT,
  REQUEST_TYPE,
  RQUEST_CONSTANT,
} from "../../constants/commonString";
import CustomModal from "../../ghcomponents/CustomModal";
import CustomSelect from "../../ghcomponents/CustomSelect";
import CustomTable from "../../ghcomponents/CustomTable";
import NoDataFound from "../../ghcomponents/NoDataFound";
import appConfig from "../../services/appConfig";
import {
  allocateRoom,
  deleteRoomRequest,
  getAllRomRequests,
  getAvailableRoom,
} from "./requests.action";
import { CircularLoader, DisabledBackground } from "../../ghcomponents/Loader";
import { fontStyle } from "../../themes/Styles";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import DownloadIcon from "@mui/icons-material/Download";
import { exportToExcel } from "../../constants/exportToExcel";
import { COLORS } from "../../themes/Colors";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CustomInput from "../../ghcomponents/CustomInput";

const Requests = () => {
  const dispatch = useDispatch();
  const roomRequests = useSelector((state) => state.roomRequestsReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [requestType, setRequestType] = useState("All");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomsData, setRoomsData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [error, setError] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    let result = [];
    if (requestType === "All") {
      result = roomRequests?.allRoomRequests.filter(
        (item) => item.status === "approved" || item.status === "pending"
      );
    } else {
      result = roomRequests?.allRoomRequests?.filter(
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
  }, [roomRequests.allRoomRequests, requestType]);

  useEffect(() => {
    const result = roomRequests?.availableRooms?.map(
      (item) => `${item.location} - ${item.room_id} - ${item.uid}`
    );
    setRoomsData(result);
  }, [roomRequests.availableRooms]);

  useEffect(() => {
    async function fetchData() {
      // setLoading(true);
      await getAllRomRequests(appConfig.API_BASE_URL, dispatch);
      await getAvailableRoom(appConfig.API_BASE_URL, dispatch);
      // setLoading(false);
    }
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = async () => {
    if (!selectedRoom.length) {
      setError(true);
    } else {
      setError(false);
      setLoading(true);
      const data = {
        request_id: selectedRow.ruid,
        room_id: selectedRoom.split("-").slice(3).toString().trim(),
        constant_room_id: selectedRoom.split("-").slice(1, 3).join("-").trim(),
        email: selectedRow?.email,
      };
      const { response, error } = await allocateRoom(
        appConfig.API_BASE_URL,
        data,
        dispatch
      );
      if (response) {
        toast.success(response?.data?.message);
        await getAllRomRequests(appConfig.API_BASE_URL, dispatch);
      }
      if (error) {
        toast.error(error?.data.message);
      }
      setLoading(false);
      setIsModalOpen(!isModalOpen);
      setSelectedRoom("");
      setSelectedRow("");
    }
  };

  if (!data.length) {
    return <NoDataFound />;
  }

  const ApproveModal = () => {
    return (
      <CustomModal
        open={isModalOpen}
        // onClose={() => setIsModalOpen(!isModalOpen)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingBottom: 1,
          }}
        >
          <Typography component="h1" variant="h6" textAlign={"left"}>
            Allocate Room
          </Typography>

          <CloseIcon
            onClick={() => {
              setIsModalOpen(!isModalOpen);
              setSelectedRoom("");
            }}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomSelect
            error={error}
            formStyle={{ width: "100%" }}
            menuItems={roomsData}
            label={"Select Room"}
            inputLabelText={"Select Room"}
            value={selectedRoom}
            handleChange={(e) => {
              const value = e.target.value;
              setSelectedRoom(value);
              setError(value ? false : true);
            }}
          />
          {error && (
            <FormHelperText error>
              {"Room Allocation is Required"}
            </FormHelperText>
          )}
        </Box>
        <Button
          variant="contained"
          sx={{
            ...fontStyle(),
            width: "100%",
            marginTop: 3,
          }}
          onClick={() => handleSubmit()}
        >
          {COMMON_STRING.APPROVE}
        </Button>
      </CustomModal>
    );
  };

  return (
    <Container disableGutters maxWidth={false}>
      {loading && (
        <DisabledBackground>
          <CircularLoader />
        </DisabledBackground>
      )}
      <Box sx={{ px: 4 }}>
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            my: 4,
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
        </Container>
        <CustomTable
          columns={RQUEST_CONSTANT}
          rows={data}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          renderActionButton={(value) =>
            value?.status.toLowerCase() === "pending" && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  sx={{
                    marginRight: 2,
                    ...fontStyle(),
                    width: 120,
                    height: 40,
                  }}
                  variant="contained"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                    setSelectedRow(value);
                  }}
                >
                  {COMMON_STRING.APPROVE}
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
      </Box>
      <ApproveModal />

      <CustomModal
        open={isDeleteClicked}
        onClose={() => {
          setIsDeleteClicked(!isDeleteClicked);
          setReason("");
        }}
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
            onClick={async () => {
              setLoading(true);
              const data = {
                request_id: selectedRow.ruid,
                decline_reason: reason,
              };

              const { response, error } = await deleteRoomRequest(
                appConfig.API_BASE_URL,
                data,
                dispatch
              );
              if (response) {
                toast.success(response?.data?.message);
                await getAllRomRequests(appConfig.API_BASE_URL, dispatch);
              }
              if (error) {
                toast.error(error?.data.message);
              }
              setIsDeleteClicked(!isDeleteClicked);
              setLoading(false);
              setSelectedRow("");
            }}
            variant="contained"
            sx={{
              width: "100%",
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
          onClick={() => exportToExcel(data, "All-Requests")}
        >
          {DOWNLOAD}
          <DownloadIcon sx={{ ml: 1 }} />
        </Fab>
      )}
    </Container>
  );
};

export default Requests;
