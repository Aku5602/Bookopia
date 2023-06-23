import {axios} from "axios";
export const axiosRequest = axios.create({
    baseURL: "https://link.com",
})


// import React from 'react';
// import { axiosRequest } from './api';
// export default function App() {

//   React.useEffect(()=>{
//     axiosRequest.get('/todos/1')
//     .then(res=>console.log(res))
//     .catch(err=>console.log(res))
//   },[])
  
//   return <>axios</>
// }