import express from "express";
import bodyParser from "body-parser";
import path from "path";
import axios from "axios";
import pg from "pg";
import csvParser from "csv-parser";
import fs from "fs";
import { info } from "console";
/*
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Books",
  password: "postgres123",
  port: 5432,
});

db.connect();
*/
const drinksData=[
    {
        id:1,
        title:"Espresso Martini",
        difficulty:"Easy",
        image:"https://us.jura.com/-/media/global/images/coffee-recipes/images-redesign-2020/espresso_martini_2000x1400px.jpg?h=1400&iar=0&w=2000&hash=B2F24F41FB83DBD8BA6E5C4A9703A3D7"
    },
    {
        id:2,
        title:"Negroni",
        difficulty:"Medium",
        image:"https://www.liquor.com/thmb/KPTRXSVO7vyx7O2fPyNkLh9JQPo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mezcal-negroni-1500x1500-primary-6f6c472050a949c8a55aa07e1b5a2d1b.jpg"
    },
    {
        id:3,
        title:"Daiquiri",
        difficulty:"Medium",
        image:"https://www.wineenthusiast.com/wp-content/uploads/2023/08/08_23_Daquiri_HERO_GettyImages-1489505870_1920x1280-1280x853.jpg"
    },
    {
        id:4,
        title:"Margarita",
        difficulty:"Easy",
        image:"https://www.liquor.com/thmb/JQgDGy26Zsw-_cFGKH4zNH9PlXk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Frozen-Margarita-1500x1500-hero-191e49b3ab4f4781b93f3cfacac25136.jpg"
    },
    {
        id:5,
        title:"Whiskey Sour",
        difficulty:"Easy",
        image:"https://assets.epicurious.com/photos/63443ba259142b909ba89726/master/pass/WhiskeySourCocktails_RECIPE_100622_40707.jpg"
    },
    {
        id: 6,
        title: "Aperol spritz",
        difficulty: "Easy",
        portion: "Serves 6-8",
        time: "Hands-on time 5 min",
        description: "Get into the spirit of summer with this classic Italian recipe. Chilled prosecco and Aperol come together to create the beloved Aperol spritz.",
        ingredients: [
          "750ml bottle of prosecco",
          "Bag of ice",
          "Bottle of Aperol",
          "Bottle of soda water",
          "Slice of orange"
        ],
        method: [
          {
            Step: "Chill the bottle of prosecco and Aperol in the fridge."
          },
          {
            Step: "Fill 6 or 8 wine glasses or tall tumblers with a couple of ice cubes and roughly three parts prosecco to one part Aperol."
          },
          {
            Step: "Add a splash of soda water and a slice of orange. Serve straightaway so that the fizz stays lively."
          }
        ],
        image: "https://static01.nyt.com/images/2023/08/25/multimedia/LH-aperol-spritz-lqbj/LH-aperol-spritz-lqbj-superJumbo.jpg"
      }
];
const port=3000;
const app=express();
let data=[];
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/",(req,res)=>{
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

let drinksApiInfo;
app.get("/cocktailHomepage",async (req,res)=>{
    try {
        const options = {
            method: 'GET',
            url: 'https://the-cocktail-db3.p.rapidapi.com/',
            headers: {
              'x-rapidapi-key': '1942c9e20cmshed1754f2cb0a7d9p16ebe7jsn386a2f493715',
              'x-rapidapi-host': 'the-cocktail-db3.p.rapidapi.com'
            }
          };  
            //const response = await axios.request(options);
            //console.log(response.data);
            drinksApiInfo = await axios.request(options);
            res.render("cocktailsHub/cocktailHomepage",{drinks:drinksApiInfo.data});
        } catch (error) {
            console.error(error);
        }
    try {
        res.render("cocktailsHub/cocktailHomepage",{drinks:drinksData});
    } catch (error) {
        console.error(error);
    }
});

