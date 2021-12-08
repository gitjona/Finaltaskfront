import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function EditCustomer(props)
{
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    });

    function handleClickOpen()
    {
      setOpen(true);
      setCustomer({
        firstname: props.params.data.firstname,
        lastname: props.params.data.lastname,
        streetaddress: props.params.data.streetaddress,
        postcode: props.params.data.postcode,
        city: props.params.data.city,
        email: props.params.data.email,
        phone: props.params.data.phone,
      })
    };
  
    function handleClose()
    {
      setOpen(false);
    };

    function handleSave()
    {
      props.updateCustomer(props.params.value, customer);
      handleClose();
    };
  
    function inputChanged(e)
    {
        setCustomer({...customer, [e.target.name]: e.target.value});
    }

    return (
      <div>
        <IconButton >
            <EditIcon onClick={handleClickOpen}/>
        </IconButton>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
                name="firstname"
                value={customer.firstname}
                onChange={inputChanged}    
                margin="dense"
                label="Firstname"
                fullWidth
                variant="standard"
            />
            <TextField
                name="lastname"
                value={customer.lastname}
                onChange={inputChanged}    
                margin="dense"
                label="Lastname"
                fullWidth
                variant="standard"
            />
            <TextField
                name="streetaddress"
                value={customer.streetaddress}
                onChange={inputChanged}    
                margin="dense"
                label="Streetaddress"
                fullWidth
                variant="standard"
            />
            <TextField
                name="postcode"
                value={customer.postcode}
                onChange={inputChanged}    
                margin="dense"
                label="Postcode"
                fullWidth
                variant="standard"
            />
            <TextField
                name="city"
                value={customer.city}
                onChange={inputChanged}    
                margin="dense"
                label="City"
                fullWidth
                variant="standard"
            />
            <TextField
                name="email"
                value={customer.email}
                onChange={inputChanged}    
                margin="dense"
                label="Email"
                fullWidth
                variant="standard"
            />
            <TextField
                name="phone"
                value={customer.phone}
                onChange={inputChanged}    
                margin="dense"
                label="Phone"
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

export default EditCustomer;