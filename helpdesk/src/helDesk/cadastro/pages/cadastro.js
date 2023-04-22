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
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Campos from "../components/Campos";
import "../../../App.css";
import { cadastroUseCases } from "../useCases/useCases";

import api from "../../api/Api";

import JoditEditor from "jodit-react";

export default function Cadastro() {
  const [motivo, setMotivo] = React.useState("");
  const [software, setSoftware] = React.useState("");
  const [prioridade, setPrioridade] = React.useState("");
  const [titulo, setTitulo] = React.useState("");
  const [ramal, setRamal] = React.useState("");
  const [viewInfra, setViewInfra] = React.useState("");
  const [listMotivo, setListMotivo] = React.useState([]);
  const [listSoftware, setListSoftware] = React.useState([]);
  const [listPrioridade, setListPrioridade] = React.useState([]);
  const [infraestrutura, setInfraestrutura] = React.useState("");

  const handleChangeInfra = (event) => {
    setInfraestrutura(event.target.value);
    console.log("clucou", infraestrutura);
    const getInfra = async () => {
      const flowCodes = await cadastroUseCases.getMotivo(event.target.value);
      return flowCodes;
    };
    getInfra().then((response) => {
      setListMotivo(response.reasons);

      //   console.log("listMotivo",listMotivo);

      //   listMotivo.forEach((element) => {
      //     element.subjects.forEach((it) => {
      //         console.log('it',it);
      //       novosItens.push(it);
      //     });
      //   });
      //   setListSoftware(novosItens);
      //   console.log("listSoftware", listSoftware);
    });
  };

  const handleChangeMotivo = (event) => {
    setMotivo(event.target.value);
    console.log("motivo", motivo);

    const getSoftware = async () => {
      const flowCodes = await cadastroUseCases.getSoftware(event.target.value);
      return flowCodes;
    };
    getSoftware().then((response) => {
      setListSoftware(response.subject);
    });

    const getPrioridade = async () => {
      const flowCodes = await cadastroUseCases.getPrioridade();
      return flowCodes;
    };
    getPrioridade().then((response) => {
      setListPrioridade(response.priority);
    });
  };
  const handleChangePrioridade = (event) => {
    setPrioridade(event.target.value);
  };

  const handleChangeRamal = (event) => {
    setRamal(event.target.value);
    if (ramal.length === 1) {
      setViewInfra("");
      setInfraestrutura("");
    }
  };
  const handleChangemSoftware = (event) => {
    setSoftware(event.target.value);
  };
  const handleChangemTitulo = (event) => {
    setTitulo(event.target.value);
  };

  const editor = React.useRef(null);
  const [content, setContent] = React.useState("");
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  };

  function CadastraTicket() {
    console.log("titulo", titulo);
    console.log("motivo", motivo);
    console.log("software", software);
    console.log("ramal", ramal);
    console.log("content", content);

    const config = {
      headers: {
        Authorization: "gestor",
      },
    };

    api
      .post("/ticket", {
        title: titulo,
        reason: {
          uuid: motivo,
        },
        subject: {
          uuid: software,
        },
        priority: {
          uuid: "8029706a-e065-11ed-b5ea-0242ac120002",
        },
        user: {
          uuid: "fa264230-cc2f-4483-828b-d9e77b5e3f22",
        },
        contact: ramal,
        descriptions: [
          {
            description: content,
          },
        ],
      })
      .then((response) => console.log("deu boa"))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

    /*     const getCadastraTicket = async () => {
      const flowCodes = await cadastroUseCases.cadastraTicket();

      return flowCodes;
    };

    getCadastraTicket().then((response) => {
      console.log(response);

      //setStepFlow(response.data.flow);
    }); */
  }

  /*   React.useEffect(() => {

}, []);
*/
  /* listMotivo.forEach(element => {
    console.log("<<>>>>",element.subjects); 
    setListSoftware(element.subjects);   
}); */

  return (
    <>
      <div
        style={{
          display: "flex",
          marginLeft: 10,
          background: "#1976d2",
          justifyContent: "space-around",
          maxWidth: 730,
        }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ color: "white" }}>
          Cadastrado de Chamado
        </Typography>
      </div>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}
        noValidate
        autoComplete="off"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2 , 1fr)",
            maxWidth: "1100px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              sx={{ m: 1, width: "10ch" }}
              label="Contato"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              onChange={handleChangeRamal}
            />
            {ramal !== "" && viewInfra === "" ? (
              <ArrowForwardIcon
                color="primary"
                onClick={(e) => setViewInfra(1)}
              >
                add_circle
              </ArrowForwardIcon>
            ) : (
              ""
            )}
          </div>
          {viewInfra === 1 ? (
            <div>
              <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
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
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          ) : (
            ""
          )}
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
                {listMotivo.map((item) => (
                  <MenuItem value={item.uuid}>{item.description}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className={infraestrutura ? "" : "escondeDiv"}>
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small">Software</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={software}
                label="Software"
                onChange={handleChangemSoftware}
              >
                {listSoftware.map((item) => (
                  <MenuItem value={item.uuid}>{item.description}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/*           <div className={infraestrutura ? "" : "escondeDiv"}>
            <Campos value={motivo} />
          </div> */}
          <div className={infraestrutura ? "" : "escondeDiv"}>
            <TextField
              label="Titulo"
              id="outlined-size-small"
              defaultValue={titulo}
              size="small"
              onChange={handleChangemTitulo}
            />
          </div>
          <div className={infraestrutura ? "" : "escondeDiv"}>
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small">Prioridade</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={prioridade}
                label="Prioridade"
                onChange={handleChangePrioridade}
                style={prioridade == 2 ? { color: "red" } : {}}
              >
                {listPrioridade.map((item) => (
                  <MenuItem style={item.description === "URGENTE" ? {color:"red"} : {} } value={item.uuid}>{item.description}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* 
            descriçõ do problema
      */}
        <div
          style={
            infraestrutura
              ? {
                  maxWidth: 707,
                  marginLeft: 9,
                }
              : { display: "none" }
          }
        >
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
        </div>

        {/* 
            div Botões para confirmar
        */}
        <div
          style={
            infraestrutura
              ? {
                  display: "grid",
                  maxWidth: 1092,
                  gridTemplateColumns: "repeat(2, 1fr)",
                  marginLeft: 10,
                  marginTop: 20,
                }
              : { display: "none" }
          }
        >
          <div>
            <Button variant="outlined">Voltar</Button>
          </div>
          <div>
            <Button variant="contained" onClick={CadastraTicket}>
              Confirmar
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
}
