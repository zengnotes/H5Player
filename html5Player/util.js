var playListArray = [];
var totalFiles = 0;
var idxPlaying = -1;


$(document).ready(function(){

$("#file_input").change(handleFileSelect);

$("#filterText").keyup(filterMP3Musics);

//fazendo o player acompanhar o scroll
var $sidebar   = $("#player").parent() ;
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 15;

 $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });


});





var freader = new FileReader();
freader.onload = function(e) { 
   document.getElementById('player').src = e.target.result; 
   document.getElementById('player').play();

    window.console.log(e.target);
   document.getElementById('player').play();

    // freader.readAsDataURL(audiofiles[0]);
}

function clearAll(){
  $("#playlistDiv p").remove();
  idxPlaying = -1;
  playListArray = [];
  $("#filterText").hide();
}

 function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    totalFiles = files.length;

    if(totalFiles==0) return;
    divh = $( window ).height()-110-95;
    $("#colmain,#playlistDiv").attr('height',divh+'px');
  clearAll();

   // Loop through the FileList and render image files as thumbnails.
     var mp3Array = [];
    for (var i = 0, f; f = files[i]; i++) {
        if((f.type == 'audio/mp3')==false) {
            continue;
        }
        mp3Array.push(f);

    }

     shuffle(mp3Array);

     for(var x in mp3Array){
         $("#playlistDiv").append('<p id="mp3'+x+'">'+mp3Array[x].name+'</p>');
         playListArray.push(mp3Array[x]);
     }


     /*
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      // if (!f.type.match('image.*')) {
      
       if((f.type == 'audio/mp3')==false) { 
         continue;
       }

  $("#playlistDiv").append('<p id="mp3'+i+'">'+f.name+'</p>');
    playListArray.push(f);


      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {

        return function(e) {
          
          $("#playlistDiv").append('<p>'+theFile.name+'</p>');

          if($("#playlistDiv").children().length==totalFiles){

           $("#loading").hide();
          }

        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);

    }
      */

$("#filterText").show();
$("#playlistDiv p").each(function(idx,p){

    $(p).dblclick(function(){
  // $("#nowPlayingText").text($(p).text());
      console.log('play track: '+idx);
      readMP3(idx);

    });


});


  }

function readMP3(idx){

  if(idx<0 || idx>playListArray.length){
    return;
  }

  // playingNow
  $("#playlistDiv p.playingNow").removeClass('playingNow');
  $("#nowPlayingText").text($("#playlistDiv p:eq("+idx+")").addClass('playingNow').text());
  freader.readAsDataURL(playListArray[idx]);
  idxPlaying=idx;

    window.console.log($('#mp3'+idx).offset().top);
    $('html, body').animate({
     scrollTop: $('#mp3'+idx).offset().top-55
     }, 100);

}

//proxima musica da lista
$('#player').on('ended', function() {

   readMP3(++idxPlaying);

});

function filterMP3Musics(){


if($("#playlistDiv p").length==0) return;

if($("#filterText").val()==''){
  $("#playlistDiv p").show();
}
else{
  $("#playlistDiv p").each(function(idx,p){
    if($(p).text().toLowerCase().indexOf($("#filterText").val().toLowerCase())>-1){
      $(p).show();
    }else{
      $(p).hide();
    }
  });  
}


}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


