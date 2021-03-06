var topics = ["Tango", "Waltz Dance", "Hip-Hop Dance", "Cha cha cha"];

            // displaydanceInfo function re-renders the HTML to display the appropriate content
            function displaydanceInfo() {

                var dance = $(this).attr("data-name");
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dance + "&api_key=dc6zaTOxFJmzC&limit=10";

                // Creating an AJAX call for the specific dance button being clicked
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {

                    var results = response.data;
                    $("#dance-view").empty();

                    for (var i = 0; i < results.length; i++) {

                        // Only taking action if the photo has an appropriate rating
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            // Creating a div for the gif
                            var gifDiv = $("<div>");
                            gifDiv.addClass("imagediv");

                            // Storing the result item's rating
                            var rating = results[i].rating;

                            // Creating a paragraph tag with the result item's rating
                            var p = $("<p>").text("Rating: " + rating);

                            // Creating an image tag
                            var danceImage = $("<img>");

                            // Giving the image tag an src attribute of a proprty pulled off the
                            // result item 
                            danceImage.attr("src", results[i].images.fixed_height_still.url);
                            console.log(results);
                            danceImage.attr("data-still", results[i].images.fixed_height_still.url);
                            danceImage.attr("data-animate", results[i].images.fixed_height.url);
                            danceImage.attr("data-state", "still")

                            // Appending the paragraph and danceImage we created to the "gifDiv" div we created
                            gifDiv.append(p);
                            gifDiv.append(danceImage);

                            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                            $("#dance-view").prepend(gifDiv);
                        }
                    }
                });

            }

            // Function for displaying dance data
            function renderButtons() {

                // Deleting the topics prior to adding new topics
                // (this is necessary otherwise you will have repeat buttons)
                $("#buttons-view").empty();
                // $("#dance-input").empty();

                // Looping through the array of topics
                for (var i = 0; i < topics.length; i++) {

                    // Then dynamicaly generating buttons for each dance in the array
                    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                    var a = $("<button>");
                    // Adding a class of dance-btn to our button
                    a.addClass("dance-btn");
                    // Adding a data-attribute
                    a.attr("data-name", topics[i]);
                    // Providing the initial button text
                    a.text(topics[i]);
                    // Adding the button to the buttons-view div
                    $("#buttons-view").append(a);
                    // }


                }
            }

            // This function handles events where a dance button is clicked
            $("#add-dance").on("click", function (event) {
                event.preventDefault();
                // This line grabs the input from the textbox
                var dance = $("#dance-input").val().trim();
                $("#dance-input").val("");

                // Adding dance from the textbox to our array
                topics.push(dance);

                // Calling renderButtons which handles the processing of our dance array
                renderButtons();
            });

            // Adding a click event listener to all elements with a class of "dance-btn"
            $(document).on("click", ".dance-btn", displaydanceInfo);

            // Calling the renderButtons function to display the intial buttons
            renderButtons();
            //new function to change data-state of img
            $(document).on("click", "img", function () {
                if ($(this).attr("data-state") === "still") {
                    console.log("stuff here")
                    $(this).attr("src", $(this).attr("data-animate"))
                    $(this).attr("data-state", "animate")
                } else {
                    $(this).attr("src", $(this).attr("data-still"))
                    $(this).attr("data-state", "still")
                    console.log("then this")
                }
            })