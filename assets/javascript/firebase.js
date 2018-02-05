// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUKCR3msc7dlhW1oFwnJz2Yimvoz7ub7c",
    authDomain: "homeawayfromhomeproject-80afd.firebaseapp.com",
    databaseURL: "https://homeawayfromhomeproject-80afd.firebaseio.com",
    projectId: "homeawayfromhomeproject-80afd",
    storageBucket: "",
    messagingSenderId: "493808609979"
  };
  firebase.initializeApp(config);

  //create a variable to reference the database
  var database = firebase.database();
  //Initial values
  var name = "";
  var email = "";
  var feedback = "";
  //Once the user click the submit, it triggers this function
  $("#submit-button").on('click', function() {
  	 //prevent the page from refreshing
  	 event.preventDefault();

  	 //get inputs from users
  	 name = $("#name-input").val().trim();
  	 email = $("#email-input").val().trim();
  	 feedback = $("#feedback-input").val().trim();
  	 //pushing users infos
  	 database.ref().push({
  	 	name: name,
  	 	email: email,
  	 	feedback: feedback,
  	 	dateAdded: firebase.database.ServerValue.TIMESTAMP
  	 });

  	});
  	//Adding the child for each user's input and show it on the screan
	database.ref().on("child_added", function(childSnapshot) {
   		console.log(childSnapshot.val().name);

   		var name = childSnapshot.val().name;
   		var email = childSnapshot.val().email;
   		var feedback = childSnapshot.val().feedback;
   		//full list of feedback from users

      $("#feedback-table > tbody").append("<tr><td>" + name + "</td><td>" + feedback + 
     "</td></tr>");

  	 	// $("#full-member-list").append("<div class='lists'><span id='name'>" + childSnapshot.val().name 
  	 	// 	+ "</span><br><span id=feedback>" + childSnapshot.val().feedback + "</span></div>");
  	 //Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


