$(function() {
        $('#title-text').fadeIn(3000);
        $('#start').fadeIn(3000);
        $('#start').click(function(){
           $('#background').fadeOut(1000);
           $(this).fadeOut(1000);
           $('#upload-form').fadeIn(1500);
       });

        $('#upload').click(function() {
           $('#upload-form').fadeOut(1000);
           $('#app').fadeIn(1000);
       });
    });