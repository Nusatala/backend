const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

//function counter views
const counterViews = async (id) => {
    await prisma.articles.update({
        where: {id: parseInt(id)},
        data: {views: {increment: 1}}
    })
}

const getAllArticles = async (req, res) => {
    try {
        const articles = await prisma.articles.findMany()
        const articlesData = await Promise.all(articles.map(async article => {
            const image = await prisma.images.findUnique({
                where: {
                    id: article.image_id
                }
            })
            return {
                ...article,
                image: image
            }
        }))
        return res.status(200).json(articlesData)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const getArticleByCreated = async (req, res) => {
    try {
        const articles = await prisma.articles.findMany({
            orderBy:{
                created_at: 'desc'
            },
            take: 5
        })
        const articlesData = await Promise.all(articles.map(async article => {
            const image = await prisma.images.findUnique({
                where: {
                    id: article.image_id
                }
            })
            return {
                ...article,
                image: image
            }
        }))
        return res.status(200).json(articlesData)
    } catch (error) {
        return res.status(200).json({
            'error': `${error}`
        })
    }
}

const getArticleByViews = async (req, res) => {
    try {
        const articles = await prisma.articles.findMany({
            orderBy: {
                views: 'desc'
            },
            take: 5
        })
        const articlesData = await Promise.all(articles.map(async article => {
            const image = await prisma.images.findUnique({
                where: {
                    id: article.image_id
                }
            })
            return {
                ...article,
                image: image
            }
        }))
        return res.status(200).json(articlesData)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const getArticleByLabelId = async (req, res) => {
    try {
        const label_id = parseInt(req.params.label_id)
        const articles = await prisma.articles.findFirst({
            where: {label_id: label_id}
        })
        if(!articles){
            return res.status(404).json({
                message: "Data Not Found"
            })
        }
        const image = await prisma.images.findUnique({
            where: {id: articles.image_id}
        })
        const articlesData = {
            ...articles,
            image: image
        }
        return res.status(200).json(articlesData)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const getArticleById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const articles = await prisma.articles.findUnique({
            where: {id: id},
        })
        if(!articles){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        const image = await prisma.images.findUnique({
            where: {id: articles.image_id}
        })
        const articlesData = {
            ...articles,
            image: image
        }
        await counterViews(articles.id)
        return res.status(200).json(articlesData)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const createArticle = async (req, res) => {
    try {
        const {image_id, tutorial_id, label_id, title, asal_daerah, history, bahan_pembuatan, sources} = req.body
        image_id = parseInt(image_id)
        tutorial_id = parseInt(tutorial_id)
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const articles = await prisma.articles.create({
            data: {
                user_id: jwt_payload.user_id,
                image_id: image_id,
                tutorial_id: tutorial_id,
                label_id: label_id,
                title: title,
                asal_daerah: asal_daerah,
                history: history,
                bahan_pembuatan: bahan_pembuatan,
                sources: sources,
            }
        })
        return res.status(201).json(articles)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const updateArticle = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {image_id, tutorial_id, label_id, title, asal_daerah, history, bahan_pembuatan, sources} = req.body
        image_id = parseInt(image_id)
        tutorial_id = parseInt(tutorial_id)
        const token = req.get('Authorization')
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY)
        const articles = await prisma.articles.update({
            where: {id: id},
            data: {
                user_id: jwt_payload.user_id,
                image_id: image_id,
                tutorial_id: tutorial_id,
                label_id: label_id,
                title: title,
                asal_daerah: asal_daerah,
                history: history,
                bahan_pembuatan: bahan_pembuatan,
                sources: sources,
            }
        })
        return res.status(200).json(articles)
    } catch (error) {
        return res.status(500).json({
            "error": `${error}`
        })
    }
}

const deleteArticle = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const articles = await prisma.articles.findUnique({
            where: {id: id}
        })

        if(!articles){
            return res.status(404).json({
                message: 'Data Not Found'
            })
        }
        await prisma.articles.update({
            where: {id: id},
            data: {
                user_id: null
            }
        })
        await prisma.articles.delete({
            where:{id: id}
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
    getArticleByCreated,
    getArticleByViews,
    getArticleByLabelId,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
}