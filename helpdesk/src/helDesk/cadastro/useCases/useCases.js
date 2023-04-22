import { cadastroRepository } from "../repositories/repositori";

class CadastroUseCases {

    async cadastraTicket() {
        const response = await cadastroRepository.CadastradaTicket()
        return response
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