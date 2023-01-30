import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSize } from 'src/utils/size';

export type PopupProps = React.PropsWithChildren<{
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}>;

const Popup: React.FC<PopupProps> = (props) => {
  const { isMobileSize } = useSize();
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box
        sx={{
          overflow: 'scroll',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '100vh',
          width: '90%',
          height: 'auto',
          textAlign: 'left',
          maxWidth: '780px',
          // bgcolor: '#00440055',
          // border: '2px solid #00440055',
          bgcolor: '#FFFFFF',
          border: '0px solid #00440055',
          // bgcolor: '#FFFFFF',
          // border: '2px solid #EEEEEE',
          boxShadow: 24,
          // p: 4,
          // padding: '70px 70px 70px 70px',
          padding: isMobileSize ? '20px' : '70px',
        }}
      >
        {props.children}
      </Box>
    </Modal>
  );
};

export default Popup;
