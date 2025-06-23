import axios from "axios"

let api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true
})

export default api