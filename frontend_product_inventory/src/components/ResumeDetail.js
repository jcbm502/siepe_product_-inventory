import React from "react";
import { Box, Typography } from "@material-ui/core";

export const ResumeDetail = (props) => {
  const { title, value } = props;
  return (
    <Box display="flex" alignItems="center">
      <Box width="120px">
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
};
