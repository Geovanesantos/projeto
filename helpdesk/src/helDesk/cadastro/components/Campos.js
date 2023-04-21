import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import '../../../App.css';

export default function Campos(children) {
    const [motivo, setMotivo] = React.useState("");
    const handleChangemMotivo = (event) => {
        setMotivo(event.target.value);
    };
    if(children.value > 0){
        return (
            <>
                <div className={children.value > 4 ? 'escondeDiv' : ''}>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                    <InputLabel id="demo-select-small">Software</InputLabel>
                    <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={motivo}
                    label="Software"
                    onChange={handleChangemMotivo}
                    >
                    <MenuItem value="">
                        <em> </em>
                    </MenuItem>
                    <MenuItem value={1}>SINGE</MenuItem>
                    <MenuItem value={2}>SALLE</MenuItem>
                    <MenuItem value={3}>CONECT_RH</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <div className={children.value == 6 ? '' : 'escondeDiv'}>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                    <InputLabel id="demo-select-small">Onde ocorreu</InputLabel>
                    <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={motivo}
                    label="Onde ocorreu"
                    onChange={handleChangemMotivo}
                    >
                    <MenuItem value="">
                        <em> </em>
                    </MenuItem>
                    <MenuItem value={1}>INTERNT</MenuItem>
                    <MenuItem value={2}>TELEFONIA FIXA</MenuItem>
                    <MenuItem value={3}>CELULAR</MenuItem>
                    </Select>
                </FormControl>
                </div>  
                <div className={children.value == 7 ? '' : 'escondeDiv'}>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                    <InputLabel id="demo-select-small">licenças</InputLabel>
                    <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={motivo}
                    label="licenças"
                    onChange={handleChangemMotivo}
                    >
                    <MenuItem value="">
                        <em> </em>
                    </MenuItem>
                    <MenuItem value={1}>Office</MenuItem>
                    <MenuItem value={2}>Adobe</MenuItem>
                    </Select>
                </FormControl>
                </div>  
                <div className={children.value == 9 ? '' : 'escondeDiv'}>
                <FormControl sx={{ m: 1, minWidth: 190 }} size="small">
                    <InputLabel id="demo-select-small">Lentantamento ou melhoria</InputLabel>
                    <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={motivo}
                    label="Lentantamento ou melhoria"
                    onChange={handleChangemMotivo}
                    >
                    <MenuItem value="">
                        <em> </em>
                    </MenuItem>
                    <MenuItem value={1}>Trocar Equipamento</MenuItem>
                    <MenuItem value={2}>Computadores</MenuItem>
                    <MenuItem value={3}>Coletores</MenuItem>
                    <MenuItem value={4}>Novos Software terceiros</MenuItem>
                    </Select>
                </FormControl>
                </div>                                                 
                <div className={children.value == 5 ||  children.value == 8 ? '' : 'escondeDiv'}>
                    <TextField
                    label="Equipamento"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    />
                </div>                
                <div className={children.value == 8 ? '' : 'escondeDiv'}>
                    <TextField
                    label="Mudança"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    />
                </div>                
            </>
        );
    }
  }
  
  