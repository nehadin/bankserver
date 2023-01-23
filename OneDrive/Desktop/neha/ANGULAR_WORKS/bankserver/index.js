const cors = require('cors')      //import cors


// import dataservice file from service folder
const dataservice = require("./service/dataService")

const jwt = require('jsonwebtoken')       //
// import express
const express = require('express')

// create app
const app = express()

app.use(cors({ origin: 'http://localhost:4200' }))     //connecting cors 

app.use(express.json())         //convert json data


// middleware for verifying token

const jwtmiddleware = (req, res, next) => {
    console.log("....router specific middleware....");
    try {
        const token = req.headers['access-token']
        const data = jwt.verify(token, "secretkey123")
        console.log(data);
        next()               //calling next() method is required so only middleware will work properly
    }
    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: "Please login"
        })
    }
}





//POST

//register
app.post('/register', (req, res) => {

    dataservice.register(req.body.acno, req.body.uname, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)
    })
})

// login

app.post('/login', (req, res) => {

    dataservice.login(req.body.acno, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)
    })
})

// deposit
app.post('/deposit', jwtmiddleware, (req, res) => {

    dataservice.deposit(req.body.acno, req.body.psw, req.body.amount).then(result => {
        res.status(result.statusCode).json(result)
    })
})


// withdraw
app.post('/withdraw', jwtmiddleware, (req, res) => {

    dataservice.withdraw(req.body.acno, req.body.psw, req.body.amount).then(result => {
        res.status(result.statusCode).json(result)
    })
})

// request  
app.post('/transaction', jwtmiddleware, (req, res) => {

    dataservice.gettransaction(req.body.acno).then(result => {
        res.status(result.statusCode).json(result)
    })

})


// GET

// app.get('/',(req,res)=> {res.send('GET Method checking')})






// //Delete

app.delete('/deleteacc/:acno', jwtmiddleware, (req, res) => {
    dataservice.acdelete(req.params.acno).then(result => {
        res.status(result.statusCode).json(result)
    })
})

// app.delete('/',(req,res)=>{
//     res.send('DELETE Method checking..........')
// })


// set port
app.listen(3000, () => console.log("server started at port number 3000"))

