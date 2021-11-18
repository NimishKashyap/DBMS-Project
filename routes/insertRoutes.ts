import express from "express";
import { database } from "../index";
import expressFileUpload from "express-fileupload";
import fs from "fs";

const insertRoute = express.Router();

insertRoute.post("/video",(req,res)=>{
    
    // @ts-ignore
    console.log("/video hit");
    console.log(req.files.file);
    console.log(req.body);
    
    if(!req.files.file || Object.keys(req.files.file).length===0){
        return res.status(400).send("No files were uploaded");
    }
    let uploadedFile = req.files.file;

    const title = req.body.title ? req.body.title : "N/A";
    const descripton = req.body.description ?req.body.description: "N/A";
    const views = Math.floor(Math.random()*100);
    const likes = Math.floor(Math.random()*100);
    const dilikes = Math.abs(Math.floor(Math.random()*10));
    const userid = req.body.userid ?req.body.userid : "1";
    const uploadDate = new Date();
    
    
    // @ts-ignore
    let path =__dirname+`/videos/${uploadedFile.name}`
    
    // @ts-ignore
    uploadedFile.mv(path, (err)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
            return;
        }
        else{

            // @ts-ignore
            path=`${uploadedFile.name}`;
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
           
        }
    })


})
insertRoute.post("/comments", (req,res)=>{
    console.log("/comment hit");
    console.log(req.body);
    const comment = req.body.comment;
    const userid = req.body.iduser;
    const videoid = req.body.idvideo;
    const datee = new Date();
    const date = datee.toISOString().split('T')[0]
    database.query(`INSERT INTO comments (comment, commentDate ,userid, videoid) values (?,?,?,?)`,[comment,date ,userid, videoid], (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else{
            res.status(200).send("INSERTED SUCCESS");
        }
    })
})


export default insertRoute;
