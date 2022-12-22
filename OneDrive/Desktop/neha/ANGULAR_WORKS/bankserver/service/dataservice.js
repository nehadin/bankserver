const jwt = require("jsonwebtoken")

//Import jsonwebtoken


userDetails = {
    1001: { acno: 1001, username: "anju", password: 1231, balance: 0, transaction: [] },
    1002: { acno: 1002, username: "amal", password: 1232, balance: 0, transaction: [] },
    1003: { acno: 1003, username: "arun", password: 1233, balance: 0, transaction: [] },
    1004: { acno: 1004, username: "mega", password: 1234, balance: 0, transaction: [] }
}

// express do not accept normal functions, it only accpets arrow function
// thus we have to convert normal funtion into arrow function

register = (acno, uname, psw) => {
    if (acno in userDetails) {
        return {
            statusCode: 401,
            status: false,
            message: "user already exist"
        }
    } else {
        userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }
        console.log(userDetails);
        return {
            statusCode: 200,
            status: true,
            message: "registeration success"
        }
    }
}

login = (acno, psw) => {

    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            const token=jwt.sign({currentAcno:acno},'secretkey123')
            return {
                statusCode: 200,
                status: true,
                message: "Login Success",
                token
            }
        } else {
            return {
                statusCode: 401,
                status: false,
                message: "Incorrect password"
            }
        }
    } else {
        return {
            statusCode: 401,
            status: false,
            message: "Account no. not found"
        }
    }
}

deposit = (acno, password, amount) => {

    var amnt = parseInt(amount)
    if (acno in userDetails) {
        if (password == userDetails[acno]["password"]) {
            userDetails[acno]["balance"] += amnt
            userDetails[acno]['transaction'].push({ type: 'CREDIT', amount: amnt })

            return {

                statusCode: 200,
                status: true,
                message: userDetails[acno]["balance"]
            }
        } else {
            return {
                statusCode: 401,
                status: false,
                message: "Incorrect Password"
            }
        }
    } else {
        return {
            statusCode: 401,
            status: false,
            message: "Account not found"
        }
    }
}

withdraw = (acno, password, amount) => {

    var wit = parseInt(amount)
    if (acno in userDetails) {
        if (password == userDetails[acno]["password"]) {
            if (wit <= userDetails[acno]["balance"]) {
                userDetails[acno]["balance"] -= wit
                userDetails[acno]["transaction"].push({ type: 'DEBIT', amount: wit })
                return {

                    statusCode: 200,
                    status: true,
                    message: userDetails[acno]["balance"]
                }
            } else {
                // alert('Insufficient balance')
                return {
                    statusCode: 401,
                    status: false,
                    message: "Insufficient balance"
                }
            }
        } else {
            // alert('Incorrect Password')
            return {
                statusCode: 401,
                status: false,
                message: vok
            }
        }
    }
    else {
        alert("Incorrect Ac. No.")
        return {
            statusCode: 401,
            status: false,
            message: "Incorrect ac. no"
        }
    }
}

gettransaction = (acno) => {
    if (acno in userDetails) {
        return {
            statusCode: 200,
            status: true,
            message: userDetails[acno]["transaction"]
        }
    } else {
        return {
            statusCode: 401,
            status: false,
            message: "Incorrect ac. no"
        }
    }
}
module.exports = {
    register,
    login,
    deposit,
    withdraw, gettransaction
}