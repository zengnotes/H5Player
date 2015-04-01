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
<<<<<<< HEAD
   document.getElementById('player').play();

    window.console.log(e.target);
=======
   document.getElementById('player').play(); 
>>>>>>> e202009e46e4510e52a291edb96406d2f33a526c

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
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      // if (!f.type.match('image.*')) {
      
       if((f.type == 'audio/mp3')==false) { 
         continue;
       }

<<<<<<< HEAD
  $("#playlistDiv").append('<p id="mp3'+i+'">'+f.name+'</p>');
=======
  $("#playlistDiv").append('<p>'+f.name+'</p>');
>>>>>>> e202009e46e4510e52a291edb96406d2f33a526c
    playListArray.push(f);

/*
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
*/
    }

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

<<<<<<< HEAD
    window.console.log($('#mp3'+idx).offset().top);
    $('html, body').animate({
     scrollTop: $('#mp3'+idx).offset().top-55
     }, 100);


=======
>>>>>>> e202009e46e4510e52a291edb96406d2f33a526c
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

