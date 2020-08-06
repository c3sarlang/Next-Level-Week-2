import axios from "axios"

const api = axios.create ({ //caminho ouvido pelo server.
    baseURL:"http://localhost:3333"
})

export default api;