import React from 'react'
import { Typography, Modal, Box } from '@mui/material'
import './ControlDetail'
import { useRecoilState } from "recoil";
import { motorModal, motorControl } from "../../atom";
import ControlTemp from '../../components/myFarm/control/ControlTemp';
import ControlFan from '../../components/myFarm/control/ControlFan';
import ControlLed from '../../components/myFarm/control/ControlLed';
import ControlPump from '../../components/myFarm/control/ControlPump';
import ControlBuzzer from '../../components/myFarm/control/ControlBuzzer';
import SensorInfo from './SensorInfo';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 800,
  bgcolor: '#212528',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ControlDetail = ({deviceId}) => {
  const [onControl, setOnControl] = useRecoilState(motorModal)
  const [motorState, setMotorState] = useRecoilState(motorControl)  
  const handleClose = () => setOnControl(false);

  const controlTemp = motorState.temp
  const controlFan = motorState.fan
  const controlLed = motorState.led
  const controlPump = motorState.pump
  const controlBuzzer = motorState.buzzer

  return (
    <>
      <Modal
        open={onControl}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign="end"
            onClick={handleClose}>
            X
          </Typography>

          <Typography flexGrow={1} variant="h6" sx={{fontWeight:'bold'}}>제어 설정</Typography>
          <hr />
          <SensorInfo deviceId={deviceId} />
          { controlTemp? <ControlTemp controlTemp={controlTemp} deviceId={deviceId}/> : <></> }
          { controlFan? <ControlFan controlFan={controlFan} deviceId={deviceId}/> : <></> }
          { controlLed? <ControlLed controlLed={controlLed} deviceId={deviceId}/> : <></> }
          { controlPump? <ControlPump controlPump={controlPump} deviceId={deviceId}/> : <></>}
          { controlBuzzer? <ControlBuzzer controlBuzzer={controlBuzzer} deviceId={deviceId}/> : <></>}
        </Box>
      </Modal>
    </>
  )
}

export default ControlDetail