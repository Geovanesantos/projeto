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
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import "../../../App.css";
import { cadastroUseCases } from "../useCases/useCases";

import Swal from "sweetalert2";

import JoditEditor from "jodit-react";

export default function Cadastro() {
  const navigate = useNavigate();
  const [motivo, setMotivo] = React.useState("");
  const [software, setSoftware] = React.useState("");
  const [prioridade, setPrioridade] = React.useState("");
  const [titulo, setTitulo] = React.useState("");
  const [ramal, setRamal] = React.useState("");
  const [viewInfra, setViewInfra] = React.useState("");
  const [infraestrutura, setInfraestrutura] = React.useState("");
  const [listMotivo, setListMotivo] = React.useState([]);
  const [listSoftware, setListSoftware] = React.useState([]);
  const [listPrioridade, setListPrioridade] = React.useState([]);

  const handleChangeInfra = (event) => {
    setInfraestrutura(event.target.value);
    localStorage.setItem("infra", event.target.value);
    const getInfra = async () => {
      const flowCodes = await cadastroUseCases.getMotivo(event.target.value);
      return flowCodes;
    };
    getInfra().then((response) => {
      setListMotivo(response.reasons);
    });
  };

  const handleChangeMotivo = (event) => {
    setMotivo(event.target.value);
    localStorage.setItem("motivo", event.target.value);

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
    localStorage.setItem("prioridade", event.target.value);
    setPrioridade(event.target.value);
  };

  const handleChangeRamal = (event) => {
    setRamal(event.target.value);
    localStorage.setItem("contato", event.target.value);
    if (ramal.length === 1) {
      setViewInfra("");
      setInfraestrutura("");
    }
  };
  const handleChangemSoftware = (event) => {
    setSoftware(event.target.value);
    localStorage.setItem("software", event.target.value);
  };
  const handleChangemTitulo = (event) => {
    setTitulo(event.target.value);
    localStorage.setItem("titulo", event.target.value);
  };

  const editor = React.useRef(null);
  const [content, setContent] = React.useState("");
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    spellcheck: true,//para corretor ortografico

  };

  function limpaLocalStorage() {
    localStorage.removeItem("motivo");
    localStorage.removeItem("titulo");
    localStorage.removeItem("contato");
    localStorage.removeItem("software");
    localStorage.removeItem("descricao");
    localStorage.removeItem("infra");
    localStorage.removeItem("prioridade");
    localStorage.removeItem("continueDraft");
  }

  function CadastraTicket() {
    const getCadastraTicket = async () => {
      const flowCodes = await cadastroUseCases.cadastraTicket(
        titulo,
        motivo,
        software,
        prioridade,
        ramal,
        content
      );
      return flowCodes;
    };

    getCadastraTicket().then((response) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      if (response !== "" && response.error !== null) {
        Toast.fire({
          icon: "warning",
          title: response,
        });
      } else {
        Toast.fire({
          icon: "success",
          title: "Chamado registrado com sucesso!",
        });
        limpaLocalStorage();
        navigate("/Listagem");
      }
    });
  }

  React.useEffect(() => {
    if (localStorage.getItem("continueDraft")) {
      setRamal(localStorage.getItem("contato"));
      setInfraestrutura(localStorage.getItem("infra"));
      setMotivo(localStorage.getItem("motivo"));
      setSoftware(localStorage.getItem("software"));
      setPrioridade(localStorage.getItem("prioridade"));
      setTitulo(localStorage.getItem("titulo"));
      setContent(localStorage.getItem("descricao"));
      setViewInfra(1);
      const getLisMotivo = async () => {
        const flowCodes = await cadastroUseCases.getMotivo(infraestrutura);
        return flowCodes;
      };
      getLisMotivo().then((response) => {
        setListMotivo(response.reasons);
      });

      if (localStorage.getItem("motivo")) {
        const getListSoftware = async () => {
          const flowCodes = await cadastroUseCases.getSoftware(
            localStorage.getItem("motivo")
          );
          return flowCodes;
        };
        getListSoftware().then((response) => {
          setListSoftware(response.subject);
        });
      }
      const getListPrioridade = async () => {
        const flowCodes = await cadastroUseCases.getPrioridade();
        return flowCodes;
      };
      getListPrioridade().then((response) => {
        setListPrioridade(response.priority);
      });
    }
  }, []);

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
              defaultValue={ramal}
              value={ramal}
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
              value={titulo}
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
                  <MenuItem
                    style={
                      item.description === "URGENTE" ? { color: "red" } : {}
                    }
                    value={item.uuid}
                  >
                    {item.description}
                  </MenuItem>
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
            onChange={(newContent) => {
              localStorage.setItem("descricao", newContent);
            }}
          />
        </div>

        {/* 
            div Botões para confirmar
        */}
        <div
          style={{
            display: "grid",
            maxWidth: 1092,
            gridTemplateColumns: "repeat(2, 1fr)",
            marginLeft: 10,
            marginTop: 20,
          }}
        >
          <div>
            <Button variant="outlined" onClick={() => navigate("/Listagem")}>
              Voltar
            </Button>
          </div>
          <div style={infraestrutura ? {} : { display: "none" }}>
            <Button variant="contained" onClick={CadastraTicket}>
              Confirmar
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
}
