import express from "express";
import { database } from "../index";
import fs from "fs";
const getRoute = express.Router();


// VIDEO GET ROUTES
getRoute.get("/video/get",(req,res)=>{
    const videoid = req.headers.videoid;
    const path = req.headers.path;
    
    console.log(__dirname);

    if(!req.headers.range){
        res.status(400).send("Requires Range Header");
    }
    else
    {    
        const range = req.headers.range;
        console.log(range);
        console.log(req.headers);
        
        const videoPath = __dirname+`/videos/${path || `bigbuck`}.mp4`;
        const videoSize = fs.statSync(videoPath).size;

        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range?.replace(/\D/g,""));
        const end = Math.min(start+CHUNK_SIZE, videoSize -1);

        const contentLength = end-start+1;
        const headers= {
            "Content-Range":`bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges":"bytes",
            "Content-Length":contentLength,
            "Content-Type":"video/mp4",
        };
        res.writeHead(206,headers);
        const videoStream = fs.createReadStream(videoPath,{start,end});
        videoStream.pipe(res);     
    
    }
    
    
})

getRoute.get("/video/", (req,res)=>{
    const videoID = req.headers.videoid;
    if(videoID){
        database.query(`SELECT * from video WHERE idvideo=${videoID}`,(err,result)=>{
            if(err){
                res.send("THERE WAS AN ERROR!")
                console.log(err);
                
            }else{
                database.query(`SELECT u.name from video v natural join user u where idvideo=${videoID}`, (err, result2)=>{
                    if(err){
                        res.send("ERROR AT GETTING NAMES");
                    }
                    else{
                        res.json(result.concat(result2));
                    }
                })
            }
        })
    }
})


// SEARCH BAR API
getRoute.post("/search", (req,res)=>{
    console.log("/search hit");
    
    const inputField = req.headers.input;
    console.log(inputField);
    
    if(inputField){
        console.log("Inside inputfield");
        
        database.query(`SELECT idvideo, title, description from video where title like '%${inputField}%'`,(err, result)=>{
            if(err){
                res.status(500).send("SOMETHING WENT WRONG")
            }
            if(result.length===0){
                res.status(200).send("NO RESULTS FOUND");
            }
            else{

                res.status(200).json(result);
            }
        })
    }
})

// Comments
getRoute.get("/comments", (req,res)=>{
    console.log("/comments hit");

    const videoID = req.headers.videoid;
    if(!videoID){
        console.log("VIDEO ID NOT FOUND");
        res.send("VIDEO ID NOT FOUND!")
    }
    else{
        database.query(`SELECT u.name, c.comment from user u NATURAL JOIN comments c where idvideo=${videoID}`, (err, result)=>{
            if(err){
                res.send("SOMETHING WENT WRONG!")
            }
            else{
                res.json(result);
            }
        })
    }
    
})
// HOME PAGE
getRoute.get("/home", (req,res)=>{
    console.log("API HIT");
    
    database.query("SELECT * FROM video",(err,result)=>{
        if(err){
            console.log("THERE WAS AN ERROR GETTING HOMEPAGE");
            res.send("THERE WAS AN ERROR FINDING HOMEPAGE")
        }else{
            res.json(result);
        }
    })
})

// GET USER
getRoute.get("/user",(req,res)=>{
    const idUser = req.headers.iduser;
    if(!idUser){
        res.send("USER ID NOT FOUND");
    }else{
        database.query(`SELECT iduser,name,email,age,regDate FROM user WHERE iduser=${idUser}`,(err,result)=>{
            if(err){
                res.send("ERROR AT GETTING USER");
            }else{
                console.log(result);
                
                res.json(result);
            }
        })
    }
})
export default getRoute;