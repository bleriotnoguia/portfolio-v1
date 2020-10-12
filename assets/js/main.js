//--- To manage smart feedback to user after he fill the form -----
$("#idFormDevis").submit(
   function(){
       event.preventDefault(); 
       swal({
             title: "Confirmation !",
             text: "En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre de la demande de devis et de la relation commerciale qui peut en découler.",
             icon: "info",
//              showCancelButton: true,
             buttons: ["Annuler", "Ok, Envoyer !"],
             closeOnClickOutside: false
           })
           .then((willSend) => {
             if (willSend) {
                     // -------- Gestion de la demande de devis --------
                    // --------- POST REQUEST

                        //serialize form data
                        var url = $('form').serialize();

                        //function to turn url to an object
                        function getUrlVars(url) {
                            var hash;
                            var myJson = {};
                            var hashes = url.slice(url.indexOf('?') + 1).split('&');
                            for (var i = 0; i < hashes.length; i++) {
                                hash = hashes[i].split('=');
                                myJson[hash[0]] = hash[1];
                            }
                            return JSON.stringify(myJson);
                        }

                        //pass serialized data to function
                        var objUrl = getUrlVars(url);

                        //post with ajax
                        $.ajax({
                            type:"POST",
                            url: "app/api/devis/create.php",
                            data: objUrl,
                            ContentType:"application/json",

                            success:function(){
                                swal("Votre message a bien été transmis ! Vous recevrez une réponse en moyenne sous 72h.", {
                                    icon: "success",
                                  });
                                document.getElementById("idFormDevis").reset();
                                //   $(document).scrollTop($(document).height());
                            },
                            error:function(){
                                swal("Votre message n'a pas été transmis ! Veillez vérifier aue vous avez bien renseigné tous les champs [Zone de saisie]. Merci !", {
                                    icon: "warning",
                                  });
                            }

                        });
               
             } else {
               swal("Votre message n'a pas été transmis ! Libre à vous de le retransférer si vous pensez avoir fais une erreur. Merci !", {
                 icon: "warning",
               });
             }
           });
   }
);

// $("#idFormDevis").submit(function(){
//     event.preventDefault();
//     $.ajax({
// //        dataType: "JSON",
//         url: 'sendmail.php',
//         type: "POST",
//         data: $('#idFormDevis').serialize(),
//         beforeSend: function(xhr){
//             $('#idBtnDevis').html('SENDING...');
//         },
//         success: function(response){
//             if(response){
//                 $('#msg2').html(response);
//                 if(response['signal'] == 'ok'){
//                    $('#msg').html('<div class="alert alert-success">'+'signal ok : '+ response['msg'] +'</div>');
//                     // clear form after successfuly submited
//                     $('input, textarea').val(function(){
//                         return this.defaultValue;
//                     });
//                    }else{
//                        $('#msg').html('<div class="alert alert-danger">'+'signal not ok :'+ response['msg'] +'</div>')
//                    }
//             }
//         },
//         error: function(){
//             $('#msg').html('<div class="alert alert-danger">Error occurs. Please try again later.</div>');
//         },
//         complete: function(){
//             $('#idBtnDevis').html('SEND MESSAGE');
//         }
//     })
//     return false;
// });

//$(".projet").parent().css("marginBottom","20px");
$(".nav-link ,#main-links + .btn-devis").not(document.getElementById("langMenuLink")).click(
    function(e){
//        e.preventDefault();
        $("#main-nav").toggleClass('show');
    }
);
//-------- To manage smart scrool effect---------

(function($) {
    // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .click(function(event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')&& 
      location.hostname == this.hostname){
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });
    //-------- To manage gototop button ---------
    $(window).scroll(function(){
        if($(document).scrollTop() > 200){
            document.getElementById('back-top').style="display: block";
        } else {
            document.getElementById('back-top').style="display: none";
        }
    });

    // To change nav color after scroll
    $(window).scroll(function(){
      if($(document).scrollTop() > 80){
        $('#nav-primary').addClass('shrink');
      }else{
        $('#nav-primary').removeClass('shrink');
      }
    });

})(jQuery);

