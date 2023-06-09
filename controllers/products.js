const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()

// POST request that handles products
const postProducts = async (req, res) => {
    try{
        const {name, thumbnail, description, link} = req.body;
        const label_id = parseInt(req.body.label_id)
        let {price, rating} = req.body;
        price = parseInt(price);
        rating = parseFloat(rating);
        const token = req.get('Authorization');
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY);

        const product = await prisma.products.create({
            data: {
                user_id: jwt_payload.user_id,
                label_id: label_id,
                name: name,
                thumbnail: thumbnail,
                description: description,
                price: price,
                link: link,
                rating: rating
            },
        });

        return res.status(201).json(product);
    }catch (err) {
        return res.status(500).send({ "error": `${err}` });
    }
};

const getAllProducts = async (req, res) => {
    try{
        const products = await prisma.products.findMany({
        });
        return res.status(200).json(products);
    }catch (err) {
        return res.status(500).send({ "error": `${err}` });
    }
};

const getAllProductsByLabel = async (req, res) => {
    try{
        const label_id = parseInt(req.params.id)
        const products = await prisma.products.findMany({
            where:{
                label_id: label_id
            }
        });
        return res.status(200).json(products);
    }catch (err) {
        return res.status(500).send({ "error": `${err}` });
    }
};

const getProductById = async (req, res) => {
    try{
        const products = await prisma.products.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(200).json(products);
    }catch (err) {
        return res.status(500).send({ "error": `${err}` });
    }
};

const putProducts = async (req, res) => {
    try{
        const {name, thumbnail, description, link} = req.body;
        let {price, label_id, rating} = req.body;
        price = parseInt(price);
        label_id = parseInt(label_id);
        rating = parseFloat(rating);
        const id = parseInt(req.params.id);
        const token = req.get('Authorization');
        const jwt_payload = jwt.verify(token, process.env.SECRET_KEY);

        //Generate new datetime
        const dateTimeNow = new Date(Date.now()).toISOString();
        const product = await prisma.products.update({
            where: {
              id: id,
            },
            data: {
                user_id: jwt_payload.user_id,
                label_id: label_id,
                name: name,
                thumbnail: thumbnail,
                description: description,
                price: price,
                link: link,
                rating: rating,
                updated_at: dateTimeNow
            },
        });

        return res.status(200).json(product);
    }catch (err) {
        return res.status(500).send({ "error": `${err}` });
    }
};

const deleteProducts = async (req, res) => {
    try{
        const id = parseInt(req.params.id);

        const product = await prisma.products.findUnique({
            where: {
                id: id
            }
        });
        if(!product){
            return res.status(404).json({ message: `Product with id ${id} not found in the server` })
        }
        await prisma.products.delete({
            where: {
                id: id
            }
        });
    
        return res.status(200).json({ message: `Product with id ${id} successfuly deleted` });
    }catch (err) {
        return res.status(500).send({ "error": `${err}` });
    }
};
module.exports = {
    postProducts,
    getAllProducts,
    getAllProductsByLabel,
    getProductById,
    putProducts,
    deleteProducts
};