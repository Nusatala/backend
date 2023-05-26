const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient

const createFaq = async (req, res) => {
    try {
        const {user_id, question, answer} = req.body
        if(!user_id || !question || !answer){
            throw new Error('Data Tidak Boleh Kosong')
        }
        const faqs = await prisma.faqs.create({
            data: {
                user_id: user_id,
                question: question,
                answer: answer
            }
        })
        res.status(200).json({
            message: 'Berhasil input data faq',
            data: faqs
        })
    } catch (error) {
        res.status(400).json({
            message: 'Terjadi Kesalahan',
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
    const {id} = req.params
    try {
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
    const {id} = req.params
    const {body} = req
    try {
        const faqs = await prisma.faqs.update({
            where: {id: Number(id)},
            data: body
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
    const {id} = req.params
    try {
        const faqs = await prisma.faqs.delete({
            where:{id: Number(id)}
        })
        res.status(200).json({
            message: 'Berhasil'
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