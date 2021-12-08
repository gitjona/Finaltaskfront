import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from 'dayjs'; 

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function Trainings ()
{
    const [trainings, setTrainings] = React.useState([]);

    React.useEffect(() => {
        fetchTrainings();
    }, [])

    function fetchTrainings()
    {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    function deleteTraining(id)
    {
        if (window.confirm('Are you sure?'))
        {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, { method: 'DELETE'})
            .then(response => {
                if(response.ok)
                {
                    fetchTrainings();
                }
                else
                    alert('Error')
            })
            .catch(err => console.log(err))
        }
    }

    const columns = [
        {
            field: 'date',
            sortable: true,
            filter: true,
            cellRendererFramework: params => 
            <div>
                {dayjs(params.value).format('DD-MM-YYYY')}
            </div>
        },
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true },
        {headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true },
        {
            headerName: '',
            field: 'id',
            width: 120,
            cellRendererFramework: params => 
            <IconButton >
                <DeleteIcon onClick={() => deleteTraining(params.value)}/>
            </IconButton>
        }
    ]

    return(
        <React.Fragment>
            <div className="ag-theme-material" style={{height: 600, width: '80%', margin: 'auto'}}>
                <br/><br/><br/><br/>
                <h2>Trainings</h2>
                <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
                />
            </div>
        </React.Fragment>
    );
}

export default Trainings;