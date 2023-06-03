const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

//function counter views
const counterViews = async (id) => {
    await prisma.articles.update({
        where: {id: Number(id)},
        data: {views: {increment: 1}}
    })
}

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
            serverMessage: error.message
        })
    }
}

const getArticleById = async (req, res) => {
    try {
        const {id} = req.params
        const articles = await prisma.articles.findUnique({
            where: {id: Number(id)},
        })
        if(articles){
            await counterViews(articles.id)
        }
        res.status(200).json({
            message: 'Get data success',
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error.message
        })
    }
}

const createArticle = async (req, res) => {
    try {
        const {image_id, tutorial_id, title, asal_daerah, history, bahan_pembuatan, sources} = req.body
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const articles = await prisma.articles.create({
            data: {
                user_id: jwt_payload.user_id,
                image_id: image_id,
                tutorial_id: tutorial_id,
                title: title,
                asal_daerah: asal_daerah,
                history: history,
                bahan_pembuatan: bahan_pembuatan,
                sources: sources,
            }
        })
        res.status(201).json({
            message: 'Add data success',
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error.message
        })
    }
}

const updateArticle = async (req, res) => {
    try {
        const {id} = req.params
        const {image_id, tutorial_id, title, asal_daerah, history, bahan_pembuatan, sources} = req.body
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const articles = await prisma.articles.update({
            where: {id: Number(id)},
            data: {
                user_id: jwt_payload.user_id,
                image_id: image_id,
                tutorial_id: tutorial_id,
                title: title,
                asal_daerah: asal_daerah,
                history: history,
                bahan_pembuatan: bahan_pembuatan,
                sources: sources,
            }
        })
        res.status(200).json({
            message: 'Update data success',
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error.message
        })
    }
}

const deleteArticle = async (req, res) => {
    try {
        const {id} = req.params
        const articles = await prisma.articles.delete({
            where: {id: Number(id)}
        })
        res.status(200).json({
            message: 'Delete data success'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error.message
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