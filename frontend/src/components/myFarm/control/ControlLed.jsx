import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  ButtonGroup,
  Button,
  Switch,
} from "@mui/material";
import "./Control.css";
import { controlState, axiosDegree } from "../../../pages/api/Control";
import axios from "axios";

const ControlLed = ({ controlLed, deviceId }) => {
  let autoLed = controlLed.auto;
  let manualLed = controlLed.manual;

  const control = "led";
  const degree = [0, 1, 2, 3];

  const [switchState, setSwitchState] = useState(autoLed);
  const [ledDegree, setLedDegree] = useState(manualLed);

  const [disabled, setDisabled] = useState(autoLed);

  useEffect(() => {
    controlState({ switchState, control, deviceId });
  }, [switchState]);

  function degreeChange(d) {
    setLedDegree(d);
    axiosDegree({ d, control, deviceId });
  }
  return (
    <>
      <Card sx={{ mt: 2, mb: 2, height: 115, backgroundColor: "#1E1E1E" }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography variant="h7" fontWeight="bold" color="white">
              LED
            </Typography>
            <Box display="flex" alignItems="center" sx={{ ml: 1 }}>
              <Switch
                color="warning"
                checked={switchState}
                onChange={() => {
                  if (switchState === 1) {
                    setSwitchState(0);
                    setDisabled(0);
                  } else {
                    setSwitchState(1);
                    setDisabled(1);
                  }
                }}
              />
              {switchState === 1 ? (
                <span style={{ color: "#00A214", fontSize: "12px" }}>자동</span>
              ) : (
                <span style={{ color: "orange", fontSize: "12px" }}>수동</span>
              )}
            </Box>
          </Box>
          <ButtonGroup
            sx={{ background: "#424B5A", borderRadius: "20px", mb: 1 }}
            display="flex"
            disabled={disabled}
          >
            <Button
              onClick={() => degreeChange(0)}
              variant="subtitle2"
              sx={{ m: 0.5, p: 0.5 }}
            >
              <Typography
                className={ledDegree === degree[0] ? "onCheck" : ""}
                sx={{ fontWeight: "bold", borderRadius: "15px", p: 0.5 }}
              >
                OFF
              </Typography>
            </Button>
            <Button
              onClick={() => degreeChange(1)}
              variant="subtitle2"
              sx={{ m: 0.5, p: 0.5 }}
            >
              <Typography
                className={ledDegree === degree[1] ? "onCheck" : ""}
                sx={{ fontWeight: "bold", borderRadius: "15px", p: 0.5 }}
              >
                1단계
              </Typography>
            </Button>
            <Button
              onClick={() => degreeChange(2)}
              variant="subtitle2"
              sx={{ m: 0.5, p: 0.5 }}
            >
              <Typography
                className={ledDegree === degree[2] ? "onCheck" : ""}
                sx={{ fontWeight: "bold", borderRadius: "15px", p: 0.5 }}
              >
                2단계
              </Typography>
            </Button>
            <Button
              onClick={() => degreeChange(3)}
              variant="subtitle2"
              sx={{ m: 0.5, p: 0.5 }}
            >
              <Typography
                className={ledDegree === degree[3] ? "onCheck" : ""}
                sx={{ fontWeight: "bold", borderRadius: "15px", p: 0.5 }}
              >
                3단계
              </Typography>
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </>
  );
};

export default ControlLed;
