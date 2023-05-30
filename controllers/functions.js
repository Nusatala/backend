const jwt = require("jsonwebtoken");

const jwt_payload = async () => {
    const token = req.get("Authorization");
    const result = jwt.verify(token, config.SECRET_KEY);
    return result;
}


module.exports = {
    jwt_payload
}