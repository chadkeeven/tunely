/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


 // /* hard-coded data! */
 // var sampleAlbums = [];
 // sampleAlbums.push({
 //   artistName: 'Ladyhawke',
 //   name: 'Ladyhawke',
 //   releaseDate: '2008, November 18',
 //   genres: [ 'new wave', 'indie rock', 'synth pop' ]
 // });
 // sampleAlbums.push({
 //   artistName: 'The Knife',
 //   name: 'Silent Shout',
 //   releaseDate: '2006, February 17',
 //   genres: [ 'synth pop', 'electronica', 'experimental' ]
 // });
 // sampleAlbums.push({
 //   artistName: 'Juno Reactor',
 //   name: 'Shango',
 //   releaseDate: '2000, October 9',
 //   genres: [ 'electronic', 'goa trance', 'tribal house' ]
 // });
 // sampleAlbums.push({
 //   artistName: 'Philip Wesley',
 //   name: 'Dark Night of the Soul',
 //   releaseDate: '2008, September 12',
 //   genres: [ 'piano' ]
 //});
 /* end of hard-coded data */




 $(document).ready(function() {
  console.log('app.js loaded!');
  $.get("/api/albums", function(json, status){
    json.forEach(function(album, index) {
      renderAlbum(album);

    });
  });
  $(".form-horizontal").submit(function(event){
    var formData = $(this).serialize();
        $.post("api/albums", formData);
        $.get("/api/albums", function(json, status){
          renderAlbum(json[json.length - 1]);
        });

      event.preventDefault();
      $(this).trigger("reset");
  });
 
});

function buildSongsHtml(songs) {
  //Make buildSongsHtml return the HTML shown above (or similar). 
  //It should take in an array of songs. It should return an HTML string.
  var songsString = "";
  for (var i = 0; i < songs.length; i++) {
   songsString +=  "(" + songs[i].trackNumber + ") "+ songs[i].name + "  ";
}
  var songHtml =
 " <li class='list-group-item'>" +
 " <h4 class='inline-header'>Songs:</h4>" +
  "<span>" + songsString + "</span>" +
"</li>";
return songHtml;
}

//– (1) Famous – (2) All of the Lights

// this function takes a single album and renders it to the page
function renderAlbum(album) {
 // console.log('rendering album:', album);
  var name = album.name;
  var artist = album.artistName;
  var releaseDate = album.releaseDate;
  var songs = buildSongsHtml(album.songs);


  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + "HARDCODED ALBUM ID" + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 album-art'>" +
  "                     <img class='img-fluid' src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  artist + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + releaseDate + "</span>" +
  "                      </li>" +
                          songs    +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +
  "          </div>" +
  "          <!-- end one album -->";

  // render to the page with jQuery
  $(albumHtml).appendTo('#albums');

}
