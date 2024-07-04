import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function ConfirmDialogue({isFinished,setIsFinished,passMark,questionsList,currentIndex,completed}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 const navigate=useNavigate();
  const handleClose = () => {
    setIsFinished(false);
  };

  const handleYes = () => {
    setIsFinished(false);
    navigate("/result",{
        state: {
            passMark,questionsList,currentIndex,completed
        }
      });
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={isFinished}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {" Are you sure you want to submit the test."}
        </DialogTitle>
       
        <DialogActions>
          <Button autoFocus onClick={handleYes}>
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
}