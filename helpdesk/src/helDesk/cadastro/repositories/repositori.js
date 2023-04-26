import http from "../../api/Api"

class CadastroRepository {
    async CadastradaTicket(titulo, motivo, software, prioridade, ramal, content) {
        try {
            const response = await http.post("/ticket", {
                title: titulo,
                reason: {
                  uuid: motivo,
                },
                subject: {
                  uuid: software,
                },
                priority: {
                  uuid: prioridade,
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