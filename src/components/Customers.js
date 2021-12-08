import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

function Customers ()
{
    const [customers, setCustomers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');

    React.useEffect(() => {
        fetchCustomers();
    }, [])

    function fetchCustomers()
    {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    function deleteCustomer(url)
    {
        if (window.confirm('Are you sure?'))
        {
            fetch(url, { method: 'DELETE'})
            .then(response => {
                if(response.ok)
                {
                    fetchCustomers();
                }
                else
                    alert('Error')
            })
            .catch(err => console.log(err))
        }
    }

    function addCustomer(customer)
    {
        fetch('https://customerrest.herokuapp.com/api/customers',{
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(customer)
        })
        .then(response => {
            if(response.ok)
            {
                fetchCustomers();
                setMsg('Lisäys onnistui');
                setOpen(true);
            }
            else
                alert('Lisäys ei onnistunut');
        })
        .catch(err => console.log(err))
    }

    function updateCustomer(url, updatedCustomer)
    {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if(response.ok)
            {
                fetchCustomers();
                setMsg('Muokkaus onnistui');
                setOpen(true);
            }
            else
                alert('Muokkaus ei onnistunut');
        })
        .catch(err => console.log(err))
    }
    
    function addTraining(training)
    {
        fetch('https://customerrest.herokuapp.com/api/trainings',{
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(training)
        })
        .then(response => {
            if(response.ok)
            {
                fetchCustomers();
                setMsg('Lisäys onnistui');
                setOpen(true);
            }
            else
                alert('Lisäys ei onnistunut');
        })
        .catch(err => console.log(err))
    }

    const columns = [
        {field: 'firstname', sortable: true, filter: true, width: 150},
        {field: 'lastname', sortable: true, filter: true, width: 150},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true, width: 150},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            field: 'links.0.href',
            width: 80,
            cellRendererFramework: params => <AddTraining addTraining={addTraining} customer={params.value}/>
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 80,
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params}/>
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 80,
            cellRendererFramework: params => 
            <IconButton >
                <DeleteIcon onClick={() => deleteCustomer(params.value)}/>
            </IconButton>
        }
    ]

    return(
        <React.Fragment>
            <div className="ag-theme-material" style={{height: 600, width: '80%', margin: 'auto'}}>
                <br/><br/><br/><br/>
                <h2>Customers</h2>
                <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
                />
            </div>
            <br/><br/><br/><br/>
            <AddCustomer addCustomer={addCustomer}/>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg}
            />
        </React.Fragment>
    );
}

export default Customers;