const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

// POST request that handles register
const registerUser = async (req, res) => {
    const {name, username, email, password, role, photo} = req.body
    
    // Validate if email/username exist in our database
    const emailCheck = await prisma.users.findFirst({
        where: {
            email: email
        },
    });
    
    // Validate if username exist in our database
    const usernameCheck = await prisma.users.findFirst({
        where: {
            username: username
        },
    });

    if(usernameCheck||emailCheck){
        res.status(409).json({message: "The email or username you use already exist"})
    } else{
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.users.create({
            data: {
              name: name,
              email: email,
              username: username,
              password: hashedPassword,
              role: 2,
              photo: photo
            },
        })
    
        res.status(201).json(user)
    }
}


// POST request that handles login
const loginUser = async (req, res, next) => {
    try {
        const {username, password} = req.body
        
        if(!(username&&password)){
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const user = await prisma.users.findFirst({
            where: {
                username: username
            },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user.id, username },
                process.env.SECRET_KEY,
                { expiresIn: "12h", }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        } else{
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}


module.exports = {
    registerUser,
    loginUser
}