import { Box, Button, Grid, Typography } from "@mui/material";
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
import { getAllRomRequests } from "./requests.action";
import { CircularLoader, DisabledBackground } from "../../ghcomponents/Loader";

const Requests = () => {
  const dispatch = useDispatch();
  const roomRequests = useSelector((state) => state.roomRequestsReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const result = roomRequests?.allRoomRequests?.map((item, index) => ({
      slNo: index + 1,
      contact_no: item.pnumber,
      project: item.client,
      approved: item.approved_by,
      purpose_of_visit: item.purpose,
      ...item,
    }));
    setData(result);
  }, [roomRequests.allRoomRequests]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { response, error } = await getAllRomRequests(
        appConfig.API_BASE_URL,
        dispatch
      );
      setLoading(false);
    }
    fetchData();
  }, []);

  if (!data.length) {
    return <NoDataFound />;
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ModalComponent = () => {
    return (
      <CustomModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
        {/* <AddRoom isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
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
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography component="h6" variant="body1" textAlign={"center"}>
            {REQUEST_SCREEN_CONSTANT.ARE_YOU_SURE}
          </Typography>
          <Button
            onClick={() => setIsDeleteClicked(!isDeleteClicked)}
            variant="contained"
            sx={{
              marginTop: 2,
              bgcolor: "#EE4B2B",
            }}
          >
            Delete
          </Button>
        </Box>
      </CustomModal>
    );
  };

  return (
    <Grid container>
      {/* {loading && (
        <>
          <CircularLoader />
          <DisabledBackground />
        </>
      )} */}
      <Grid
        item
        xs={12}
        // sm={6}
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
        renderActionButton={() => (
          <Box>
            <Button sx={{ marginRight: 2 }} variant="contained">
              Approve
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#C41E3A" }}
              onClick={() => setIsDeleteClicked(!isDeleteClicked)}
            >
              Decline
            </Button>
          </Box>
        )}
      />
      <ModalComponent />
      <DeletePopUp />
    </Grid>
  );
};

export default Requests;
