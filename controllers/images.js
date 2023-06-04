const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

const getAllImages = async (req, res) => {
    try {
        const images = await prisma.images.findMany();
        res.status(200).json({
            message: 'Get data success',
            data: images
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}
const getTwoImages = async (req, res) => {
    try {
        const {label} = req.params
        const images = await prisma.images.findMany({
            where: {label: label},
            take: 2
        })
        res.status(200).json({
            message: 'Get data success',
            data: images
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const getImageById = async (req, res) => {
    try {
        const {id} = req.params
        const images = await prisma.images.findUnique({
            where: {id: Number(id)}
        })
        res.status(200).json({
            message: 'Get data success',
            data: images
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const createImage = async (req, res) => {
    try {
        const {image, label} = req.body
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const images = await prisma.images.create({
            data: {
                user_id: jwt_payload.user_id,
                image: image,
                label: label
            }
        })
        res.status(201).json({
            message: 'Add data success',
            data: images
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const updateImage = async (req, res) => {
    try {
        const {id} = req.params
        const {image, label} = req.body
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const images = await prisma.images.update({
            where: {id: Number(id)},
            data: {
                user_id: jwt_payload.user_id,
                label: label,
                image: image
            }
        })
        res.status(200).json({
            message: 'Update data success',
            data: images
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const deleteImage = async (req, res) => {
    try {
        const {id} = req.params
        const images = await prisma.images.delete({
            where: {id: Number(id)}
        })
        res.status(200).json({
            message: 'Delete data success',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

module.exports = {
    getAllImages,
    getTwoImages,
    getImageById,
    createImage,
    updateImage,
    deleteImage
}