const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const getAllTutorials = async (req, res) => {
    try {
        const tutorials = await prisma.tutorials.findMany();
        return res.status(200).json({
            tutorials
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const getTutorialById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const tutorials = await prisma.tutorials.findUnique({
            where: {id: id}
        })
        if(!tutorials){
            return res.status(404).json({message: 'Data Not Found'})
        }
        return res.status(200).json({
            tutorials
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const createTutorial = async (req, res) => {
    try {
        const {link} = req.body
        let {image_id} = req.body
        image_id = parseInt(image_id)
        const tutorials = await prisma.tutorials.create({
            data: {
                image_id: image_id,
                link: link
            }
        })
        return res.status(201).json({
            tutorials
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const updateTutorial = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {link} = req.body
        let {image_id} =req.body
        image_id = parseInt(image_id)
        const tutorials = await prisma.tutorials.update({
            where: {id: id},
            data: {
                image_id: image_id,
                link: link
            }
        })
        return res.status(200).json({
            tutorials
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const deleteTutorial = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const tutorials = await prisma.tutorials.findUnique({
            where: {id: id}
        })
        if(!tutorials){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        await prisma.tutorials.delete({
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
    getAllTutorials,
    getTutorialById,
    createTutorial,
    updateTutorial,
    deleteTutorial
}