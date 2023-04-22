import './styles/modalView.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ childToParent, ...props }) {
    const [open, setOpen] = useState(props.setOpen);
    const [getId, setId] = useState([]);

    const [user, setUser] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);

    axios.get('http://10.0.11.149:9000/ticket/' + props.id)
    .then(function (response) {
      setId(response.data.ticket);
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
    });
  }, []);

  return (
    <div>
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className='tittle'>Número do chamado: {getId.number}</span>
            </Typography>

            {
                user == "colaborador" ?  <Button autoFocus color="inherit">Editar</Button> : <ButtonGroup>
                <Button autoFocus color="inherit">Aprovar</Button>
                <Button autoFocus color="inherit">Reprovar</Button>
              </ButtonGroup>

            }
           
           
            
            
                  
          </Toolbar>
        </AppBar>
        <List>
        <Box marginTop="15px" marginLeft="25px" align="left" sx={{ width: '100%', maxWidth: '80%' }}>
            <Typography variant="h6" gutterBottom>
            <span className='tittle'>Título: {getId.title}</span> 
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                <span className='tittle' >Colaborador: {getId.user && getId.user.name}</span> 
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                <span className='tittle' >Motivo:</span> {getId.reason && getId.reason.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                <span className='tittle' >Prioridade:</span> {getId.priority && getId.priority.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                <span className='tittle' >Data de criação:</span> {getId.create_at}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                <span className='tittle' >Situação:</span> {getId.situation && getId.situation.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                <span className='tittle' >Contato:</span> {getId.contact}
            </Typography>
            {getId.descriptions && getId.descriptions.map((description, index) => (
            <Typography variant="body1" gutterBottom key={index}>
              <p className='tittle'>Descrição: {index % 2 === 0 ? 'Colaborador' : 'Gestor'}</p>
              <div className='borda' dangerouslySetInnerHTML={{ __html: description.description }} />
            </Typography>
            ))}
      </Box>
        </List>
      </Dialog>
    </div>
  );
}
