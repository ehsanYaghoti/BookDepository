import axios from 'axios';


let instance = axios.create({
    baseURL : 'http://localhost:4000',
    timeout : 4000,
    timeoutErrorMessage : 'سرور مشکل دارد'    ,
    withCredentials : true,
    // headers: {'Access-Control-Allow-Origin': '*'},
    // proxy: {
    //     host: 'http://localhost',
    //     port: 4000
    // }
    // headers : {'Access-Control-Allow-Headers' : 'content-type' }
})

instance.interceptors.request.use(function(config) {
    // console.log(config)
    return config;
} , function(error){
    return Promise.reject(error);
});

instance.interceptors.response.use(function(response) {
    // console.log(response)
    return response;
} , function(error){

    return Promise.reject(error);
});


export default instance;