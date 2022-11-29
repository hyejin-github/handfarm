import React from "react";
// import Iframe from "react-iframe";
import { useRecoilState } from "recoil";
import { motorControl, cameraInfo } from "../../../atom";
import { Container, Typography, Box } from "@mui/material";

const CameraCard = () => {
  const [camera, setCamera] = useRecoilState(cameraInfo)

  return (
    <>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Camera</Typography>
        <Box sx={{ mb: 10 }}>
          <iframe
            src={camera}
            width="100%"
            height="300vh"
            frameBorder="0"
          />
        </Box>
    </>
  );
};

export default CameraCard;
