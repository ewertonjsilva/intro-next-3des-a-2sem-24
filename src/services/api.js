import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.67.22.143:3333' // ip e porta do servidor
    // lab6 10.67.22.146
    // lab4 10.67.22.144
    // lab 2 10.67.22.142
    // lab 3 10.67.22.143
});

export default api;