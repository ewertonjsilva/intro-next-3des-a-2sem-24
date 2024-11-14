import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

const api = axios.create({
    baseURL: `${apiUrl}:${apiPorta}` // ip e porta do servidor
});
// console.log(`${apiUrl}:${apiPorta}`);

export default api;

