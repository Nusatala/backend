const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient

const getTestimonials = async (req, res) => {
    try {
        const testimonials = await prisma.testimonials.findMany()
        return res.status(200).json({
            data: testimonials
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}
const getById = async (req, res) => {
    try {
        const {id} = req.params
        const testimonials = await prisma.testimonials.findUnique({
            where: {id: parseInt(id)}
        })
        if(!testimonials){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        return res.status(200).json({
            data: testimonials
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const createTestimonial = async (req, res) => {
    try {
        const {testimony} = req.body
        let {rating} = req.body
        rating = parseFloat(rating)
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const testimonials = await prisma.testimonials.create({
            data: {
                user_id: jwt_payload.user_id,
                testimony: testimony,
                rating: rating
            }
        })
        return res.status(201).json({
            data: testimonials
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        }) 
    }
}

const updateTestimonial = async (req, res) => {
    try {
        const {id} = req.params
        const {testimony} = req.body
        let {rating} = req.body
        rating = parseFloat(rating)
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const testimonials = await prisma.testimonials.update({
            where: {id: parseInt(id)},
            data: {
                user_id: jwt_payload.user_id,
                testimony: testimony,
                rating: rating
            }
        })
        return res.status(200).json({
            data: testimonials
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const deleteTestimonial = async (req, res) => {
    try {
        const {id} = req.params
        const testimonials = await prisma.testimonials.findUnique({
            where: {id: parseInt(id)}
        })
        if(!testimonials){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        await prisma.testimonials.update({
            where: {id: parseInt(id)},
            data:{
                user_id: null
            }
        })
        await prisma.testimonials.delete({
            where: {id: parseInt(id)}
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
    getTestimonials,
    getById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
}