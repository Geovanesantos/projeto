import http from "../../api/Api"

class CadastroRepository {
    async CadastradaTicket() {
        try {
            const response = await http.put(`/ticket`)
            return response.data
        } catch (error) {
            return error.response
        }
    }
    async GetMotivo(infraestrutura) {
        console.log('infraestrutura',infraestrutura);
        try {
            const response = await http.get(`/reason/list?isInfrastructure=${infraestrutura}`)
            return response.data
        } catch (error) {
            return error.response
        }
    }
    
    async GetSoftware(motivo) {
        console.log('infraestrutura',motivo);
        try {
            const response = await http.get(`/subject/${motivo}`)
            return response.data
        } catch (error) {
            return error.response
        }
    }   
    async GetPrioridade() {
        try {
            const response = await http.get(`/priority`)
            return response.data
        } catch (error) {
            return error.response
        }
    }       
     
}
export const cadastroRepository = new CadastroRepository()