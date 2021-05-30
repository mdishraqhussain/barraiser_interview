import axios from "axios";

export const getService = () =>{
    return axios.get("https://jsonplaceholder.typicode.com/users")
}
