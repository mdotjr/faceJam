var audioElement = document.createElement("audio");
var songArray = ["https://firebasestorage.googleapis.com/v0/b/facejam-200816.appspot.com/o/Reaching.mp3?alt=media&token=6a7c55ad-1e11-45e6-be33-de3da668e82d", "https://firebasestorage.googleapis.com/v0/b/facejam-200816.appspot.com/o/01%20The%20Secret%20Thoughts%20of%20Housewives.wav?alt=media&token=82f23962-be0b-4b12-8833-a8c7455feac4", "assets/javascript/LittleLandslides.mp3", "assets/javascript/WithYou.mp3"]

$(document).ready(function() {

    
    //grab the information from the user inputted url
    $("#submit").click(function(userUpload) {
        picValue = $("#userImage").val();
        //.jpg .jpeg .gif .png or .tiff

        if(picValue.endsWith('.jpg') || picValue.endsWith('.jpeg') || picValue.endsWith('.png') || picValue.endsWith('.tiff') || picValue.endsWith('.gif')) {
          console.log('Valid!')
          callFaceApi(picValue);
        $('#dummyHead').attr('src' ,picValue); //grabbing the source attribute and passing the picValue through to the #dummyHead
        } else {
          console.log('Invalid!')
          $("#myModal").removeClass('hidden')// 
        }
        
        //possible add in "preview" of picture
        // if (picValue !== '.jpg' || '.gif' || '.png') {
          //then upload the modal
          
    });

    $(".close").click(function(event) {
      console.log('Clicked!');
      $("#myModal").addClass('hidden')
    });
//cors - crossdomain issues - you have to allow apis to speak to each other
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
  
    
    // var url_and_query = url + "?" + query_string; 
    var renderFaceEmotion; 
    

    //temporary array to troubleshoot the next button
    
    var currentTrack = 0
    
    var captainPlanet = $(".captain-planet");

    // Gets Link for Theme Song

    // Theme Button
    $("#play").on("click", function() {
        audioElement.play();
    })

    $("#stop").on("click", function() {
        console.log(audioElement.currentTime)
        audioElement.pause();
        audioElement.currentTime = 0; ///check documentation to see if STOP is an actual thing
    })

    // $("#next").on("click", function() {
    //   currentTrack = currentTrack + 1;
    //   console.log(songArray[currentTrack]);
    //   audioElement.setAttribute("src", songArray[currentTrack]);
    //   audioElement.play();
    //   console.log(songArray);
    // })

  // display song data in table
  // need to grab the value of the song title and then .text to the table or html to replace? 
});



callFaceApi = function(picUrl){
    var api_key = "PVQ-3aZ02DnPvmJenhhE5uu2sL3LXfsq"
    var api_secret = "2QHsXeBIxzksQEMcpY518MaCFUpcbhjy"
    var api_url = "https://api-us.faceplusplus.com/facepp/v3/detect";
    var sad_url = "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/RO7HF83PPB.jpg";

    var params = {
        api_key: api_key,
        api_secret: api_secret,
        image_url: picUrl,
        return_attributes: "emotion"
    }

    $.ajax({
        type: 'POST',
        url: api_url,
        data: params
    }).done(function(data){
        let emotionObj = data.faces[0].attributes;

        if (emotionObj.emotion.happiness >= 50) {
            audioElement.setAttribute("src", songArray[0]);
            console.log('Happy!');
            $("#songTitle").text("Reaching");
            $("#artist").text("David Karsten Daniels");
            $("#releaseDate").text("2016");
        } else {
            audioElement.setAttribute("src", songArray[2]);
            console.log('Sad!');
            $("#songTitle").text("Sad Song");
            $("#artist").text("David Bazan");
            $("#releaseDate").text("2015");
        }
        //progress bar
        $('.progress-bar').css('width', emotionObj.emotion.happiness+'%')// need to ensure % to "fill the bar"
        console.log('Success', emotionObj);
    })
}
     

    






