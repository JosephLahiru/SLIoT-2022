import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host:"152.70.158.151:7098",
    user:"root",
    password:"amres",
    database:"sliot"
})

app.get("/", (req, res)=>{
    res.json("hello this is backend!");
})

app.listen(8800, ()=>{
    console.log("Connected to backend!");
});