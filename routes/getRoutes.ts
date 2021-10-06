import express from "express";
import { database } from "../index";
import fs from "fs";
const getRoute = express.Router();

getRoute.get("/video",(req,res)=>{
    console.log(__dirname);
    
    const range = req.headers.range;
    console.log(range);
    console.log(req.headers);

    if(!range){
        res.status(400).send("Requires Range Header");
    }
    const videoPath = __dirname+"/videos/bigbuck.mp4";
    const videoSize = fs.statSync(__dirname+"/videos/bigbuck.mp4").size;

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
    
})


export default getRoute;