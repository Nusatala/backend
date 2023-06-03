const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
const jwt = require('jsonwebtoken')

const createFaq = async (req, res) => {
    try {
        const { question, answer} = req.body
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const faqs = await prisma.faqs.create({
            data: {
                user_id: jwt_payload.user_id,
                question: question,
                answer: answer
            }
        })
        res.status(201).json({
            message: 'Add Data success',
            data: faqs
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const getFaqs = async (req, res) =>{
    try {
        const faqs = await prisma.faqs.findMany()
        res.status(200).json({
            message: 'Get data success',
            data: faqs
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const getById = async (req, res) =>{
    try {
        const {id} = req.params
        const faqs = await prisma.faqs.findUnique({
            where: {id: Number(id)}
        })
        res.status(200).json({
            message: 'Data found',
            data: faqs
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const UpdateFaq = async (req, res) => {
    try {
        const {id} = req.params
        const {question, answer} = req.body
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const faqs = await prisma.faqs.update({
            where: {id: Number(id)},
            data: {
                user_id: jwt_payload.user_id,
                question: question,
                answer: answer
            }
        })
        res.status(200).json({
            message: 'Update data successful',
            data: faqs
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const deleteFaq = async (req, res) => {
    try {
        const {id} = req.params
        const faqs = await prisma.faqs.delete({
            where:{id: Number(id)}
        })
        res.status(200).json({
            message: 'Delete data success'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

module.exports = {
    createFaq, 
    getFaqs, 
    getById, 
    UpdateFaq, 
    deleteFaq
}