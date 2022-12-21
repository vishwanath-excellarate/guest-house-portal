import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
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


const rows = [
  { slNo: 1, location: "Pune", room_no: "p-101" },
  { slNo: 2, location: "Hubli", room_no: "h-101" },
  { slNo: 3, location: "Pune", room_no: "p-102" },
  { slNo: 4, location: "Hydarabad", room_no: "hb-101" },
  { slNo: 5, location: "Hydarabad", room_no: "hb-102" },

];

const Rooms = () => {
  const dispatch = useDispatch();
  const roomDetails = useSelector((state) => state.roomReducer);

  // const roomDetails = useSelector((state) => state.roomReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [deleteId, setDeleteId] = useState("")
  // const [rows, setRows] = useState([])

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await getRooms(appConfig.API_BASE_URL, dispatch);
  //     const data = result.response.data.result;
  //     const updatedRow = data.map(({ uid: slNo, room_id:room_no, ...rest }) => ({
  //       slNo,
  //       room_no, 
  //       ...rest,
  //     }));

  //     setRows(updatedRow);

  //   }

  //   fetchData();

  // }, []);

  useEffect(() => {
    getRooms(appConfig.API_BASE_URL, dispatch);
  }, []);

  // console.log('Roww//', rows)
  if (!roomDetails.getRoomRes.length) {
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
        <AddRoom isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </CustomModal>
    );
  };

  const DeletePopUp = () => {
    const deleteHandler = () => {
      console.log("Prppppppppppppp", deleteId);

    }
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
            {ROOM_SCREEN_CONSTANT.ARE_YOU_SURE}
          </Typography>
          <Button
            onClick={() => {
              setIsDeleteClicked(!isDeleteClicked);
              const data = { uid: deleteId.uid}
              // console.log(data)
              deleteRoomRequest(
                appConfig.API_BASE_URL,
               data,
                dispatch
              );
            
            
            }}
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
        rows={roomDetails?.getRoomRes || []}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        renderActionButton={(value) => (
          <Box>
             <Button
              variant="contained"
              sx={{ bgcolor: "#C41E3A" }}
              onClick={() => {          console.log(value); 
                setDeleteId(value); setIsDeleteClicked(!isDeleteClicked) }}
            >
              Delete
            </Button>
          </Box>
        )}
      />
      <ModalComponent />
      <DeletePopUp />
    </Grid>
  );
};

export default Rooms;
