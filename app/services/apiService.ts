const apiService = {
    get: async function (url: string): Promise<any>{
        return new Promise((resolve,reject)=>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method:"GET",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then((data)=>{
                resolve(data);
            })
            .catch(error=> reject(error))
        })
    },

    post: async function (url: string, data:any): Promise<any>{
        return new Promise((resolve,reject)=>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method:"POST",
                body: data,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then((data)=>{
                resolve(data);
            })
            .catch(error=> reject(error))
        })
    }
}

export default apiService;