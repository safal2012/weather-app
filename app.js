const express = require('express');
const ejs = require('ejs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
app.use(express.json());
app.use(express.static('./assets'))
app.set('view engine', 'ejs');
app.set('views', './templates/views');

app.get('/', (req, res) => {
  res.render('index', {title:"Home Page", author:"Virat"});
})


app.get('/weather', async(req, res) => {
  const location = req.query.location;
  //console.log(location);
  if (location!="") {
    try
    {
      // console.log("first");
      const geoCordinates =  geocode(location, (error, data)=>{
        if(data)
        {
          console.log(data);
          forecast(data.long, data.lat,(err, temperature)=>{
            console.log(temperature);
            if(temperature)
            {
              res.render('weather', {t:temperature.temp,feels:temperature.feelsLike, location: data.place, title:"Weather Page", author:"Virat"});
            }
            else{
              res.render('error', {message:err.message, title:"Weather Page", author:"Virat"});
            }
          })
        }
        else{
          res.render('error', {message:error.message, title:"Weather Page", author:"Virat"});
        }
      });        
    }
    catch(error){
      console.log("error in app.js");
      console.log(error);
      res.render('error',{'message':error.message, title:"Weather Page", author:"Virat"});
    }
    
  }
  else{
    res.render('error', {'message':"Please enter a location to get weather details", title:"Weather Page", author:"Virat"});
  }
})

app.get('/help', (req, res)=>{
  res.render('help', {title:"Help Page", author:"Virat"})
})

app.get('*', (req, res)=>{
  res.render('404', {title:"Error 404", author:"Virat"})
})

app.listen(3000, (err) => {
  if (err)
    console.log("Some error occured while starting server");
  else
    console.log("Server is up and running on port 3000");
});

