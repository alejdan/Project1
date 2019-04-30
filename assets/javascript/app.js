$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBUnDtEPZ7ByqCOhoro4Cgl22IbE6w699A",
        authDomain: "project1-39be4.firebaseapp.com",
        databaseURL: "https://project1-39be4.firebaseio.com",
        projectId: "project1-39be4",
        storageBucket: "project1-39be4.appspot.com",
        messagingSenderId: "145278155405"
    };
    firebase.initializeApp(config);

    var currencyName = "";

    $(".section").hide();

    // Search function
    function search(currencyName) {
        // save the input in firebase
        dataRef.ref().push({
            name: currencyName
        });
        // Get image
        getImage(currencyName);
        // Get prices
        getPrices(currencyName);
        // Get 10 trades
        //getTrades();
        recentlySearched()

        $(".section").show();

    }

    // Get image

    var imageObj = {

        bitcoin:"http://pngimg.com/uploads/bitcoin/bitcoin_PNG16.png",
        ethereum: "https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png",
        ripple: "https://cdn.freebiesupply.com/logos/large/2x/ripple-2-logo-png-transparent.png",
        litecoin: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Official_Litecoin_Logo.png"

    }

    function getImage (currencyName) {
        //set URL to key in object
        var url = imageObj[currencyName];
        //display image
        $("#logo").attr("src", url);
    }
        
    var conversions = {

        bitcoin: "BTC",
        ethereum: "ETH",
        litecoin: "LTC",
        ripple: "XRP"

    }

    var coinAPIKey = "AB279A9E-BE38-4C65-A7C9-756BCE2C94BE";
    var cryptoAPIKey = "f78cbc17a47a4e7c25dfda94acfe8db9ba5b1426bf110157f39e10cd41284811";
    
    // Get prices
    function getPrices (currencyName) {
        var queryURL = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + conversions[currencyName] + "&tsyms=MXN,USD,EUR,BTC,LTC,ETH,XRP&api_key=" + cryptoAPIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(currencyName);
            console.log(response[conversions[currencyName]]);
            $("#mxn").html(response[conversions[currencyName]].MXN + " MXN");
            $("#usd").html(response[conversions[currencyName]].USD + " USD");
            $("#eur").html(response[conversions[currencyName]].EUR + " EUR");
            $("#btc").html(response[conversions[currencyName]].BTC + " BTC");
            $("#eth").html(response[conversions[currencyName]].ETH + " ETH");
            $("#ltc").html(response[conversions[currencyName]].LTC + " LTC");
            $("#xrp").html(response[conversions[currencyName]].XRP + " XRP");
            
        });

    }
        //do a get to the API
        //display prices
    // Get 10 trades
        //do a get to the API
        //display trades in a table
    var dataRef = firebase.database();
    var dataRefLimited = dataRef.ref().limitToLast(5).orderByKey();
    // Recently searched currencies
    function recentlySearched(){
        dataRefLimited.once("value", function (childSnapshot) {
            // get the firebase data
            //console.log(childSnapshot.val())
            $("#recentTable").empty();
           childSnapshot.forEach(function (child) {
                console.log(child.val().name)
                $("#recentTable").prepend("<tr><td>" + child.val().name + "</td></tr>" )

           });
            // display the data in a table.
        });
    }
    recentlySearched()

    
    // on click do the search
    $("#search").on("click", function (event) {

        event.preventDefault();
        // grab input
        currency = $("#searchInput").val().trim();

        currencyName = currency.toLowerCase();

        search(currencyName);
        
    });
       

    $("#search").on("click", function () {

        var queryURL = "https://api.giphy.com/v1/gifs/random?tag=cryptocurrency&api_key=fhzJX3gZXGwyBzoihxydlvs8IiED0KjI&limit=1"

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {

            console.log(response);

            var result = response.data;

            var gifDiv = $("<div>");

            var cryptoGif = $("<img>");

            cryptoGif.addClass("individualImage");

            cryptoGif.attr("src", result.images.fixed_height.url);

            //Pausing and playing gifs

            /*$(document).on("click", ".individualImage", function () {

                if ($(this).attr("src") === $(this).attr("data-still")) {

                    $(this).attr("src", $(this).attr("data-active"));

                    $(this).attr("data-state", "active");

                } else {

                    $(this).attr("src", $(this).attr("data-still"))

                    $(this).attr("data-state", "still");

                }

            });*/

            gifDiv.prepend(cryptoGif);

            $("#trades").empty();

            $("#trades").prepend(gifDiv);

        });

    });

});
