import $ from 'jquery';
import 'bootstrap';

$(document).ready(function () {

    $(".nav-toggle").click(function(evt){
      evt.stopPropagation();
      // ici on met evt.stopPropagation pour pouvoir fermer le burger en cliquant plus bas
    $("body").toggleClass("nav-expanded");
    
    });
    
    $(".main-nav .has-sublist > a").click(function(evt){
    //le > permet de déscendre sur l'enfant direct, le a et pas les autres a enfants
    evt.stopPropagation();
    evt.preventDefault();
    $(".main-nav .has-sublist ul").slideUp();
    $(this).next("ul").stop(true).slideToggle();
    $(".main-nav .has-sublist > a").not(this).removeClass("expanded");
    $(this).toggleClass("expanded");
    });
    
    $("body").click(function(){
      $("body").removeClass("nav-expanded");
      $(".main-nav .has-sublist ul").slideUp();
      $(".main-nav .has-sublist > a").not(this).removeClass("expanded");
    });
    
    
    });

