/**
 * Created by Valentyn on 1/30/2017.
 */
    var config = {
        apiKey: "AIzaSyAkjLRdSQ_hkqAYPP0M4oI5dFP2Ypndcu0",
        authDomain: "businesstool-f0480.firebaseapp.com",
        databaseURL: "https://businesstool-f0480.firebaseio.com",
        storageBucket: "businesstool-f0480.appspot.com",
        messagingSenderId: "239323864760"
    };
    firebase.initializeApp(config);


    var firebaseAuth = firebase.auth();
    var provider = new firebase.auth.GoogleAuthProvider();
    var currentUser;


    //firebaseAuth.onAuthStateChanged(function(user){
    //    if (user) {
    //        $("#user").text("Login as: " + user.email);
    //        //cardData = db.ref("users/" + user.uid + "/cardData");
    //        currentUser = result.user;
    //        writeData(currentUser);
    //    }
    //    else {
    //        firebaseAuth.signInWithPopup(provider).then(function(result){
    //
    //        }).catch(function(error){
    //            alert(error);
    //        })
    //    }
    //});
$("#user").on("click", function(){
  signIn.logInMethod();


});

var signIn = {
   logInMethod: function() {
       firebaseAuth.signInWithPopup(provider).then(function (result) {
           firebaseAuth.onAuthStateChanged(function (user) {
               if (user) {
                   currentUser = result.user;
                   $("#user").text("Logout: " + currentUser.email);
               }
               else {
                   firebaseAuth.signInWithPopup(provider).then(function (result) {

                   }).catch(function (error) {
                       alert(error);
                   })
               }
           });
       });
   }


};




