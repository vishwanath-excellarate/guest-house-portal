import { Box, Button, Fab, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  DOWNLOAD,
  ROOMS_CONSTANT,
  ROOM_SCREEN_CONSTANT,
} from "../../constants/commonString";
import CustomModal from "../../ghcomponents/CustomModal";
import CustomTable from "../../ghcomponents/CustomTable";
import NoDataFound from "../../ghcomponents/NoDataFound";
import { fontStyle } from "../../themes/Styles";
import AddRoom from "./AddRoom";
import { getRooms, deleteRoomRequest } from "./Room.action";
import appConfig from "../../services/appConfig";
import { useDispatch, useSelector } from "react-redux";
import { CircularLoader, DisabledBackground } from "../../ghcomponents/Loader";
import { toast } from "react-toastify";
import DownloadIcon from "@mui/icons-material/Download";
import { exportToExcel } from "../../constants/exportToExcel";
import { COLORS } from "../../themes/Colors";

const Rooms = () => {
  const dispatch = useDispatch();
  const roomDetails = useSelector((state) => state.roomReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [data, setData] = useState([]);
  const [selectRow, setSelectRow] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const result = roomDetails?.getRoomRes.map((item, index) => ({
      slNo: index + 1,
      ...item,
    }));
    setData(result);
  }, [roomDetails?.getRoomRes]);

  useEffect(() => {
    getRooms(appConfig.API_BASE_URL, dispatch);
  }, []);

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
        <AddRoom
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setLoading={setLoading}
        />
      </CustomModal>
    );
  };

  const DeletePopUp = () => {
    return (
      <CustomModal
        open={isDeleteClicked}
        onClose={() => setIsDeleteClicked(!isDeleteClicked)}
      >
        <Typography component="h1" variant="h6" textAlign={"center"}>
          {ROOM_SCREEN_CONSTANT.ARE_YOU_SURE}
        </Typography>
        <Button
          onClick={async () => {
            setLoading(true);
            const data = { uid: selectRow?.uid };
            const { response, error } = await deleteRoomRequest(
              appConfig.API_BASE_URL,
              data,
              dispatch
            );
            if (response) {
              toast.success(response?.data?.message);
            }
            if (error) {
              toast.error(error?.data?.message);
            }
            setLoading(false);
            setIsDeleteClicked(!isDeleteClicked);
          }}
          variant="contained"
          sx={{
            width: "100%",
            marginTop: 3,
            bgcolor: "#EE4B2B",
            "&:hover": { backgroundColor: "#EE4B2B" },
          }}
        >
          Delete
        </Button>
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
      {!data.length ? (
        <NoDataFound
          title={"No Rooms Found ...!"}
          isSubTitle
          subTitle={"Create New Room"}
          onClick={() => setIsModalOpen(true)}
        />
      ) : (
        <>
          <Grid
            item
            xl={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ width: 150, height: 40, ...fontStyle() }}
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              {ROOM_SCREEN_CONSTANT.ADD_ROOM}
            </Button>
          </Grid>
          <CustomTable
            columns={ROOMS_CONSTANT}
            rows={data}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            renderActionButton={(value) => (
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#C41E3A",
                    "&:hover": { backgroundColor: "#C41E3A" },
                  }}
                  onClick={() => {
                    setSelectRow(value);
                    setIsDeleteClicked(!isDeleteClicked);
                  }}
                >
                  Delete
                </Button>
              </Box>
            )}
          />
        </>
      )}
      <ModalComponent />
      <DeletePopUp />

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
          onClick={() => exportToExcel(data, "Rooms")}
        >
          {DOWNLOAD}
          <DownloadIcon sx={{ ml: 1 }} />
        </Fab>
      )}
    </Grid>
  );
};

export default Rooms;
