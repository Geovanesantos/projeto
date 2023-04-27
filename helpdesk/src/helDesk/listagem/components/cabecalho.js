import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddtIcon from '@mui/icons-material/Add';

import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function ButtonAppBar() {

  const navigate = useNavigate();

  function handleClickNavigator(){
    const rascunho = validaRascunho();
    
    if(rascunho){
      Swal.fire({
        title: 'Existe chamado em digitação, deseja continuar?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        confirmButtonColor: '#33bd3b',
        denyButtonText: `Nao`,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Cadastro");
          localStorage.setItem('continueDraft', true);
        } else if (result.isDenied) {
          limpaLocalStorage();
          navigate("/Cadastro");
        }
      }) 
    }else{
      navigate("/Cadastro");
    }
   
  }
  function validaRascunho() {
    let retorno = false;
    if(localStorage.getItem("motivo") || localStorage.getItem("titulo") || localStorage.getItem("contato") || localStorage.getItem("software") || localStorage.getItem("descricao") || localStorage.getItem("infra") || localStorage.getItem("prioridade")){
      console.log('local',localStorage.getItem("motivo"));
      retorno = true;
    }
    return retorno;
  }
  
  function limpaLocalStorage() {
    localStorage.removeItem("motivo");
    localStorage.removeItem("titulo");
    localStorage.removeItem("contato");
    localStorage.removeItem("software");
    localStorage.removeItem("descricao");
    localStorage.removeItem("infra");
    localStorage.removeItem("prioridade");
    localStorage.removeItem('continueDraft');    
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