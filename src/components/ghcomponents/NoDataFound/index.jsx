import { Link, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import { NO_DATA } from "../../assets/images";
import { COLORS } from "../../themes/Colors";

const NoDataFound = ({ src, title, isSubTitle, subTitle, onClick }) => {
  return (
    <Container
      component={"div"}
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        height: "92vh",
        flexDirection: "column",
      }}
    >
      <Box
        component={"img"}
        alt="no data found"
        src={src}
        sx={{ height: "60%" }}
      />
      <Typography
        variant="h6"
        component={"h6"}
        sx={{ fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}
      >
        {title}
      </Typography>

      {isSubTitle && (
        <Link
          onClick={onClick}
          variant="body2"
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "italic",
            cursor: "pointer",
            color: COLORS.blue_azure
          }}
        >
          {subTitle}
        </Link>
      )}
    </Container>
  );
};

export default NoDataFound;

NoDataFound.propTypes = {
  src: PropTypes.any,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  isSubTitle: PropTypes.bool,
  onClick: PropTypes.func,
};

NoDataFound.defaultProps = {
  src: NO_DATA,
  title: "No Requests Found ...!",
  subTitle: "Create New Request",
  isSubTitle: false,
  onClick: "",
};
