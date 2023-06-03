const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient

const getTestimonials = async (req, res) => {
    try {
        const testimonials = await prisma.testimonials.findMany()
        res.status(200).json({
            message: 'Get data success',
            data: testimonials
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}
const getById = async (req, res) => {
    const {id} = req.params
    try {
        const testimonials = await prisma.testimonials.findUnique({
            where: {id: Number(id)}
        })
        res.status(200).json({
            message: 'Data found',
            data: testimonials
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const createTestimonial = async (req, res) => {
    try {
        const {testimony, rating} = req.body
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const testimonials = await prisma.testimonials.create({
            data: {
                user_id: jwt_payload.user_id,
                testimony: testimony,
                rating: rating
            }
        })
        res.status(201).json({
            message: 'Add data success',
            data: testimonials
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        }) 
    }
}

const updateTestimonial = async (req, res) => {
    try {
        const {id} = req.params
        const {testimony, rating} = req.body
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const testimonials = await prisma.testimonials.update({
            where: {id: Number(id)},
            data: {
                user_id: jwt_payload.user_id,
                testimony: testimony,
                rating: rating
            }
        })
        res.status(200).json({
            message: 'Update data successful',
            data: testimonials
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const deleteTestimonial = async (req, res) => {
    try {
        const {id} = req.params
        const testimonials = await prisma.testimonials.delete({
            where: {id: Number(id)}
        })
        res.status(200).json({
            message: 'Delete data success'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            serverMessage: error
        })
    }
}

module.exports = {
    getTestimonials,
    getById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
}