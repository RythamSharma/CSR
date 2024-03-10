import { User } from "../models/User.model.js";


const getusers = async (req,res)=>{
    try {
        const users = await User.find();
        if(users){
            res.status(200).send(users)
        }
        else{
            res.status(400).send("error occured")
        }
    } catch (error) {
        console.log(error)
    }
}
const createUser = async(req,res)=>{
    try {
        const user = req.body;
        const newUser = await User.create(user);
        if(newUser){
            res.status(200).json({ message:"success", newUser})
        }
        else{
            res.status(400).json({message:"error occured"})
        }
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async(req,res)=>{
    try {
        const {name,age,place} = req.body;
        const userId = req.params.id;
        if(!userId){
            return res.status(401).send("user id required")
        }
        const user = await User.findOne({_id: userId})
        if(age){
            user.age=age
        }
        if(place){
            user.place = place;
        }
        if(name){
            user.name = name;
        }
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
    }
}


const deleteUser = async (req,res)=>{
    try {
        const userId = req.params.id;
        const deleteduser = await User.findByIdAndDelete(userId);
        if(deleteduser){
            res.status(200).json({status:"success"})
        }
        else{
            res.status(404).send("gaddari karbe")
        }
    } catch (error) {
        res.status(401).send(error)
    }
}


export {createUser, getusers, updateUser,deleteUser}