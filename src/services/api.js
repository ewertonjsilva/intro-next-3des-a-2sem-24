import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.67.22.146:3333' // ip e porta do servidor
    // lab6 10.67.22.146
    // lab4 10.67.22.144
});

export default api;