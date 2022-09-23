require('dotenv').config();

// const server = require('./api/server');

// const port = 9000;

// // START YOUR SERVER HERE
const express = require('express');
const model = require('./api/users/model')
const cors = require('cors')
const server = express()

server.use(express.json())
server.use(cors())



//GET api/users
server.get('/api/users', (req, res)=>{
    model.find()
        .then(users =>{
            res.json(users)
        })
        .catch(()=>{
            req.status(500).json({message: "could not found any student"})
        })
})


//Get api/users/id
server.get('/api/users/:id', (req, res)=>{
    let {id} = req.params // url ka request  ka  la diray ka soo qaad id ga
    model.findById(id)
        .then(user => {
            
            if(user != null){
              return res.json(user) 
            }else{
                 res.status(404).json({message: `User with the id ${id} not found`})
            }
        })
        .catch(()=>{
            res.status(500).json({message: "Could not find the user"})
        })
})


//POST API/USERS

server.post('/api/users', (req, res)=>{
    let body = req.body
    console.log(body)
    if(!body.name){
        req.status(500).json({message: 'Name is required'})
    }else{
        model.insert(body)
        .then(user =>{
            res.status(200).json(user)
        }).catch(()=>{
            res.status(500).json({message: "Could not create the student"})
        })
    }
})


//PUT API/USERS/ID
server.put('/api/users/:id', async (req, res)=>{
    let {id} = req.params
    
    try {
        let body = req.body
        let targetUser = await model.update(id, body);
        return res.status(200).json(targetUser)
        
    } catch  {
        
    }

})


//DELETE API/USERS/ID
server.delete('/api/users/:id',(req, res)=>{
    let {id}=req.params
   
    model.remove(id)
        .then(user => {
            res.status(200).json(user)
         
        })
        .catch(()=>{
            res.status(500).json({message: "Could not find the user"})
        })
})




// START YOUR SERVER HERE
const  PORT = process.env.Port || 4000;
server.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
