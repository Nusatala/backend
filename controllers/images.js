const {PrismaClient} = require('@prisma/client')
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
    const {label} = req.params
    try {
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
    const {id} = req.params
    try {
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
    const {image, label, user_id} = req.body
    try {
        const images = await prisma.images.create({
            data: {
                image: image,
                label: label,
                user_id: user_id
            }
        })
        res.status(200).json({
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
    const {id} = req.params
    const {body} = req
    try {
        const images = await prisma.images.update({
            where: {id: Number(id)},
            data: body
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
    const {id} = req.params
    try {
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