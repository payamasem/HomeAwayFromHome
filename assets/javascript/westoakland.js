// Code included inside $( document ).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.
$( document ).ready(function() {
 // setting up initial variables
  var map;
  var infowindow;

  var request;
  var service;
  var markers = [];

  function initialize(){
    //center is necessary to center map somewhere (in div?)
    var center = new google.maps.LatLng(37.8139,-122.2909); //lat and long of google coordinates
    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 14
    }); //zoom if you put 1, you look at whole globe

    //8000m / 5mile radius around center of map for wine, restaurants, coffee shops, stores, gas stations
    request = {
      location: center,
      radius: 8000,
      keyword: 'wine'
    };

    infowindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request,callback);

    
    var request2 = {
      location: center,
      radius: 8000,
      keyword: 'japanese'
    };

    infowindow = new google.maps.InfoWindow();

    var service2 = new google.maps.places.PlacesService(map);

    service2.nearbySearch(request2,callback);



    var request3 = {
      location: center,
      radius: 8000,
      keyword: 'coffee'
    };

    infowindow = new google.maps.InfoWindow();

    var service3 = new google.maps.places.PlacesService(map);

    service3.nearbySearch(request3,callback);


    var request4 = {
      location: center,
      radius: 8000,
      keyword: 'beer'
    };

    infowindow = new google.maps.InfoWindow();

    var service4 = new google.maps.places.PlacesService(map);

    service4.nearbySearch(request3,callback);


    var request5 = {
      location: center,
      radius: 8000,
      types: ['store']
    };

    infowindow = new google.maps.InfoWindow();

    var service5 = new google.maps.places.PlacesService(map);

    service5.nearbySearch(request3,callback);



    var request6 = {
      location: center,
      radius: 8000,
      types: ['gas_station']
    };

    infowindow = new google.maps.InfoWindow();

    var service6 = new google.maps.places.PlacesService(map);

    service6.nearbySearch(request6,callback);



  //this allows map to update and recall service.nearbySearch, if user right clicks and moves pointer to another location
  google.maps.event.addListener(map, 'rightclick', function(event){
      map.setCenter(event.latLng);
      clearResults(markers);

      var request = {
        location: event.latLng,
        radius: 8047,
        types: ['cafe']
      };
      service.nearbySearch(request, callback);
    });

  }

  //ensures we get back good results and that no error connecting to server
  //gets all the results into array, and gives them a marker
  function callback(results, status){
    if(status == google.maps.places.PlacesServiceStatus.OK){
      for(var i = 0; i < results.length; i++){
        markers.push(createMarker(results[i]));
      }
    }
  }
  // ensures we have red markers on places we are looking for
  function createMarker(place){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });

    return marker;
  }

  // When you move the map it will clear the markers 
  function clearResults(markers){
    for (var m in markers){
      markers[m].setMap(null);
    }
    markers = [];
  }

  //on status load, will call function "initialize", and target that to browser window
  google.maps.event.addDomListener(window, 'load', initialize);

  // calling wikipedia Api
  // Ajax call with query URL and herokuapp to prevent CORS issue

  var queryURL1 = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=West_Oakland,_Oakland,_California"
  var proxy = 'https://cors-anywhere.herokuapp.com/';
    
  $.ajax({
          url: proxy + queryURL1,
          method: 'GET' 
        }).done(function(response){
    

            console.log(response);
            console.log(response.query.pages[2373639].extract);
            $("#content").html("<p>"+ response.query.pages[2373639].extract + "</p>")
  });

  // calling wikipedia Api
  // Ajax call with query URL and herokuapp to prevent CORS issue      

  var queryURL2 = "http://api.walkscore.com/score?format=json&address=Prescott+Oakland+CA+94607&lat=37.8139&lon=-122.2909&wsapikey=24c9469a038f55c85cbbba8abeadcfcb";
  var proxy = 'https://cors-anywhere.herokuapp.com/';
    
  $.ajax({
        url: proxy + queryURL2,
        method: 'GET'
      }).done(function(response) {
        console.log(response);
        console.log(response.walkscore);
        console.log(response.logo_url);
        $("#walkscore").html("<h3>" +response.description+ "</h3>");
        $("#walkscore").append("<img src = '" + response.logo_url + "'>");
        $("#walkscore").append("<p>Walkscore around the area : " + response.walkscore + "</p>");

  });

});

    

 