import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  ROOMS_CONSTANT,
  ROOM_SCREEN_CONSTANT,
} from "../../constants/commonString";
import CustomModal from "../../ghcomponents/CustomModal";
import CustomTable from "../../ghcomponents/CustomTable";
import NoDataFound from "../../ghcomponents/NoDataFound";
import { fontStyle } from "../../themes/Styles";
import AddRoom from "./AddRoom";

const rows = [
  { slNo: 1, location: "Pune", room_no: "p-101" },
  { slNo: 2, location: "Hubli", room_no: "h-101" },
  { slNo: 3, location: "Pune", room_no: "p-102" },
  { slNo: 4, location: "Hydarabad", room_no: "hb-101" },
  { slNo: 5, location: "Hydarabad", room_no: "hb-102" },
];

const Rooms = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  if (!rows.length) {
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
    <Grid container sx={{ px: 4 }}>
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
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        renderActionButton={() => (
          <Box>
            <Button
              sx={{ marginRight: 2 }}
              variant="contained"
              // onClick={() => setIsDeleteClicked(!isDeleteClicked)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#C41E3A" }}
              onClick={() => setIsDeleteClicked(!isDeleteClicked)}
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
