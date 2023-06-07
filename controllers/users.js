const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { nanoid } = require('nanoid');

const prisma = new PrismaClient()

const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    }
}
const transporter = nodemailer.createTransport(config);

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

const changePass1 = async (req, res) => {
    try{
        const {email} = req.body;
        const emailCheck = await prisma.users.findFirst({
            where: {
                email: email
            },
        });

        if(!emailCheck){
            return res.send({message: "Email doesn't exist"})
        }
        const tokenExist = await prisma.password_resets.findFirst({
            where: {
                user_id: emailCheck.id
            }
        })
        if(tokenExist){
            await prisma.password_resets.deleteMany({
                where: {
                    user_id: emailCheck.id
                }
            })
        }
        const token = nanoid(20)
        
        await prisma.password_resets.create({
            data: {
                user_id: emailCheck.id,
                token: token
            }
        })
        const data = {
            "from": `${process.env.EMAIL}`,
            "to": `${email}`,
            "subject": "Change Password Link",
            "text": `Please visit this URL: ${process.env.URL}/users/change-password/${token}`,
        }
        transporter.sendMail(data, (err, info) => {
            if(err) {
                console.log(err);
            } else {
                return res.send(info.response);
            }
        });
    } catch (err) {
        res.status(500).send({ "error": `${err}` })
    }
}
const changePass2 = async (req, res) => {
    try{
        const reset_pwd_token = req.params.token;
        const {currentPassword} = req.body;
        let {newPassword} = req.body;

        const userFromToken = await prisma.password_resets.findFirst({
            where: {
                token: reset_pwd_token
            }
        })

        if(!userFromToken){
            return res.status(400).json({ "message": "Your reset password token is invalid"})
        }
        
        if(!(currentPassword&&newPassword)){
            return res.status(400).json({ "message": "All inputs is required"})
        }

        const readUser = await prisma.users.findUnique({
            where: {
                id: userFromToken.user_id
            },
        });

        if((await bcrypt.compare(currentPassword, readUser.password))){
            newPassword = await bcrypt.hash(newPassword, 10)
            const user = await prisma.users.update({
                where: {
                    id: userFromToken.user_id
                },
                data: {
                    password: newPassword
                },
            });
            await prisma.password_resets.deleteMany({
                where: {
                    user_id: userFromToken.user_id
                }
            })
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
    changePass1,
    changePass2,
    logout,
    deleteUser
}