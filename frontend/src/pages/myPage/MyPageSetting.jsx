import React from 'react'
import { Modal, Box, IconButton, Button, ButtonGroup, TextField, Container } from '@mui/material'
import Logout from '../auth/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 550,
  bgcolor: '#212528',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1
};

const MyPageSetting = ({nickName, userProfile}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(userProfile)

  return (
    <>
      <IconButton sx={{ color: '#B3B3B3' }} onClick={handleOpen}>
        <SettingsIcon fontSize="large" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            {/*<Box sx={{mt:5}}>*/}
            {/*  <h2>공개/비공개설정</h2>*/}
            {/*  <hr />*/}
            {/*  <ButtonGroup sx={{mt:1}}>*/}
            {/*    <Button >공개</Button>*/}
            {/*    <Button sx={{ background: 'white' }}>비공개</Button>*/}
            {/*  </ButtonGroup>*/}
            {/*</Box>*/}

            <Box sx={{mt:5}}>
              <h2>닉네임 변경</h2>
              <hr />
              <Box display="flex" sx={{mt:1}}>
                <TextField sx={{
                        ' .MuiOutlinedInput-root': {
                            color: 'black',
                            border : '1px solid white',
                            backgroundColor : "white"
                        }
                    }} fullWidth variant="outlined" defaultValue={nickName}
                    />
                <Button>변경</Button>
              </Box>
            </Box>
          
            <Logout />
            
          </Container>
        </Box>
      </Modal>
    </>
  )
}

export default MyPageSetting