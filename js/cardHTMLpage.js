/**
 * Created by Valentyn on 1/30/2017.
 */
$(document).ready(function(){
var newArray = [];
var currentUser;
var url_global;
var cardT = {


    cardHTML: function (array) {
        $("#tel").text("Tel: " + array.phone);
        $("#fax").text("Fax: " + array.fax);
        $("#fullName").text(array.name);
        $("#title").text(array.title);
        $("#adrOne").text(array.adress_first);
        $("#adrTwo").text(array.adress_second);
        $("#email").text(array.email);
    },

    addCont: function(inputs){
        return cardT.cardHTML(inputs);

    },

    finalData: [],

    addToAr: function(){

        var ref = firebase.database().ref("users/" + currentUser.uid);
        ref.once("value")
            .then(function(snapshot) {
                var name = snapshot.child("name").val();
                var email = snapshot.child("email").val();
                var adressOne = snapshot.child("adressOne").val();
                var adressTwo = snapshot.child("adressTwo").val();
                var fax = snapshot.child("fax").val();
                var phone = snapshot.child("phone").val();
                var title = snapshot.child("title").val();

                cardT.finalData.name = name;
                cardT.finalData.email = email;
                cardT.finalData.adress_first = adressOne;
                cardT.finalData.adress_second = adressTwo;
                cardT.finalData.fax = fax;
                cardT.finalData.phone = phone;
                cardT.finalData.title = title;

                cardT.redirect(cardT.finalData);

            });



    },

    redirect: function(data_url){

        url_global = "?username=" + data_url.name + '&email=' + data_url.email + '&adress_first=' + data_url.adress_first +
             '&adress_second=' + data_url.adress_second + '&fax=' + data_url.fax + '&phone=' + data_url.phone + '&title=' + data_url.title;
       var str = url_global.split("&");
        window.location.href = str;


    }






};


    var qs = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split(','));

        if (qs['username']){
            newArray.name = qs['username'];
            newArray.email = qs['email'];
            newArray.adress_first = qs['adress_first'];
            newArray.adress_second= qs['adress_second'];
            newArray.phone = qs['phone'];
            newArray.title = qs['title'];
            newArray.fax = qs['fax'];
            var card_value = cardT.addCont(newArray);
                $(".card_templ").html(card_value);
            var url1 = window.location.href;
            CONVERT.init(url1);
        }

    else
    {

        alert("please log in again");
        firebaseAuth.signInWithPopup(provider).then(function (user) {

            if (user) {
                currentUser = user.user;
                cardT.addToAr();

            }
            else {

                firebaseAuth.signInWithPopup(provider).then(function (user) {

                }).catch(function (error) {
                    alert(error);
                })
            }
        });
    }




});