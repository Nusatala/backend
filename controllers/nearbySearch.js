const fetch = require('node-fetch');

const nearbySearch = async (req, res) => {
    try{
        const lat = req.query.latitude
        const lng = req.query.longitude
        const location = `${lat}, ${lng}`;
        const radius = '50000';
        const keyword = 'sanggar seni';
        const key = process.env.MAPS_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=${keyword}&key=${key}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        return res.status(200).json({data: data.results});
    } catch(err){
        return res.status(500).send({ "error": `${err}` });
    }
};

module.exports = {
    nearbySearch,
};