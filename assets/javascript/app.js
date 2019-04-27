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
    //Biography API

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
    }

    // Get image

    var imageObj = {

        bitcoin:"data: image/ png; base64, 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",
        ethereum: "data:image/png;base64,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",
        ripple: "data:image/jpeg;base64,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",
        litecoin: "data:image/jpeg;base64,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"

    }

    function getImage (currencyName) {
        //set URL to key in object
        var url = imageObj[currencyName];
        //display image
        $("#coinImg").attr("src", url);
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
