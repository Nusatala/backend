const healthCheck = async (req, res) => {
    try{
        return res.status(200).json({message: "This Cloud Run is healthy"});
    } catch(err){
        return res.status(500).send({ "error": `${err}` })
    }
};

module.exports = {
    healthCheck
};