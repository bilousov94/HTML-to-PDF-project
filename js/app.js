/**
 * Created by Valentyn on 1/15/2017.
 */
// client id 101872805300-p0vktnldhovto4gtcb49bedmpqe8s8ve.apps.googleusercontent.com
//client secret VdBNur1kH7ncNbnhBx1MNS1C






 var ACCESS_PARAMETRS = {

     url: "http://api.pdflayer.com/api/convert",
     access_key: "67cf67ded4601ce0408b506b4a9436eb"


     };

    var CONVERT = {
        init: function(link){
            CONVERT.convertMethod(link);
        },

        convertMethod: function(url){

            var data = {


                access_key:  ACCESS_PARAMETRS.access_key,
                document_url: url ,
                inline: "1"

            };

           CONVERT.requestTemp(data);

        },

        requestTemp: function(data){

             $.ajax(ACCESS_PARAMETRS.url, {

                dataType: "json",
                data: data,
                complete: CONVERT.renderTemp(data.document_url)
            });
        },

        renderTemp: function(ur){
           window.location.href = "http://api.pdflayer.com/api/convert?access_key=67cf67ded4601ce0408b506b4a9436eb&document_url=" +ur + "&inline=1";

        }


        };







