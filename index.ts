import express from "express";
import mysql from "mysql";

// App initialization
const app = express();


// Follow this tutorial: https://www.youtube.com/watch?v=W8jySpfRUDY
const database = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root",
    database:"testdb"
});

// Initial Route
app.get("/", (req,res)=>{
    console.log("HIT API ENDPOINT");
    res.send("Hello");
    
})

// Insert Route
app.get("/insert",(req,res)=>{
    database.query("INSERT INTO countries (name, population) VALUES (?,?)",['bulgaria',122],(err,result)=>{
        if(err){
            console.log(err);
            
        }
        res.send(result);
    })
})

// Listen Route
app.listen(3005, ()=>{
    console.log("Server is up and running HOOR234AY");
    
})
