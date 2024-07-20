import express from "express";
import bodyParser from "body-parser";

const port=3000;
const app=express();

app.get("/blogHomePage",(req,res)=>{
    res.render("blogHomePage.ejs");
});

app.get("/blogAddPost",(req,res)=>{
    res.render("blogAddPost.ejs");
});