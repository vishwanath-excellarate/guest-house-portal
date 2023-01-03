import { Box, Button, Fab, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  COMMON_STRING,
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
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
        <Box display={"flex"} alignItems="center" flexDirection={"column"}>
          <ErrorOutlineIcon sx={{ fontSize: 70, color: COLORS.bright_red }} />
          <Typography
            component="h6"
            sx={{ fontSize: 24, letterSpacing: 0.4, fontWeight: "bold", px: 1 }}
          >
            {ROOM_SCREEN_CONSTANT.ARE_YOU_SURE}
          </Typography>
          <Typography
            component="h6"
            sx={{ fontSize: 16, letterSpacing: 0.3, paddingTop: 0.5 }}
          >
            {ROOM_SCREEN_CONSTANT.SUB_TEXT}
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
              marginTop: 2,
              bgcolor: COLORS.bright_red,
              "&:hover": { backgroundColor: COLORS.bright_red },
            }}
          >
            {COMMON_STRING.DELETE}
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
                    width: 120,
                    height: 40,
                    bgcolor: COLORS.bright_red,
                    "&:hover": { backgroundColor: COLORS.bright_red },
                  }}
                  onClick={() => {
                    setSelectRow(value);
                    setIsDeleteClicked(!isDeleteClicked);
                  }}
                >
                  {COMMON_STRING.DELETE}
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
