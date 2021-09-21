import express from "express";
import mysql from "mysql";

const app = express();


const database = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root",
    database:"testdb"
});


app.get("/", (req,res)=>{
    console.log("HIT API ENDPOINT");
    res.send("Hello");
    
})
app.get("/insert",(req,res)=>{
    database.query("INSERT INTO countries (name, population) VALUES (?,?)",['bulgaria',122],(err,result)=>{
        if(err){
            console.log(err);
            
        }
        res.send(result);
    })
})
app.listen(3005, ()=>{
    console.log("Server is up and running HOOR234AY");
    
})
