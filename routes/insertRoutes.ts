import express from "express";
import { database } from "../index";
const insertRoute = express.Router();

insertRoute.get("/insert",(req,res)=>{
    database.query("INSERT INTO countries (name, population) VALUES (?,?)",['bulgaria',122],(err,result)=>{
        if(err){
            console.log(err);
            
        }
        // res.send(result);
    })
    database.query("SELECT * FROM countries",(err, result)=>{
        if(err)
            console.log(err);
        res.send(result)
    })
})


export default insertRoute;
