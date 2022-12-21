import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import Users from "../users";
import Rooms from "../rooms";
import Requests from "../requests";
import RoomDetails from "../history";
import { EXCELLARATE_ICON, EXCELLARATE_LOGO_2 } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_APP_BAR_CONSTANT,
  ADMIN_PROFILE_CONSTANT,
  PROFILE_INFO,
} from "../../constants/commonString";
import { COLORS } from "../../themes/Colors";
import { setAuthHeaders } from "../../services/api";
import { getProfileDetails } from "../../login/Login.action";
import appConfig from "../../services/appConfig";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.loginReducer);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [currentTab, setCurrentTab] = useState(1);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [profileInfo, setProfileInfo] = useState(details.profileInfo || []);

  useEffect(() => {
    async function fetchProfileInfo() {
      const { response, error } = await getProfileDetails(
        appConfig.API_BASE_URL,
        dispatch
      );
      if (response) {
        setProfileInfo(response?.data?.result);
      }
    }
    fetchProfileInfo();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (item) => {
    setAnchorElNav(false);
    setCurrentTab(item.id);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar position="sticky" sx={{ backgroundColor: COLORS.blue_azure }}>
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
                onClose={() => setAnchorElNav(false)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {ADMIN_APP_BAR_CONSTANT.map((page) => (
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

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginLeft: 4,
              }}
            >
              {ADMIN_APP_BAR_CONSTANT.map((page) => (
                <Button
                  disableRipple
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
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar alt="avatar" />
              </IconButton>
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
                  <Typography>Name: {profileInfo[0]?.name}</Typography>
                  <Typography>Designation: {profileInfo[0]?.desig}</Typography>
                  <Typography>Ph no: {profileInfo[0]?.pnumber}</Typography>
                  <Typography>Email: {profileInfo[0]?.email}</Typography>
                </Box>
                {ADMIN_PROFILE_CONSTANT.map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
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
                        letterSpacing: 0.3,
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
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        display={"flex"}
        // sx={{ paddingLeft: 5, paddingRight: 5 }}
      >
        {currentTab === 1 && <Users />}
        {currentTab === 2 && <Rooms />}
        {currentTab === 3 && <Requests />}
        {currentTab === 4 && <RoomDetails />}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
