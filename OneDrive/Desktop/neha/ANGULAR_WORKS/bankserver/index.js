

// import dataservice file from service folder
const dataservice = require("./service/dataservice")

// import express
const express = require('express')



// create app
const app = express()


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







//register
app.post('/register', (req, res) => {

    const result = dataservice.register(req.body.acno, req.body.uname, req.body.psw)
    res.status(result.statusCode).json(result)

})

// login

app.post('/login', (req, res) => {

    const result = dataservice.login(req.body.acno, req.body.psw)
    res.status(result.statusCode).json(result)

})

// deposit
app.post('/deposit',jwtmiddleware,  (req, res) => {

    const result = dataservice.deposit(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)

})


// withdraw
app.post('/withdraw',jwtmiddleware, (req, res) => {

    const result = dataservice.withdraw(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)

})

// request  
app.post('/gettransaction',jwtmiddleware, (req, res) => {

    const result = dataservice.gettransaction(req.body.acno)
    res.status(result.statusCode).json(result)

})


// GET

// app.get('/',(req,res)=> {res.send('GET Method checking')})


// POST



// //Delete
// app.delete('/',(req,res)=>{
//     res.send('DELETE Method checking..........')
// })


// set port
app.listen(3000, () => console.log("server started at port number 3000"))

