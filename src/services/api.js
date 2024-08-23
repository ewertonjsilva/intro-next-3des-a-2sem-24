import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.67.22.144:3333' // ip e porta do servidor
});

export default api;