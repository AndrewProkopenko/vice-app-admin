import axios from 'axios' 

const instance = axios.create({
    baseURL: 'http://localhost:4545/',  
})

instance.interceptors.response.use( (response) => {
    if (response.data) return response.data
    return response
}, (error) => { 
    console.log(error)
    return Promise.reject(error.response.data)
})

export default instance