import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import './confirmDialogue.css';

export default function ConfirmDialogue({ isFinished, setIsFinished, passMark, questionsList, currentIndex, completed }) {
  const navigate = useNavigate();
  const handleClose = () => {
    setIsFinished(false);
  };

  const handleYes = () => {
    setIsFinished(false);
    navigate("/result", {
      state: {
        passMark, questionsList, currentIndex, completed
      }
    });
  };

  return (
    <>
      <Dialog

        open={isFinished}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {" Are you sure you want to submit the test?"}
        </DialogTitle>

        <DialogActions>
          <Button variant="contained" className="action-button" onClick={handleYes}>
            Yes
          </Button>
          <Button variant="contained" className="action-button" onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}