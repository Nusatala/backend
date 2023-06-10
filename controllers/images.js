const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

const getAllImages = async (req, res) => {
    try {
        const images = await prisma.images.findMany();
        return res.status(200).json(images)
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
        return res.status(200).json(images)
        
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const getImageById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const images = await prisma.images.findUnique({
            where: {id: id}
        })
        if(!images){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        return res.status(200).json(images)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const createImage = async (req, res) => {
    try {
        const {image} = req.body
        let {label_id} = parseInt(req.body.label_id)
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const images = await prisma.images.create({
            data: {
                user_id: jwt_payload.user_id,
                label_id: label_id,
                image: image,
            }
        })
        return res.status(201).json(images)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const updateImage = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {image} = req.body
        let {label_id} = parseInt(req.body.label_id)
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const images = await prisma.images.update({
            where: {id: id},
            data: {
                user_id: jwt_payload.user_id,
                label_id: label_id,
                image: image
            }
        })
        return res.status(200).json(images)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const deleteImage = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const images = await prisma.images.findUnique({
            where: {id: id}
        })
        if(!images){
            return res.status(404).json({
                message: 'Data not found'
            })
        }
        await prisma.images.update({
            where: {id: id},
            data:{
                user_id: null
            }
        })
        await prisma.images.delete({
            where: {id: id}
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