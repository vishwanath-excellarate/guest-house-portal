import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  REQUEST_SCREEN_CONSTANT,
  REQUEST_TYPE,
  RQUEST_CONSTANT,
} from "../../constants/commonString";
import CustomModal from "../../ghcomponents/CustomModal";
import CustomSelect from "../../ghcomponents/CustomSelect";
import CustomTable from "../../ghcomponents/CustomTable";
import NoDataFound from "../../ghcomponents/NoDataFound";

const rows = [
  {
    slNo: 1,
    name: "abc",
    email: "abc@gmail.com",
    contact_no: "1234567890",
    location: "hubli",
    project: "xyz",
    bu: "BU-6",
    approved: "Amit",
    check_in: "12-12-2022",
    check_out: "12-12-2022",
    purpose_of_visit: "workation",
  },
  {
    slNo: 2,
    name: "abc2",
    email: "abc2@gmail.com",
    contact_no: "1234567890",
    location: "hubli",
    project: "xyz2",
    bu: "BU-6",
    approved: "Amit2",
    check_in: "12-12-2022",
    check_out: "12-12-2022",
    purpose_of_visit: "workation",
  },
  {
    slNo: 3,
    name: "abc3",
    email: "abc3@gmail.com",
    contact_no: "1234567890",
    location: "hubli",
    project: "xyz3",
    bu: "BU-6",
    approved: "Amit3",
    check_in: "12-12-2022",
    check_out: "12-12-2022",
    purpose_of_visit: "workation",
  },
  {
    slNo: 4,
    name: "abc",
    email: "abc@gmail.com",
    contact_no: "1234567890",
    location: "hubli",
    project: "xyz",
    bu: "BU-6",
    approved: "Amit",
    check_in: "12-12-2022",
    check_out: "12-12-2022",
    purpose_of_visit: "workation",
  },
  {
    slNo: 5,
    name: "abc2",
    email: "abc2@gmail.com",
    contact_no: "1234567890",
    location: "hubli",
    project: "xyz2",
    bu: "BU-6",
    approved: "Amit2",
    check_in: "12-12-2022",
    check_out: "12-12-2022",
    purpose_of_visit: "workation",
  },
  {
    slNo: 6,
    name: "abc3",
    email: "vishwanath.s@excellarate.com",
    contact_no: "1234567890",
    location: "hubli",
    project: "xyz3",
    bu: "BU-6",
    approved: "Amit3",
    check_in: "12-12-2022",
    check_out: "12-12-2022",
    purpose_of_visit: "workation",
  },
];

const Requests = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [requestType, setRequestType] = useState("");

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
        rows={rows}
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
