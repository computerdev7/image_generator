import Auth from "../models/authModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// build rate-limiter while learning from chatgpt....
export async function signup(req, res) {
    let { username, password } = req.body
    let checkSpc = /[@#$%&*^]/;
    let checkD = /\d/;
    let checkSpaceUsername = /\s/.test(username)
    let checkSpacePassword = /\s/.test(password)
    try {

        let data = await Auth.find({ username: username })

        if (username.length < 5 || username.length > 10 || password.length < 5) {
            return res.status(403).json({ message: 'username or password length are inappropiate' })
        } else if (!checkSpc.test(username) || !checkD.test(username)) {
            return res.status(403).json({ message: 'the username should have have any special charachter or a number' })
        } else if (data.length != 0) {
            return res.status(403).json({ message: 'username is taken' })
        } else if (checkSpaceUsername || checkSpacePassword) {
            return res.status(403).json({ message: 'there are space or spaces in username or password' })
        }
        let saltRounds = 10
        let hashPassword = await bcrypt.hash(password, saltRounds)

        let createNew = new Auth({
            username : username,
            password : hashPassword
        })

        let saveNew = await createNew.save();

        res.status(200).json({ message: saveNew })
    } catch (err) {
        res.status(500).json({ message: err })
    }

}

export async function login(req, res) {
    let { username, password } = req.body
    let checkSpc = /[@#$%&*^]/;
    let checkD = /\d/;
    try {

        let findUser = await Auth.find({username : username})
        console.log(findUser)
        let checkPassword = await bcrypt.compare(password,findUser[0].password)
        console.log(checkPassword)

        if (username.length < 5 || username.length > 10 || password.length < 5) {
            return res.status(403).json({ message: 'username or password length dont match' })
        } else if (!checkSpc.test(username) || !checkD.test(username)) {
            return res.status(403).json({ message: 'the username may not have any special charachter or a number' })
        } else if(findUser.length == 0){
            return res.status(403).json({message : 'invalid username'})
        } else if(!checkPassword){
            return res.status(403).json({message : 'password not matched'})
        }

        let token =  jwt.sign({ username: username }, process.env.SECRET, { expiresIn: '1h' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })
            
        res.status(200).json({ message: username, password })
    } catch (err) {
        res.status(500).json({message : err})
    }

}