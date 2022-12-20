import React, { useState , useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Modal, Popover } from "@mui/material";
import RoomRequest from "./RoomRequest";
import CancelOrExtendRequest from "./CancelOrExtendRequest";
import MyRequests from "./MyRequests";
import ApprovedRequests from "./ApprovedRequests";
import { EXCELLARATE_ICON, EXCELLARATE_LOGO_2 } from "../assets/images";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../themes/Colors";
import {
  ADMIN_PROFILE_CONSTANT,
  PROFILE_INFO,
} from "../constants/commonString";
import { useDispatch, useSelector } from "react-redux";
import { getProfileRequest } from "./Dashboard.action";
import appConfig from "../services/appConfig";


const pages = [
  { id: 1, name: "My Requests" },
  { id: 2, name: "Approved Requests" },
];
const requests = [
  { id: 1, name: "Room Request" },
  { id: 2, name: "Extend Request" },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState("");
  const [currentTab, setCurrentTab] = useState(1);

  useEffect(() => {
    const profile = getProfileRequest(appConfig.API_BASE_URL, dispatch);
     console.log('Roww////', profile);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    setAnchorEl(null);
    setIsModalOpen(true);
    setSelectedRequest(item.id);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (item) => {
    setAnchorElNav(false);
    setCurrentTab(item.id);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar position="static" sx={{ backgroundColor: COLORS.blue_azure }}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Box
              component={"img"}
              alt="excellarate-logo"
              src={EXCELLARATE_LOGO_2}
              sx={{
                paddingBottom: 0.5,
                display: { xs: "none", md: "flex" },
              }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                // onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography
                      textAlign="center"
                      sx={{
                        textTransform: "capitalize",
                        fontSize: 16,
                        fontWeight: "500",
                        letterSpacing: 0.3,
                      }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Box
                  component={"img"}
                  alt="excellarate-icon"
                  src={EXCELLARATE_ICON}
                  sx={{
                    width: 50,
                    height: 50,
                    display: { xs: "flex", md: "none" },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{
                    my: 2,
                    color: "#fff",
                    display: "block",
                    px: 2,
                    textTransform: "capitalize",
                    fontSize: 16,
                    fontWeight: "500",
                    letterSpacing: 0.3,
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                // onMouseEnter={handleOpenUserMenu}
                // onMouseLeave={handleCloseUserMenu}
              >
                <Avatar alt="avatar" />
              </IconButton>
              {/* <Popover
                sx={{
                  pointerEvents: "none",
                  mt: "10px",
                }}
                open={Boolean(anchorElUser)}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handleCloseUserMenu}
                disableRestoreFocus
              >
                <Box sx={{ p: 1 }}>
                  <Typography>Vishwanath S</Typography>
                  <Typography>Designation: Software Developer</Typography>
                  <Typography>Ph no: 1234567890</Typography>
                  <Typography>vishwanath.somavarad@excellarate.com</Typography>
                </Box>
              </Popover> */}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box sx={{ px: 5, py: 0.5 }}>
                  <Typography>Name: {PROFILE_INFO.NAME}</Typography>
                  <Typography>
                    Designation: {PROFILE_INFO.DESIGNATION}
                  </Typography>
                  <Typography>Ph no: {PROFILE_INFO.PHONE_NO}</Typography>
                  <Typography>Email: {PROFILE_INFO.EMAIL}</Typography>
                </Box>
                {ADMIN_PROFILE_CONSTANT.map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={() => {
                      localStorage.removeItem("token");
                      // setAuthHeaders(null);
                      handleCloseUserMenu();
                      navigation("/login");
                    }}
                    sx={{ px: 5 }}
                  >
                    <Typography
                      textAlign="center"
                      sx={{
                        color: COLORS.red,
                        fontSize: 16,
                      }}
                    >
                      {item.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 80 },
          right: { xs: 20, md: 70 },
          backgroundColor: COLORS.blue_azure,
        }}
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
      <Popover
        id={Boolean(anchorEl) ? "simple-popover" : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {requests.map((item) => {
          return (
            <MenuItem key={item} onClick={() => handleClose(item)}>
              <Typography sx={{ p: 1 }} textAlign="center">
                {item.name}
              </Typography>
            </MenuItem>
          );
        })}
      </Popover>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 300, md: 400 },
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedRequest === 1 && <RoomRequest />}
          {selectedRequest === 2 && <CancelOrExtendRequest />}
        </Box>
      </Modal>

      <Container maxWidth={false} disableGutters>
        {currentTab === 1 && (
          <MyRequests
            setSelectedRequest={setSelectedRequest}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        {currentTab === 2 && <ApprovedRequests />}
      </Container>
    </Container>
  );
};

export default Dashboard;
