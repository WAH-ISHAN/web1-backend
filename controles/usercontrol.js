import express from 'express';
import  User  from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export function saveUser(req,res){

    if(req.body.UserType == "admin"){
        if(req.UserType == null){
            res.status(403).json({
                message: "Please login as admin befpre creating an admin account"
            });
            return;

        }
        if(req.user.role != "admin"){
            res.status(403).json({
                message: "You are not authorized to create an admin account"
            });
            return;
        }
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        email : req.body.email,
        FirstName : req.body.FirstName,
        LastName : req.body.LastName,
        Password : hashPassword,
        UserType : req.body.UserType
    })




    user.save().then(() => {
        res.json({ message: "User saved" });
    }).catch((error) => {
        console.error("Error in saving user:", error);
        res.status(500).json({ message: "Error in saving user" });
    });
    

}

export function loginUser(req,res){
    const email = req.body.email;
    const password = req.body.password;
    console.log(password);

    User.findOne({
        email : email
    })
    .then((user)=>{
        console.log(user);
        if(user == null){
            res.status(404).json({
                message: "User not found"
            })
        }
        else if(!user.Password) {
            res.json({
                message: "User password not set"
            })
        }
        else{
            const isPasswordCorrect = bcrypt.compareSync(password , user.Password)
            if(isPasswordCorrect){
               const userData ={
                    email : user.email,
                    FristName : user.FristName,
                    LastName : user.LastName,
                    UserType : user.UserType,
                    Phone : user.Phone,
                    isDisabled : user.isDisabled,
                    isEmailVerified : user.isEmailVerified
                }
                const token = jwt.sign(userData, process.env.JWT_SKEY, {
                    expiresIn: "1h"
                })
                res.json({
                    message: "Login success",
                    token: token,
                })

            }
            else{
                res.status(403).json({
                    message: "Invalid password"
                })
            }
        }
        
    }).catch(()=>{
        res.status(500).json({
            message: "Error in login"
        })
    }
)
    
        
}
// npm install bcrypt eka libiry ekk eken wenne password ekata seurity ekk denwa 