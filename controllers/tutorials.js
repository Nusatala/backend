const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const getAllTutorials = async (req, res) => {
    try {
        const tutorials = await prisma.tutorials.findMany();
        res.status(200).json({
            message: 'Get data success',
            data: tutorials
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const getTutorialById = async (req, res) => {
    try {
        const {id} = req.params
        const tutorials = await prisma.tutorials.findUnique({
            where: {id: Number(id)}
        })
        if(!tutorials){
            return res.status(404).json({error: 'Data not found'})
        }
        res.status(200).json({
            message: 'Get data success',
            data: tutorials
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const createTutorial = async (req, res) => {
    try {
        const {image_id, link} = req.body
        const tutorials = await prisma.tutorials.create({
            data: {
                image_id: image_id,
                link: link
            }
        })
        res.status(201).json({
            message: 'Add data success',
            data: tutorials
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const updateTutorial = async (req, res) => {
    try {
        const {id} = req.params
        const {body} = req
        const tutorials = await prisma.tutorials.update({
            where: {id: Number(id)},
            data: body
        })
        res.status(200).json({
            message: 'Update data success',
            data: tutorials
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const deleteTutorial = async (req, res) => {
    try {
        const {id} = req.params
        const tutorials = await prisma.tutorials.delete({
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
    getAllTutorials,
    getTutorialById,
    createTutorial,
    updateTutorial,
    deleteTutorial
}