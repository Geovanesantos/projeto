import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import './styles/lista.css';

export default function BasicTable() {

  function createData(chamado, usuario, motivo, prioridade, titulo, situacao, editDel) {
    return { chamado, usuario, usuario, motivo, prioridade, titulo, situacao, editDel };
  }
  
  let acao = <Button><VisibilityIcon fontSize="medium" /></Button>
            

 const [getTicket, setTicket] = useState([]);
 const [getAuthorization, setAuthorization] = useState("gestor");

 const config = {
  headers:{
    Authorization: getAuthorization,
  }
};

 useEffect(() => {
  axios.get('http://10.0.11.110:9000/ticket', config)
  .then(function (response) {
    setTicket(response.data.tickets);
  })
  .catch(function (error) {
    console.error(error);
  })
  .finally(function () {
  });
}, [getAuthorization]);

console.log(getTicket)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="titles" align="right">Nº</TableCell>
            <TableCell className="titles" align="left">Usuário</TableCell>
            <TableCell className="titles" align="left">Motivo</TableCell>
            <TableCell className="titles" align="left">Prioridade</TableCell>
            <TableCell className="titles" align="left">Título</TableCell>
            <TableCell className="titles" align="left">Situação</TableCell>
            <TableCell className="titles" align="center">Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getTicket.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.number}</TableCell>
              <TableCell component="th" scope="row">
                {row.user.name}
              </TableCell>
              <TableCell align="left">{row.reason.description}</TableCell>
              <TableCell align="left">{row.priority.description}</TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.situation.description}</TableCell>
              <TableCell align="center">{acao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
