const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
const jwt = require('jsonwebtoken')

const createFaq = async (req, res) => {
    try {
        const {question, answer} = req.body
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const faqs = await prisma.faqs.create({
            data: {
                user_id: jwt_payload.user_id,
                question: question,
                answer: answer
            }
        })
        return res.status(201).json(faqs)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const getFaqs = async (req, res) =>{
    try {
        const faqs = await prisma.faqs.findMany()
        return res.status(200).json(faqs)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const getById = async (req, res) =>{
    try {
        const id = parseInt(req.params.id)
        const faqs = await prisma.faqs.findUnique({
            where: {id: id}
        })
        if(!faqs){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        return res.status(200).json(faqs)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const UpdateFaq = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {question, answer} = req.body
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const faqs = await prisma.faqs.update({
            where: {id: id},
            data: {
                user_id: jwt_payload.user_id,
                question: question,
                answer: answer
            }
        })
        return res.status(200).json(faqs)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const deleteFaq = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const faqs = await prisma.faqs.findUnique({
            where:{id: id}
        })
        if(!faqs){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        await prisma.faqs.update({
            where: {id: id},
            data:{
                user_id: null
            }
        })
        await prisma.faqs.delete({
            where: {id: id}
        })
        return res.status(200).json({
            message: 'Delete data success'
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
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