var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require("./song.js");

//Alter the schema of Album to have a songs array that uses the Song.schema

var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres : [String],
  songs : [Song.schema]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;