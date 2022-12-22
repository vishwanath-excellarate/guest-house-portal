import { Box, Button, FormHelperText, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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

const Requests = () => {
  const dispatch = useDispatch();
  const roomRequests = useSelector((state) => state.roomRequestsReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [requestType, setRequestType] = useState("Pending");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomsData, setRoomsData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [error, setError] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  useEffect(() => {
    let result = roomRequests?.allRoomRequests?.filter(
      (item) => requestType.toLowerCase() === item.status
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
        room_id: selectedRoom.split("-").slice(3).toString(),
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
          Approve
        </Button>
      </CustomModal>
    );
  };

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
            onClick={async () => {
              setLoading(true);
              const data = {
                request_id: selectedRow.ruid,
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
        columns={RQUEST_CONSTANT}
        rows={data}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        renderActionButton={(value) =>
          requestType.toLowerCase() === "pending" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                sx={{ marginRight: 2, ...fontStyle() }}
                variant="contained"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                  setSelectedRow(value);
                }}
              >
                Approve
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
      <ApproveModal />
      <DeletePopUp />
    </Grid>
  );
};

export default Requests;