app.post("/cocktailHomepage",async (req,res)=>{
    let easyCocktails = [];
    let mediumCocktails = [];
    let response;
    try {
        /*const options = {
            method: 'GET',
            url: 'https://the-cocktail-db3.p.rapidapi.com/',
            headers: {
                'x-rapidapi-key': '1942c9e20cmshed1754f2cb0a7d9p16ebe7jsn386a2f493715',
                'x-rapidapi-host': 'the-cocktail-db3.p.rapidapi.com'
            }
        };
        response = await axios.request(options);*/
        if (drinksApiInfo) {
            console.log("HERE");
            const info = drinksApiInfo.data;
            if (req.body['easyDrinks']) {
                let item;
                for (let index = 0; index < info.length; index++) {
                    item = info[index];
                    if (item.difficulty === "Easy") {
                        easyCocktails.push(item);
                    }
                }
                try {
                    //console.log(easyCocktails)
                    res.render("cocktailsHub/cocktailHomepage", { drinks: easyCocktails });
                } catch (error) {
                    console.error(error);
                }
            }
            if (req.body['mediumDrinks']) {
                let mediumItem;
                for (let index = 0; index < info.length; index++) {
                    mediumItem = info[index];
                    if (mediumItem.difficulty === "Medium") {
                        mediumCocktails.push(mediumItem);
                    }
                }
                try {
                    res.render("cocktailsHub/cocktailHomepage", { drinks: mediumCocktails });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
    if (req.body['easyDrinks']) {
        for (let index = 0; index < drinksData.length; index++) {
            if (drinksData[index].difficulty == "Easy") {
                easyCocktails.push(drinksData[index]);
            }
        }
        try {
            res.render("cocktailsHub/cocktailHomepage", { drinks: easyCocktails });
        } catch (error) {
            console.error(error);
        }
    }
    if (req.body['mediumDrinks']) {
        for (let index = 0; index < drinksData.length; index++) {
            if (drinksData[index].difficulty == "Medium") {
                mediumCocktails.push(drinksData[index]);
            }
        }
        try {
            res.render("cocktailsHub/cocktailHomepage", { drinks: mediumCocktails });
        } catch (error) {
            console.error(error);
        }
    }

    /*try {
        res.render("cocktailHomepage", { drinks: drinksData });
    } catch (error) {
        console.error(error);
    }*/
});

app.get("/randomCocktail",async (req,res)=>{
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    res.render("cocktailsHub/cocktailHomepage");
});

app.get("/info",async (req,res)=>{
    res.render("cocktailsHub/cocktailInfo");
});

app.post("/drinkDetails",async (req,res)=>{
    console.log(req.body['drink']);
    let item;
    let badSearch=false;
    try {
        var drinkID=req.body['drink'];
        const options = {
        method: 'GET',
        url: 'https://the-cocktail-db3.p.rapidapi.com/',
        headers: {
            'x-rapidapi-key': '1942c9e20cmshed1754f2cb0a7d9p16ebe7jsn386a2f493715',
            'x-rapidapi-host': 'the-cocktail-db3.p.rapidapi.com'
        }
        };
        options.url=options.url.concat("",drinkID);

        try {
            const response = await axios.request(options);
            console.log(response.data);
            res.render("cocktailsHub/cocktailDetails",{drink:response.data});
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        
    }
    if(badSearch){
        res.render("cocktailsHub/cocktailHomepage",{drinks:drinksData,detailsError:true});    
    }
    
});

app.post("/searchDrink",async (req,res)=>{
    try {
        let searchResults=[];
        let value;
        let itemTitle;
        let searchedTitle;
        searchedTitle=req.body['search'];
        try {
            const options = {
                method: 'GET',
                url: 'https://the-cocktail-db3.p.rapidapi.com/',
                headers: {
                  'x-rapidapi-key': '1942c9e20cmshed1754f2cb0a7d9p16ebe7jsn386a2f493715',
                  'x-rapidapi-host': 'the-cocktail-db3.p.rapidapi.com'
                }
              };
              
              try {
                  let response = await axios.request(options);
                  response=response.data;
                  for (let i = 0; i < response.length; i++) {
                    itemTitle=response[i].title.toLowerCase();
                    value=itemTitle.search(searchedTitle.toLowerCase())
                    if(value!=-1){
                        searchResults.push(response[i]);
                    }
                }
                 res.render("cocktailsHub/searchDrink",{drinks:searchResults});
              } catch (error) {
                  console.error(error);
              }
        } catch (error) {
            
        }
        for (let i = 0; i < drinksData.length; i++) {
            itemTitle=drinksData[i].title.toLowerCase();
            value=itemTitle.search(searchedTitle.toLowerCase())
            if(value!=-1){
                searchResults.push(drinksData[i]);
            }
        }
        res.render("cocktailsHub/searchDrink",{drinks:searchResults});   
    } catch (error) {
        console.log(error);
    }
});

app.get("/FineDiningHomepage",(req,res)=>{
    res.render("FinerDiningHomepage");
});

app.get("/FineDiningMenu",(req,res)=>{
    res.render("menu");
});

app.get("/FineDiningAboutUs",(req,res)=>{
    res.render("FinerDiningAboutUs");
});

app.post("/FineDiningOptions",(req,res)=>{
    let drinkData=[];
    if(req.body['drink']){
        fs.createReadStream('./public/dataFiles/finerDiningDrinksData.csv') // Path to your CSV file
        .pipe(csvParser())
        .on('data', (row) => {
            let item=row;
            //console.log(row); // Process each row
            drinkData.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
            console.log(drinkData);
            res.render("menuOptions",{data:drinkData,type:"drink"});
    });
        
    }
    if(req.body['food']){
        let foodData=[];
        fs.createReadStream('./public/dataFiles/finerDiningFoodData.csv') // Path to your CSV file
        .pipe(csvParser())
        .on('data', (row) => {
            
            //console.log(row); // Process each row
            foodData.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
            console.log(foodData);
            res.render("menuOptions",{data:foodData,type:"food"});
    });
    }
    if(req.body['sweets']){
        let foodData=[];
        fs.createReadStream('./public/dataFiles/finerDiningFoodData.csv') // Path to your CSV file
        .pipe(csvParser())
        .on('data', (row) => {
            
            //console.log(row); // Process each row
            foodData.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
            console.log(foodData);
            res.render("menuOptions",{data:foodData,type:"dessert"});
    });
    }

    //res.render("menuOptions");
});

app.get("/FineDiningCareers",(req,res)=>{
    let jobsData=[];
    fs.createReadStream('./public/dataFiles/finerDiningCareers.csv') // Path to your CSV file
        .pipe(csvParser())
        .on('data', (row) => {
            
            //console.log(row); // Process each row
            jobsData.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
            //console.log(foodData);
            res.render("FinerDiningCareers",{data:jobsData});
    });
   
});

app.post("/FineDiningCareers",(req,res)=>{
    console.log(req.body['fName']);
   res.redirect("/FineDiningHomepage")
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });