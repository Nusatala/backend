const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const getAllArticles = async (req, res) => {
    try {
        const articles = await prisma.articles.findMany()
        res.status(200).json({
            message: 'Get data success',
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const getArticleById = async (req, res) => {
    const {id} = req.params
    try {
        const articles = await prisma.articles.findUnique({
            where: {id: Number(id)}
        })
        res.status(200).json({
            message: 'Get data success',
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const createArticle = async (req, res) => {
    const {user_id, image_id, tutorial_id, title, asal_daerah, history, bahan_pembuatan, sources, views} = req.body
    try {
        const articles = await prisma.articles.create({
            data: {
                user_id: user_id,
                image_id: image_id,
                tutorial_id: tutorial_id,
                title: title,
                asal_daerah: asal_daerah,
                history: history,
                bahan_pembuatan: bahan_pembuatan,
                sources: sources,
                views: views
            }
        })
        res.status(200).json({
            message: 'Add data success',
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const updateArticle = async (req, res) => {
    const {id} = req.params
    const {body} = req
    try {
        const articles = await prisma.articles.update({
            where: {id: Number(id)},
            data: body
        })
        res.status(200).json({
            message: 'Update data success',
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

const deleteArticle = async (req, res) => {
    const {id} = req.params
    try {
        const articles = await prisma.articles.delete({
            where: {id: Number(id)}
        })
        res.status(200).json({
            message: 'Delete data success'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error
        })
    }
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
}