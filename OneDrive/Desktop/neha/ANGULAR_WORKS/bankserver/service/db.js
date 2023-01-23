// Server mdb integration

// 1. import mongoose
const mongoose= require("mongoose")

// 2. State connection string via mongoose
mongoose.connect('mongodb://localhost:27017/bankServer',{useNewUrlParser:true})

// 3. Define a bank database Model ( data inside the singluarform of model name-users component 'user' is {schema} inside schema we giv the datatype for data)
const User=mongoose.model('User',{
    acno: Number, 
    username: String, 
    password: Number, 
    balance: Number, 
    transaction: []
})

// 4. Finally export the schema to use it in other files

        //we need to export it from where it is created(using '.exports{}') so as to used in other places

module.exports={
    User
}