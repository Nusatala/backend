const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

const getAllImages = async (req, res) => {
    try {
        const images = await prisma.images.findMany();
        return res.status(200).json({
            data: images
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
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
        return res.status(200).json({
            data: images
        })
        
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const getImageById = async (req, res) => {
    try {
        const {id} = req.params
        const images = await prisma.images.findUnique({
            where: {id: Number(id)}
        })
        if(!images){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        return res.status(200).json({
            data: images
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
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
        return res.status(201).json({
            data: images
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
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
        return res.status(200).json({
            data: images
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const deleteImage = async (req, res) => {
    try {
        const {id} = req.params
        const images = await prisma.images.findUnique({
            where: {id: Number(id)}
        })
        if(!images){
            return res.status(404).json({
                message: 'Data not found'
            })
        }
        await prisma.images.update({
            where: {id: Number(id)},
            data:{
                user_id: null
            }
        })
        await prisma.images.delete({
            where: {id: Number(id)}
        })
        return res.status(200).json({
            message: 'Delete data success',
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
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