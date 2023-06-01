const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET request that get all the quizzes
const getQuizzes = async (req, res) => {
    try{
        const quizzes = await prisma.quizzes.findMany({
        });
        return res.status(200).json(quizzes);
    }catch (err) {
        return res.status(500).send({ "error": `${err}` });
    };
};

// POST request that handles register
const postQuizzes = async (req, res) => {
    const {level} = req.params;
    const {thumbnail} = req.body;
    let {total_question} = req.body;
    total_question = parseInt(total_question);
    
    const token = req.get("Authorization");
    const jwt_payload = jwt.verify(token, process.env.SECRET_KEY);

    const quizzes = await prisma.quizzes.create({
        data: {
          thumbnail: thumbnail,
          level: level,
          status: true,
          user_id: jwt_payload.user_id,
          total_question: total_question,
        },
    });
    
    return res.status(201).json(quizzes);
};

const getQuestions = async (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    const questions = await prisma.quiz_questions.findUnique({
        where: {
            id: id
        }
    })
    if(!questions){
        return res.status(404).json({ message: `There is no question with id ${id}`})
    }
    return res.status(200).json(questions);
};

const postQuestions = async (req, res) => {
    const {level} = req.params;
    const {question_image, question_text, option1, option2, option3, option4, real_answer} = req.body;
    let {total_question} = req.body;
    total_question = parseInt(total_question);
    
    const quizzes = await prisma.quizzes.findFirst({
        where: {
            level: level
        }
    });

    if(question_image){
        const questions = await prisma.quiz_questions.create({
            data: {
                quiz_id: quizzes.id,
                question_image: question_image,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                real_answer: real_answer,
                status: true,
            },
        });
        return res.status(201).json(questions);
    }
    if(question_text){
        const questions = await prisma.quiz_questions.create({
            data: {
                quiz_id: quizzes.id,
                question_text: question_text,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                real_answer: real_answer,
                status: true,
            },
        });
        return res.status(201).json(questions);
    };
    return res.status(400).json();
};

const putQuestions = async (req, res) => {
    let {id} = req.params;
    id = parseInt(id)

    const {question_image, question_text, option1, option2, option3, option4, real_answer} = req.body;
    let {total_question} = req.body;
    total_question = parseInt(total_question);
    const dateTimeNow = new Date(Date.now()).toISOString();

    if(question_image){
        const questions = await prisma.quiz_questions.update({
            where: {
                id: id
            },
            data: {
                question_image: question_image,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                real_answer: real_answer,
                status: true,
                updated_at: dateTimeNow
            },
        });
        return res.status(200).json(questions);
    }
    if(question_text){
        const questions = await prisma.quiz_questions.update({
            where: {
                id: id
            },
            data: {
                question_text: question_text,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                real_answer: real_answer,
                status: true,
                updated_at: dateTimeNow
            },
        });
        return res.status(200).json(questions);
    }
    return res.status(400).json();
};

const deleteQuestions = async (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    const questions = await prisma.quiz_questions.delete({
        where: {
            id: id
        }
    })

    return res.status(200).json({message: `Question with id ${id} has been deleted`});
};

module.exports = {
    getQuizzes,
    postQuizzes,
    getQuestions,
    postQuestions,
    putQuestions,
    deleteQuestions
}