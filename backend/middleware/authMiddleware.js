import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";

async function protectFunction(req, res, next){
    let token;

    if(req.headers.authorization &&  req.headers.authorization.startsWith("Bearer") ){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.SECRET);
            req.user = await User.findById(decode.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Authorization failed");
        }
    } 
    if(!token){
        res.status(401);
        throw new Error("No token found");
    }
}

const protect = asyncHandler(protectFunction);

export {protect};