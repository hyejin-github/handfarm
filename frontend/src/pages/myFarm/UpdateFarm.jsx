import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { updateModal, userFarm } from "../../atom";
import {
  Modal,
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem
} from "@mui/material";
import { updateFarm, farmInfo, deleteFarm } from '../../pages/api/MyFarm'
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 550,
  bgcolor: "#212528",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

const deleteStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  height: 200,
  bgcolor: "#212528",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  display: 'flex',
  alignItems: 'center'
}

const UpdateFarm = ({ deviceId }) => {
  const navigate = useNavigate()
  const [user, setUser] = useRecoilState(userFarm)
  const [onUpdate, setOnUpdate] = useRecoilState(updateModal);
  const handleClose = () => setOnUpdate(false);

  const [onDelete, setOnDelete] = useState(false)
  const deleteClose = () => setOnDelete(false)
  const deleteOpen = () => setOnDelete(true)

  const crops = ["딸기", "파프리카", "방울 토마토"];
  const [farmName, setFarmName] = useState('')
  const [myCrops, setMyCrops] = useState('')

  useEffect(() => {
    if (user) {
      setFarmName(user.deviceInfo[deviceId].deviceName)
      setMyCrops(user.deviceInfo[deviceId].cropName)
    }
  }, [deviceId])

  const updateInfo = () => {
    const data = updateFarm({deviceId, farmName, myCrops})
      .then(res => {
        if (res.data.message === "success") {
          farmInfo()
            .then((res) => {
              setUser(res.data)
              setOnUpdate(false)
            })
        }
      })
  }

  const axiosFarmDelete = () => {
    const data = deleteFarm({deviceId})
      .then(res => {
        if (res.data.message === "success") {
          farmInfo()
            .then((res) => {
              setUser(res.data)
              setOnDelete(false)
              setOnUpdate(false)
              navigate('/myfarm/registing')
            })
        }
      })
  }

  return (
    <>
      <Modal
        open={onUpdate}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                농장 관리
              </Typography>
            </Box>
            <hr />

            {/* 농장 이름 변경 */}
            <Box display="flex" sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                농장 이름 변경
              </Typography>
            </Box>
            <Box display="flex" sx={{ mt: 1 }}>
              <TextField
                sx={{
                  " .MuiOutlinedInput-root": {
                    color: "black",
                    border: "1px solid white",
                    backgroundColor: "white",
                  },
                }}
                fullWidth
                variant="outlined"
                defaultValue={farmName}
                onChange={(event) => setFarmName(event.target.value)}
              />
            </Box>

            {/* 농장 작물 변경 */}
            <Box display="flex" sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                농장 작물 변경
              </Typography>
            </Box>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={myCrops}
              onChange={(event) => setMyCrops(event.target.value)}
              fullWidth
              sx={{ background: "white" }}
            >
              {crops.map((crop) => (
                <MenuItem key={crop} value={crop}>
                  {crop}
                </MenuItem>
              ))}
            </Select>

            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                sx={{
                  width: 80,
                  height: 50,
                  mt: 4,
                  mb: 2,
                  background: "#424B5A",
                }}
                onClick={updateInfo}
              >
                <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  변경
                </Typography>
              </Button>
            </Box>
            <hr />
            <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
              <Box flexGrow={1}>
                <Typography variant="h6" fontWeight="bold">
                  농장 삭제
                </Typography>
              </Box>
              <Button variant="contained" sx={{ background: "#424B5A" }}
              onClick={deleteOpen}>
                <Typography variant="h7">
                  삭제
                </Typography>
              </Button>
            </Box>
          </Container>
        </Box>
      </Modal>

      <Modal
        open={onDelete}
        onClose={deleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={deleteStyle}>
          <Container>
            <Box>
              <Typography variant="h7" sx={{fontWeight:'bold'}}>
                '{farmName}' 를 정말 삭제하시겠습니까?
              </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt:3}}>
                <Button variant="contained" sx={{mr:2, background:'#424B5A'}}
                onClick={axiosFarmDelete}>
                  <Typography variant="h7">삭제</Typography>
                </Button>
                <Button variant="contained" sx={{background:'#757575'}}
                onClick={deleteClose}
                >
                  <Typography variant="h7">취소</Typography>
                </Button>
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateFarm;
