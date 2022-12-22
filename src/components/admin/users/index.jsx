import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  USERS_COLUMN,
  USER_SCREEN_CONSTANT,
} from "../../constants/commonString";
import CustomModal from "../../ghcomponents/CustomModal";
import CustomTable from "../../ghcomponents/CustomTable";
import { CircularLoader, DisabledBackground } from "../../ghcomponents/Loader";
import NoDataFound from "../../ghcomponents/NoDataFound";
import appConfig from "../../services/appConfig";
import { COLORS } from "../../themes/Colors";
import { fontStyle } from "../../themes/Styles";
import AddUser from "./AddUser";
import { deleteUserRequest, getUserRequest } from "./User.action";
import { toast } from "react-toastify";

const Users = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { response, error } = getUserRequest(
      appConfig.API_BASE_URL,
      dispatch
    );
  }, []);

  useEffect(() => {
    const result = userDetails.getUserRes.map((item, index) => ({
      slNo: index + 1,
      ...item,
    }));
    setData(result);
  }, [userDetails.getUserRes]);

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
        <AddUser
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          dispatch={dispatch}
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
          {USER_SCREEN_CONSTANT.ARE_YOU_SURE}
        </Typography>
        <Button
          onClick={async () => {
            setLoading(true);
            setIsDeleteClicked(!isDeleteClicked);
            const { response, error } = await deleteUserRequest(
              appConfig.API_BASE_URL,
              selectedEmail,
              dispatch
            );
            if (response) {
              toast.success(response?.data?.message);
            }
            if (error) {
              toast.error(error?.data.message);
            }
            setTimeout(() => {
              setLoading(false);
            }, 1000);
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
          title={"No Users Found ...!"}
          isSubTitle
          subTitle={"Create New User"}
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
            rows={data}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            renderActionButton={(value) => (
              <Button
                sx={{
                  bgcolor: "#C41E3A",
                  "&:hover": { backgroundColor: "#C41E3A" },
                }}
                variant="contained"
                onClick={() => {
                  setIsDeleteClicked(!isDeleteClicked);
                  setSelectedEmail(value);
                }}
              >
                Delete
              </Button>
            )}
          />
        </>
      )}
      <ModalComponent />
      <DeletePopUp />
    </Grid>
  );
};

export default Users;
