const db = require('./db')
// import db.js

const jwt = require("jsonwebtoken")

//Import jsonwebtoken


// userDetails = {
//     1001: { acno: 1001, username: "anju", password: 1231, balance: 0, transaction: [] },
//     1002: { acno: 1002, username: "amal", password: 1232, balance: 0, transaction: [] },
//     1003: { acno: 1003, username: "arun", password: 1233, balance: 0, transaction: [] },
//     1004: { acno: 1004, username: "mega", password: 1234, balance: 0, transaction: [] }
// }

// express do not accept normal functions, it only accpets arrow function
// thus we have to convert normal funtion into arrow function

register = (acno, uname, psw) => {
    // findONe is an asynchronous request, so to get its response we need to use Promise method
    // hence we use '.then()' to get the true output ('then' accpets only call back function)
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                statusCode: 401,
                status: false,
                message: "user already exist"
            }
        } else {
            const newuser = new db.User({
                acno,
                username: uname,
                password: psw,
                balance: 0,
                transaction: []
            })
            newuser.save()

            return {
                statusCode: 200,
                status: true,
                message: "registeration success"
            }
        }
    })
    // if (acno in userDetails) {
    //     return {
    //         statusCode: 401,
    //         status: false,
    //         message: "user already exist"
    //     }
    // } else {
    //     userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }
    //     console.log(userDetails);
    //     return {
    //         statusCode: 200,
    //         status: true,
    //         message: "registeration success"
    //     }
    // }
}

login = (acno, psw) => {
    return db.User.findOne({ acno, psw }).then(user => {
        if (user) {
            const token = jwt.sign({ currentAcno: acno }, 'secretkey123')
            return {
                statusCode: 200,
                status: true,
                message: "Login Success",
                currentAcno:acno,
                currentUser:user.username,
                token
            }
        } else {
            return {
                statusCode: 401,
                status: false,
                message: "Incorrect Acno. or password"
            }
        }

    })
}

deposit = (acno, password, amount) => {

    var amnt = parseInt(amount)
    return db.User.findOne({ acno, password }).then(user => {
        if (user) {
            user.balance += amnt
            user.transaction.push({ type: 'CREDIT', amount: amnt })
            user.save()

            return {

                statusCode: 200,
                status: true,
                message: `${user.balance}`
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: "Incorrect Acno. or Password"
            }
        }
    })

}

withdraw = (acno, password, amount) => {

    var wit = parseInt(amount)
    return db.User.findOne({ acno, password }).then(user => {
        if (user) {
            if (wit < user.balance) {
                user.balance -= wit
                user.transaction.push({ type: 'DEBIT', amount: wit })
                user.save()

                return {

                    statusCode: 200,
                    status: true,
                    message: user.balance
                }
            } else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "Insufficient balance"
                }
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: "Incorrect Acno. or Password"
            }
        }

    })

}

gettransaction = (acno) => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                statusCode: 200,
                status: true,
                message: user.transaction
            }
        } else {
            return {
                statusCode: 401,
                status: false,
                message: "Incorrect ac. no"
            }
        }
    })

}

acdelete=(acno)=>{
    return db.User.deleteOne({acno}).then(user=>{
        if(user){
            return{
                statusCode: 200,
                status: true,
                message: "Account deleted"
            }
        }else{
            return {
                statusCode: 401,
                status: false,
                message: "Incorrect Account"
            }
        }
    })
}

module.exports = {
    register,
    login,
    deposit,
    withdraw, gettransaction,
    acdelete
}