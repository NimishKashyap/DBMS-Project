import express from "express";
import mysql from "mysql";
import insertRoute from "./routes/insertRoutes";
import getRoute from "./routes/getRoutes";
import logRegRoute from "./routes/logRegRoutes";
import deleteRoute from "./routes/deleteRoute";
import expressFileUpload from "express-fileupload";
import cors from "cors";
// App initialization
const app = express();
// Middlewares
app.use(cors());
app.use(expressFileUpload());
app.use(express.json({limit:"500mb"}))
app.use(express.urlencoded({extended:true, limit:"500mb", parameterLimit:500000}))

app.use("/backend", insertRoute);
app.use("/backend", getRoute);
app.use("/backend", logRegRoute);
app.use("/backend",deleteRoute);
// Follow this tutorial: https://www.youtube.com/watch?v=W8jySpfRUDY
export const database = mysql.createConnection({
    host:"localhost",
    password:"root",
    user:"root",
    database:"dbmsproject"
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
