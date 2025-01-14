const User= require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require ('../errors')
const bcrypt =require('bcryptjs')

const register= async (req , res) => {
    const {name , email , password} = req.body

    
    const salt = await bcrypt.genSalt(10) ;
    const hasshedPassword = await bcrypt.hash(password, salt)

    const tempUser = {name , email, password:hasshedPassword } 

    const user = await User.create({ ...tempUser })
    


if (!name || !email ||!password){
    throw new BadRequestError('Please provide name, email and password')
}
  console.log("email checked")
  res.status(StatusCodes.CREATED).json({user}) ;

 
}


const login = async (req , res ) =>{
    res.send(' login user')
}

module.exports = {register , login ,}