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

}
export const cadastroUseCases = new CadastroUseCases();