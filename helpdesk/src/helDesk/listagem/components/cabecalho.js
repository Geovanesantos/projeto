import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddtIcon from '@mui/icons-material/Add';

import { useNavigate } from "react-router-dom";


export default function ButtonAppBar() {

  const navigate = useNavigate();

  function handleClickNavigator(){
          navigate("/Cadastro");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <Button onClick={handleClickNavigator} color="inherit" startIcon={<AddtIcon />}>Adicionar</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}