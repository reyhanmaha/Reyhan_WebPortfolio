import express from "express";
import bodyParser from "body-parser";
import path from "path";
import axios from "axios";
import pg from "pg";
import { info } from "console";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Books",
  password: "postgres123",
  port: 5432,
});

db.connect();
const drinksData=[
    {
        id:1,
        title:"Espresso Martini",
        difficulty:"easy"
    },
    {
        id:2,
        title:"Negroni",
        difficulty:"hard"
    },
    {
        id:3,
        title:"Daiquiri",
        difficulty:"hard"
    },
    {
        id:4,
        title:"Margarita",
        difficulty:"easy"
    },
    {
        id:5,
        title:"Whiskey Sour",
        difficulty:"easy"
    },
    {
        id:6,
        title:"Aperol Spritz",
        difficulty:"easy"
    }
];
const port=3000;
const app=express();
let data=[];
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/home",(req,res)=>{
    res.render("home");
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/contact",(req,res)=>{
    res.render("contact");
});

app.get("/resume",(req,res)=>{
    res.render("resume");
});

app.get("/blogHomePage",(req,res)=>{
    //let posts=[];
    res.render("blogHomePage",{posts:data});
});

app.post("/blogHomePage",(req,res)=>{
    //let posts=[];
    data.push(req.body['posts']);
    //data.push(req.body['posts']);
    console.log(data);
    res.render("blogHomePage",{posts:data});
});

app.post("/removePost",(req,res)=>{
    let value=req.body["index"];
    let position=data.indexOf(value);
    if(position===0){
        data.splice(0,1);
    }else{
        data.splice(position,1);
    }
    res.redirect("blogHomePage");
});

app.post("/editPost",(req,res)=>{
    let value=req.body["index"];
    console.log(value);
    let position=data.indexOf(value);
    if(position===0){
        data.splice(0,1);
    }else{
        data.splice(position,1);
    }
    res.redirect("blogHomePage");
});

app.get("/cocktailHomepage",async (req,res)=>{
    /*const options = {
        method: 'GET',
        url: 'https://the-cocktail-db3.p.rapidapi.com/',
        headers: {
          'x-rapidapi-key': '1942c9e20cmshed1754f2cb0a7d9p16ebe7jsn386a2f493715',
    'x-rapidapi-host': 'the-cocktail-db3.p.rapidapi.com'
        }
      };
      */
    try {
        //const response = await axios.request(options);
        res.render("cocktailHomepage",{drinks:drinksData});
    } catch (error) {
        console.log("Error");
        console.error(error);
    }
});

app.get("/randomCocktail",async (req,res)=>{
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    res.render("cocktailHomepage");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });