$(function(){

/******* SCROLL TO ********/

$('.scroll-link').on('click', function(){
  var $target = this.hash;
  var $div = $($target);
  var $divTop = $div.offset().top;

  if($div.length){
    $('html, body').animate({
      scrollTop: $divTop,
    }, 800)};
});

});



/***** PARALLAX EFFECT *******/

function parallax_effect() {
  var parallaxes = document.querySelectorAll('.parallax-js');
  var scrollY = window.scrollY;

  parallaxes.forEach(parallax => {
      var elTop = parallax.offsetTop;
      parallax.style.backgroundPosition = '50% '+ Math.round((elTop - scrollY)*3/8)+'px';
  });
}


/******** SLIDE ELEMENT WHEN SCROLL ********/

function sliderElement() {

    const sliderElements = document.querySelectorAll('.slide-in');
    const distance = 50;

     sliderElements.forEach(sliderElement => {
       const windowHalf = window.scrollY + (window.innerHeight / 2);
       const parentElement = sliderElement.parentElement.parentElement.parentElement;
       const parentElementTop = parentElement.offsetTop;
       const elementTop = sliderElement.offsetTop + parentElementTop;
       const isShown = ((elementTop - windowHalf) <= distance);
       if (isShown){
         sliderElement.classList.add('active');
       } else {
         sliderElement.classList.remove('active');
       };
     });
};
  window.addEventListener('scroll', function(){
    sliderElement();
    parallax_effect();
  });
