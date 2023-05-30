const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client')
const jwt_token = require('../middleware/auth')

const prisma = new PrismaClient()

// POST request that handles register
const postQuizzes = async (req, res) => {
    const {level} = req.params;
    const {title, thumbnail, total_questions} = req.body
    
    const user = await prisma.quizzes.create({
        data: {
          title: title,
          thumbnail: thumbnail,
          level: level,
          user_id: jwt_token.user_id,
          total_questions: total_questions
        },
    })
    
    res.status(201).json(user)
}


module.exports = {
    getQuizzes,
    postQuizzes
}