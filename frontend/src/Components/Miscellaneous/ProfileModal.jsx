import React, { useContext } from 'react'
import style from "./modal.module.scss"
import chatContext from '../../Context/chatProvider';
import { Avatar, Box, Modal, Typography } from '@mui/material';

function ProfileModal() {

    const val = useContext(chatContext);
    const handleClose = () => val.setOpen1(false);
    console.log(val.user);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid none',
        borderRadius : '12px',
        boxShadow: 24,
        p: 4,
        display : 'flex',
        flexDirection : "column",
        justifyContent : 'center',
        alignItems : 'center',
        gap : '12px'
      };

  return (
    <div className={style.container} >
      <Modal
        open={val.open1}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Box sx={style} >
          <Avatar src={val.user.pic} sx={{ width: 50, height: 50 }} />
          <p style={{fontSize : "18px"}} ><span style={{fontWeight : "bold"}} >Name</span> : {val.user.name}</p>
          <p style={{fontSize : '18px'}}> <span style={{fontWeight : "bold"}} >Email</span>  : {val.user.email}</p>
        </Box>
      </Modal>
    </div>
  )
}

export default ProfileModal
