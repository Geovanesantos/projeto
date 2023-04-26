import { cadastroRepository } from "../repositories/repositori";
let message = "";

class CadastroUseCases {
    async cadastraTicket(titulo, motivo, software, prioridade, ramal, content) {
        message = "";
        if(titulo === ""){
            message += "Titulo deve ser informado!\n";
        }
        if(motivo === ""){
            message += "Motivo deve ser informado!\n";
        }
        if(software === ""){
            message += "Software deve ser informado!\n";
        }
        if(prioridade === ""){
            message += "Prioridade deve ser informado!\n";
        }      
        if(content.length <= 15){
            message += "Descrição ser contém no maximo 15 caracter!\n";
        }
        if(!message.length){         
            const response = await cadastroRepository.CadastradaTicket(titulo, motivo, software, prioridade, ramal, content)
            return response
        }else{
            return message
        }
    } 
    async getMotivo(infraestrutura) {
        const response = await cadastroRepository.GetMotivo(infraestrutura)
        return response
    } 
    async getSoftware(motivo) {
        const response = await cadastroRepository.GetSoftware(motivo)
        return response
    }     
    async getPrioridade() {
        const response = await cadastroRepository.GetPrioridade()
        return response
    }       
}
export const cadastroUseCases = new CadastroUseCases();