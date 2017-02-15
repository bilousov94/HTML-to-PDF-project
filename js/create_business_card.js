/**
 * Created by Valentyn on 1/24/2017.
 */
$(document).ready(function(){



    var Utils = {
        createCardPageTemplate: _.template(
'<div class="jumbotron">'+

    '<div class="container">' +
         '<form id = "card_form" class="form-horizontal col-lg-6">' +
             '<div class="form-group">' +
                '<label for="full-name">Name</label>' +
                '<input type="text" class="form-control" id="full-name" placeholder="Jane Doe">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="company-position">Company position</label>' +
                '<input type="email" class="form-control" id="company-position" placeholder="company position">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="adress_first">Adress 1</label>' +
                '<input type="text" class="form-control" id="adress_first" placeholder="adress 1">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="adress_second">Adress 2</label>' +
                '<input type="text" class="form-control" id="adress_second" placeholder="adress 2">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="phone-number">phone number</label>' +
                '<input type="email" class="form-control" id="phone-number" placeholder="(646)691-6466">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="fax">Fax</label>' +
                '<input type="text" class="form-control" id="fax" placeholder="Fax">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="email">email</label>' +
                '<input type="email" class="form-control" id="email" placeholder="johndoe@example.com">' +
            '</div>' +

        '</form>' +
        '<div id = "card" class = "col-lg-6">' +
             '<div class = "card_templ">' +
                '<h1 class="text-center"> <small>card content</small></h1>' +
             ' </div>' +
        '</div> ' +
    '</div>' +
    '<div class = container>' +
    '<button type="check" id = "check" class = "btn btn-info btn-lg btn-block">Check</button>' +
    '<button type="reset" id = "reset" class = "btn btn-danger btn-lg btn-block">Reset</button>' +
    '<button type = "submit" id = "submit" class = "btn btn-success btn-lg btn-block">Convert to PDF </button>' +
        '</div>' +
'</div>'
        ),



        business_card: _.template(
            '<div class = "contact_inf"><h5 class = "text-right">Tel: <%= phone_number  %></h5>' +
            '<h5 class = "text-right">Fax: <%= fax %></h5></div>' +
            '<h3 class = "text-center"><strong><%= name %></strong></h3>' +
            '<p class = "text-center"><%= title %></p>' +
            '<h3 class = "text-center"><small><%= adress_first %></small> ' +
            '<small><span class="glyphicon glyphicon-globe" aria-hidden="true"></span></small>' +
            '<small> <%= adress_second %> </small><br>' +
            '<small><%= email %></small></h3>'


        ),


        addValuesToBc: function(inputs){
            return Utils.business_card(inputs);
        },

        createNewPageContent: function(){
            return Utils.createCardPageTemplate();
        }

        };

    var App = {

        init: function(){
           App.bindEvents();
        },

        bindEvents: function(){

            App.mainEvent();
        },
        currentUser: null,

        inputValuesArray: [],

        mainEvent: function(){
          $("#create_card").on("click", function(e){
              e.preventDefault();
              var templ = Utils.createNewPageContent();
              $("#main_content").html(templ);
              App.cardShowMethod();
          });

            $("#btn_card").on("click", function(){

                var templ_btn = Utils.createNewPageContent();
                $("#main_content").html(templ_btn);
                App.cardShowMethod();
            });
        },

        cardShowMethod: function(){
            $("#reset").on("click", function(){
                $("#card_form")[0].reset();
            });

            $("#submit").on("click", function(){
             //  window.location.href = "card.html";

                if(currentUser){
                    window.location.href = "card-page/card.html";
                }
                else {
                    alert("Please Login");
                    signIn.logInMethod();

                }



            });

            $("#check").on("click", function(){

               if(currentUser){
                   App.arrayPush();
                   App.addContentToBC(App.inputValuesArray);
               }
                else {
                    alert("Please Login");
                   signIn.logInMethod();

               }



            })
        },

        //preSubmit: function(data){
        //    var lt = Utils.lastMet(data);
        //    $("#main_content").html(lt);
        //},


        arrayPush: function(){
            App.inputValuesArray.length = 0;
            App.inputValuesArray.name = $("#full-name").val();
            App.inputValuesArray.title = $("#company-position").val();
            App.inputValuesArray.adress_first = $("#adress_first").val();
            App.inputValuesArray.adress_second = $("#adress_second").val();
            App.inputValuesArray.phone_number = $("#phone-number").val();
            App.inputValuesArray.fax = $("#fax").val();
            App.inputValuesArray.email = $("#email").val();
        },

        addContentToBC: function(inputsValue){
           var card_value = Utils.addValuesToBc(inputsValue);
           $(".card_templ").html(card_value);

            App.addToFirebase(App.inputValuesArray);


        },

        addToFirebase: function(data){

            var db = firebase.database();
            db.ref("users/" + currentUser.uid).set({
                name: data.name,
                title: data.title,
                adressOne: data.adress_first,
                adressTwo: data.adress_second,
                phone: data.phone_number,
                fax: data.fax,
                email: data.email
            });

        }


    };

    App.init();

});
