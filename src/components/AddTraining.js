import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import dateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import AdapterDayjs from '@mui/lab/AdapterDayjs';

function AddTraining(props)
{
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '',
        duration: '',
        activity: '',
        customer: props.customer,
    });

    function handleClickOpen()
    {
      setOpen(true);
    };
  
    function handleClose()
    {
      setOpen(false);
    };

    function handleSave()
    {
      props.addTraining(training);
      handleClose();
    };
  
    function inputChanged(e)
    {
        setTraining({...training, [e.target.name]: e.target.value});
    }

    function formatDate(date)
    {
      setTraining({...training, date: date.toISOString()});
    }

    return (
      <div>
        <IconButton >
            <AddIcon onClick={handleClickOpen}/>
        </IconButton>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Training</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={dateAdapter}>
              <DatePicker
                label="Date"
                name="date"
                value={training.date}
                onChange={date => formatDate(date)}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            <TextField
                name="duration"
                value={training.duration}
                onChange={inputChanged}    
                margin="dense"
                label="Duration"
                fullWidth
                variant="standard"
            />
            <TextField
                name="activity"
                value={training.activity}
                onChange={inputChanged}    
                margin="dense"
                label="Activity"
                fullWidth
                variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="inlined" onClick={handleClose}>Cancel</Button>
            <Button variant="outlined" onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default AddTraining;