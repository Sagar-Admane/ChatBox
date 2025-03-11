import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

function generateToken(id){
    return jwt.sign({id}, process.env.SECRET,{
        expiresIn : "30d",
    });
}

export default generateToken;