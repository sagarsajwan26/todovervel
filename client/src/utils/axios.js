import axios from "axios";

export const axiosInstance= axios.create({
    baseURL:'https://todovervel.vercel.app/api/v1',
    withCredentials:true

})