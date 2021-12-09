import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Customers from './components/Customers';
import Trainings from './components/Trainings';

function App() 
{
  const d = new Date();
  const year = d.getFullYear();

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar postion="static">
          <div align="right">
            <small style={{color: "#3399ff"}}>&copy; 2021 - {year} Jona Oksanen</small>
          </div>
          <Toolbar>
            <Typography variant="h6">
              Finaltask
              <br></br>
              <Link to="/" style={{color: "#33ccff"}}>Customers</Link><br></br>
              <Link to="/trainings" style={{color: "#33ccff"}}>Trainings</Link>
            </Typography>          
          </Toolbar>
        </AppBar>

        <br></br><br></br><br></br><br></br>
        <Routes>
          <Route exact path="/" element={<Customers/>} />
          <Route path="/trainings" element={<Trainings/>} />
          <Route path="*" element={<notFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
