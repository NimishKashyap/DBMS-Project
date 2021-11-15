import express from "express";
import { database } from "../index";
import expressFileUpload from "express-fileupload";
import fs from "fs";

const insertRoute = express.Router();

insertRoute.post("/video",(req,res)=>{
    
    // @ts-ignore
    console.log("API HIT");
    
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).send("No files were uploaded");
    }
    let uploadedFile = req.files.uploadFile;

    const title = req.body.videoTitle || "N/A";
    const descripton = req.body.description || "N/A";
    const views = Math.floor(Math.random()*100);
    const likes = Math.floor(Math.random()*100);
    const dilikes = Math.abs(Math.floor(Math.random()*10));
    const userid = req.body.userid || "1";
    const uploadDate = req.body.uploadDate || new Date();
    
    // provide name=uploadedFile in front end
    console.log(uploadedFile);
    
    
    // @ts-ignore
    const path = `./routes/videos/${uploadedFile.name}`
    // @ts-ignore
    uploadedFile.mv(path, (err)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
       database.query(`INSERT INTO video (title, description, path, views, likes, dislikes, userid, uploadDate) values (?,?,?,?,?,?,?,?)`,[title, descripton, path, views, likes, dilikes,userid, uploadDate], (dberr, result)=>{
           if(dberr){
               console.log("ERROR INSERTING VALUES TO DB");
                console.log(dberr);
                res.status(500).send(dberr);

           }
           else{
               console.log("INSERTED SUCECSFULLY");
               res.status(200).send("INSERTED SUCCESS");
           }
       })
       
    })


})


export default insertRoute;
