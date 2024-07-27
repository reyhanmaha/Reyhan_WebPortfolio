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

    /*
    if(req.body['posts']){
        data={
            posts:[req.body['posts']]
        };
    }
        */
    res.render("blogHomePage",{posts:data});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });