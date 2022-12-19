import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  USERS_COLUMN,
  USER_SCREEN_CONSTANT,
} from "../../constants/commonString";
import CustomModal from "../../ghcomponents/CustomModal";
import CustomTable from "../../ghcomponents/CustomTable";
import { Toaster } from "../../ghcomponents/Loader";
import NoDataFound from "../../ghcomponents/NoDataFound";
import { COLORS } from "../../themes/Colors";
import { fontStyle } from "../../themes/Styles";
import AddUser from "./AddUser";

const rows = [
  { slNo: 1, email: "vishwa@gmail.com" },
  { slNo: 2, email: "test@gmail.com" },
  { slNo: 3, email: "abc@gmail.com" },
  { slNo: 4, email: "asasa@gmail.com" },
  { slNo: 5, email: "qwqw@gmail.com" },
];

const Users = () => {
  const userDetails = useSelector((state) => state.userReducer);
  console.log("userDetails", userDetails);
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
        // onClose={() => setIsModalOpen(!isModalOpen)}
      >
        <AddUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
          <Typography component="h6" variant="body1">
            {USER_SCREEN_CONSTANT.ARE_YOU_SURE}
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
          sx={{
            width: 150,
            height: 40,
            ...fontStyle(),
          }}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {USER_SCREEN_CONSTANT.ADD_USER}
        </Button>
      </Grid>
      <CustomTable
        columns={USERS_COLUMN}
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        renderActionButton={() => (
          <Button
            sx={{ bgcolor: "#C41E3A" }}
            variant="contained"
            onClick={() => setIsDeleteClicked(!isDeleteClicked)}
          >
            Delete
          </Button>
        )}
      />
      <ModalComponent />
      <DeletePopUp />
      {/* <Toaster messgae={'Email sent to an user'} /> */}
    </Grid>
  );
};

export default Users;
