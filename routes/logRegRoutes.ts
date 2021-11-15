import express from "express";
import { database } from "../index";

const logRegRoute = express.Router();
logRegRoute.post("/login",(req,res)=>{
    

    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    
    
    if(email && password){
        database.query(`SELECT iduser FROM user where email='${email}' and password='${password}'`, (err,result)=>{
            if(err){
                console.log("THERE WAS AN ERROR SELECTING");
                console.log(err);
                res.send("ERROR!")
            }else{
                if(result.length===0){
                    res.send("NOT FOUND!")
                }else{
                    res.json(result);
                }
            }
        })
    }
    else{
        res.send("No email and password")
    }
})
logRegRoute.post("/register",(req,res)=>{
    const email=req.body.email;
    let password = req.body.password;
    const name = req.body.name;
    const age = req.body.age;
    let regDatee = new Date();
    let regDate = regDatee.toISOString().split('T')[0];

    database.query(`INSERT INTO user (name, age, regDate, email, password) values (?,?,?,?,?)`,[name,age,regDate,email,password],(err,result)=>{
        if(err){
            console.log("Could not insert values to user table");
            console.log(err);
            
            res.status(404).send("ERROR Creating user");
        }
        else{
            console.log("USER INSERTED");
            database.query(`SELECT iduser from user`,(err,idRes)=>{
                if(err){
                    console.log("Could not select iduser");
                    console.log(err);
                    res.status(404).send("ERROR Creating user");
                }else{

                    res.status(200).json({status:"OK", idRes});
                }
            })
        }
    })

})
export default logRegRoute;