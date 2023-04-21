import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import Campos from "../components/Campos";
import "../../../App.css";
import { cadastroUseCases } from "../useCases/useCases";

export default function Cadastro() {
  const [motivo, setMotivo] = React.useState(1);
  const [ramal, setRamal] = React.useState("");
  const [viewInfra, setViewInfra] = React.useState("");
  const [listMotivo, setListMotivo] = React.useState([]);
  const [infraestrutura, setInfraestrutura] = React.useState(false);
  
  const handleChangeInfra = (event) => {
    setInfraestrutura(event.target.value);
console.log('clucou',infraestrutura);
    const getInfra = async () => {
        const flowCodes = await cadastroUseCases.getMotivo(infraestrutura);
        return flowCodes;
    };
      getInfra().then((response) => {
        setListMotivo(response.reasons);
        console.log('retorno',listMotivo);
      });

  };

  const handleChangeMotivo = (event) => {
    setMotivo(event.target.value);
  };

  const handleChangeRamal = (event) => {
    setRamal(event.target.value);
    if (ramal.length === 1) {
      setViewInfra("");
      setInfraestrutura("");
    }
  };

/*   React.useEffect(() => {
    const getCadastraTicket = async () => {
      const flowCodes = await cadastroUseCases.cadastraTicket();

      return flowCodes;
    };

    getCadastraTicket().then((response) => {
      console.log(response);

      //setStepFlow(response.data.flow);
    });
  }, []);
 */
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{ m: 1, width: "10ch" }}
          label="Ramal"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          onChange={handleChangeRamal}
        />
        {ramal !== "" && viewInfra === "" ? (
          <ArrowForwardIcon color="primary" onClick={(e) => setViewInfra(1)}>
            add_circle
          </ArrowForwardIcon>
        ) : (
          ""
        )}
      </div>
      {viewInfra === 1 ? (
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Infraestrutura
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={infraestrutura}
            onChange={handleChangeInfra}
          >
            <FormControlLabel value={true} control={<Radio />} label="Sim" />
            <FormControlLabel value={false} control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>
      ) : (
        ""
      )}

      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <div className={infraestrutura ? "" : "escondeDiv"}>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small">Motivo</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={motivo}
              label="Motivo"
              onChange={handleChangeMotivo}
            >
              {/*               <MenuItem value="">
                <em> </em>
              </MenuItem> */}
              {
                listMotivo.map((item)=>(
                    <MenuItem value={item.uuid}>{item.description}</MenuItem> 
                ))
              }
            </Select>
          </FormControl>
          <Campos value={motivo} />
          <div>
            <TextField
              label="Titulo"
              id="outlined-size-small"
              defaultValue=""
              size="small"
            />
          </div>
        </div>
      </Box>
    </>
  );
}
