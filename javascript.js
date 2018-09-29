//Array of topics- my theme is dance
var topics = ["Tango Dance", "Hip Hop Dance", "Rumba", "Cha cha cha", "Salsa", "Waltz dance"];

$("button").on("click", function() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    dance + "&api_key=4YHonTZXJA7pBduXJ1mXnfT0NLCGfLkZ&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })


.then(function(response){

    var results = response.data;
    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        var gifDiv = $("<div>");
         
        var rating = results [i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var danceImage = $("<img>");

        danceImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.append(p);
        gifDiv.append(danceImage);

        $("#gif-view").prepend(gifDiv);
    }
})
})