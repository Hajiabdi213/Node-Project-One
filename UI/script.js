const api = 'http://localhost:4000/api/users'

axios.get(api)
    .then(response =>{
        console.log(response.data)
    }).catch(error =>{
        console.log(error)
    })