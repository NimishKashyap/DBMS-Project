import express from "express";
import { database } from "../index";

const deleteRoute = express.Router();

deleteRoute.delete("/video",(req,res) =>{
    const videoid = req.headers.idvideo;
    console.log(videoid);
    database.query(`DELETE FROM video where idvideo=${videoid}`,(err,result)=>{
        if(err) {
            res.status(500).send("THERE WAS AN ERROR!") 
            throw err;
        }else{
            console.log(result);
            res.status(200).send("Video Deleted");
        }
    });
})

export default deleteRoute;