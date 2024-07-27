import express from "express";
import bodyParser from "body-parser";
import path from "path";

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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });