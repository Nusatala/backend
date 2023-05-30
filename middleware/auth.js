const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const config = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.get("Authorization");
  
  if (!token) {
    return res.status(403).json({message: "Token is required for authentication"});
  }
  try {
    let user = jwt.verify(token, config.SECRET_KEY);
    // User Id check
    let idCheck = await prisma.users.findUnique({
      where: {
          id: user.user_id
      }
    })
    if(!idCheck){
      return res.status(400).json({ message: `There is no user with username ${user.username}`})
    }
  } catch (err) {
    return res.status(401).json({message: "Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;