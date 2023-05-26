const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// POST request that handles register
const registerUser = async (req, res) => {
    const {name, username, email, password, role, photo} = req.body
    
    const user = await prisma.users.create({
        data: {
          name: name,
          email: email,
          username: username,
          password: password,
          role: role,
          photo: photo
        },
    })

    res.status(200).json(user)
}



module.exports = {
    registerUser
}