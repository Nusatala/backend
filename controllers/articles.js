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
        return res.status(200).json({
            data: articles
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const getArticleById = async (req, res) => {
    try {
        const {id} = req.params
        const articles = await prisma.articles.findUnique({
            where: {id: parseInt(id)},
        })
        if(!articles){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        if(articles){
            await counterViews(articles.id)
        }
        return res.status(200).json({
            data: articles
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const createArticle = async (req, res) => {
    try {
        const {image_id, tutorial_id, title, asal_daerah, history, bahan_pembuatan, sources} = req.body
        image_id = parseInt(image_id)
        tutorial_id = parseInt(tutorial_id)
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
        return res.status(201).json({
            data: articles
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const updateArticle = async (req, res) => {
    try {
        const {id} = req.params
        const {image_id, tutorial_id, title, asal_daerah, history, bahan_pembuatan, sources} = req.body
        image_id = parseInt(image_id)
        tutorial_id = parseInt(tutorial_id)
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const articles = await prisma.articles.update({
            where: {id: parseInt(id)},
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
        return res.status(200).json({
            data: articles
        })
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const deleteArticle = async (req, res) => {
    try {
        const {id} = req.params
        const articles = await prisma.articles.findUnique({
            where: {id: parseInt(id)}
        })

        if(!articles){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        await prisma.articles.update({
            where: {id: parseInt(id)},
            data: {
                user_id: null
            }
        })
        await prisma.articles.delete({
            where:{id: parseInt(id)}
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
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
}