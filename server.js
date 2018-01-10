// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db = require("./models");

// serve static files from public folder
app.use(express.static(__dirname + '/public'));





/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

 app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

 app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
    {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

 app.get('/api/albums', function album_index(req, res){
  db.Album.find(function(err,albums){
    if (err) {
      console.log(err);
    }
    res.json(albums);
  });
});

 app.post('/api/albums', function create_album(req,res){
  var newName = req.body.name;
  var newArtist = req.body.artistName;
  var newRelease = req.body.releaseDate;
  var newGenres = req.body.genres;
  // console.log(newName);
  // console.log(newArtist);
  // console.log(newRelease);
  // console.log(newGenres);
  var newAlbum = {
    artistName: newArtist,
    name: newName,
    releaseDate: newRelease,
    genres: newGenres
  };
  db.Album.create(newAlbum, function(err, album){
    if(err){
      res.json("Sorry error");
    }
  });
  res.json(newAlbum);

});

// //Creates new car 
// app.post('/api/cars', function create_cars(req, res){
//   var newMake = req.body.make;
//   var newModel = req.body.model;
//   var newYear = req.body.year;
//   var newCar = {make: newMake,model: newModel, year: parseInt(newYear)};
//   db.Cars.create(newCar, function(err, car){
//     if(err){
//       res.json("Sorry It's a no go");
//     }
//   });
//   res.json(newCar);
// });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
