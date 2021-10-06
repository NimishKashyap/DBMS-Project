import express from "express";
import mysql from "mysql";
import insertRoute from "./routes/insertRoutes";
import getRoute from "./routes/getRoutes";
// App initialization
const app = express();

// Middlewares
app.use("/backend", insertRoute);
app.use("/backend", getRoute);

// Follow this tutorial: https://www.youtube.com/watch?v=W8jySpfRUDY
export const database = mysql.createConnection({
    host:"localhost",
    password:"root",
    user:"root",
    database:"testdb"
}) 

// Initial Route
app.get("/", (req,res)=>{
    console.log("HIT API ENDPOINT");
    res.send("Hello");
    
})

// Listen Route
app.listen(3005, ()=>{
    console.log("Server is up and running HOOR234AY");
    
})
