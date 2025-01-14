const register= async (req , res) => {
    res.send('register User')
}


const login = async (req , res ) =>{
    res.send(' login user')
}

module.exports = {register , login ,}