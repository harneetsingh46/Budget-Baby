import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://budget-buddy-api1.vercel.app/api/"||"http://localhost:3000/api/",
    withCredentials: true     //jitin bhi req jaegi use sath cookies ko leke jane k liye
})


//request
apiClient.interceptors.request.use(
    (config)=>{
        console.log("Request Sent");
        return config
    },
    (error)=>{
        console.log(error.message);
        return Promise.reject(error)
    }
)

// response
apiClient.interceptors.response.use(
    (response)=>{
        console.log(response);
        return response
    },
    (error)=>{
        if(error.response?.status === 400 || error.response?.status === 404){
            console.log("Unauthorized || Forbidden");
        }
        return Promise.reject(error)
    }
)

export default apiClient