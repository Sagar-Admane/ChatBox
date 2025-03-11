import expressHandler from "express-async-handler"
import User from "../model/userModel.js";
import generateToken from "../config/generateToken.js";

async function registerUserFunction(req, res){
    const {name, email, password, pic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the field");
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exist");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            pic : user.pic,
            token : generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create a user");
    }
};

const registerUser = expressHandler(registerUserFunction);

async function authUserFunction(req,res){
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            pic : user.pic,
            token : generateToken(user._id),
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
}

const authUser = expressHandler(authUserFunction);

async function allUserFunction(req, res){
    const keyword = req.query.search ? {
        $or : [
            {name : {$regex : req.query.search, $options : "i"}},
            {email : {$regex : req.query.search, $options : "i"}}
        ]
    } : {};
    const users = await User.find(keyword).find({_id : {$ne : req.user._id}});
    res.send(users);

}

const allUser = expressHandler(allUserFunction);

export {registerUser, authUser, allUser};
