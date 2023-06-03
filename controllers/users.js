const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

// POST request that handles register
const registerUser = async (req, res) => {
    try{
        const {name, username, email, password, photo} = req.body
        
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
                    role_id: 2,
                    photo: photo
                },
            });
        
            res.status(201).json(user);
        }
    } catch (err) {
        res.status(500).send({ "error": `${err}` })
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
                { user_id: user.id, username, role_id: user.role_id },
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

const putUser = async (req, res) => {
    try{
        const {name, photo} = req.body;
        const token = req.get("Authorization");
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY);

        const user = await prisma.users.update({
            where: {
                id: jwt_payload.user_id
            },
            data: {
                name: name,
                photo: photo
            },
        });
        
        return res.status(200).json(user);
    } catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}

const changePass = async (req, res) => {
    try{
        const {currentPassword} = req.body;
        let {newPassword} = req.body;
        const token = req.get("Authorization");
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY);

        if(!(currentPassword||newPassword)){
            return res.status(400).json({ "message": "All inputs is required"})
        }

        const readUser = await prisma.users.findUnique({
            where: {
                id: jwt_payload.user_id
            },
        });
        console.log(currentPassword, readUser.password)
        if((await bcrypt.compare(currentPassword, readUser.password))){
            newPassword = await bcrypt.hash(newPassword, 10)
            const user = await prisma.users.update({
                where: {
                    id: jwt_payload.user_id
                },
                data: {
                    password: newPassword
                },
            });
            return res.status(200).json(user);
        } else{
            return res.status(403).json({ "message": "Your current password is wrong" });
        }
        
    } catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}

const logout = async (req, res) => {
    delete req.headers['Authorization'];
    return res.status(200).json({message: "Logout successful"});
};

const deleteUser = async (req, res) => {
    try{
        const token = req.get("Authorization");
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY);

        const user = await prisma.users.delete({
            where: {
                id: jwt_payload.user_id
            },
        });
        
        return res.status(200).json(user);
    } catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}



module.exports = {
    registerUser,
    loginUser,
    putUser,
    changePass,
    logout,
    deleteUser
}