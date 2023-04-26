import * as React from 'react';
import Button from '@mui/material/Button';
import './cadastro.css'
import Swal from 'sweetalert2'

import { useNavigate } from "react-router-dom";
//import RichText3 from '../../cadastro/components/richText3';



export default function Login() {
  const navigate = useNavigate();

  function acess(type) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    });
  
    localStorage.setItem("user", type);
    navigate("/Listagem");
  
  }





  return (
    <div className='login-container'>
        <div className='buttons'>
            <Button id="colaboradorButton" variant="contained" onClick={() => acess('colaborador')}>Colaborador</Button>
            <Button id="gestorButton" variant="contained" onClick={() => acess('gestor')}>Gestor</Button>
        </div>
        {/* <div className='richText'>
            <RichText3/>
        </div> */}
    </div>
  );
}