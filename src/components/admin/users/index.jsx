import { Box, Button, Fab, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COMMON_STRING,
  DOWNLOAD,
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
import DownloadIcon from "@mui/icons-material/Download";
import { exportToExcel } from "../../constants/exportToExcel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
    getUserRequest(appConfig.API_BASE_URL, dispatch);
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
        <Box display={"flex"} alignItems="center" flexDirection={"column"}>
          <ErrorOutlineIcon sx={{ fontSize: 70, color: COLORS.bright_red }} />
          <Typography
            component="h6"
            sx={{ fontSize: 24, letterSpacing: 0.4, fontWeight: "bold", px: 1 }}
          >
            {USER_SCREEN_CONSTANT.ARE_YOU_SURE}
          </Typography>
          <Typography
            component="h6"
            sx={{ fontSize: 16, letterSpacing: 0.3, paddingTop: 0.5 }}
          >
            {USER_SCREEN_CONSTANT.SUB_TEXT}
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
              setLoading(false);
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
                  width: 120,
                  height: 40,
                  bgcolor: COLORS.bright_red,
                  "&:hover": { backgroundColor: COLORS.bright_red },
                }}
                variant="contained"
                onClick={() => {
                  setIsDeleteClicked(!isDeleteClicked);
                  setSelectedEmail(value);
                }}
              >
                {COMMON_STRING.DELETE}
              </Button>
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
          onClick={() => exportToExcel(data, "Users")}
        >
          {DOWNLOAD}
          <DownloadIcon sx={{ ml: 1 }} />
        </Fab>
      )}
    </Grid>
  );
};

export default Users;
