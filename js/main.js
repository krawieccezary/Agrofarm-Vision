$(function(){

/******* SCROLL TO ********/

$('.scroll-link').on('click', function(e){
   e.preventDefault();
  var $target = this.hash;
  var $div = $($target);
  var $divTop = $div.offset().top;

  if($div.length){
    $('html, body').animate({
      scrollTop: $divTop,
    }, 800)};
});

});  /****** END JQUERY *******/




/****** NAV BG-BLACK *******/
function black_bg_nav() {
   var scrollY = window.scrollY;
   var headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
   var nav = document.getElementsByClassName('navbar')[0];

   if(scrollY >= headerHeight && window.innerWidth >= 768) {
      nav.classList.add('black-bg-color');
   } else {
      nav.classList.remove('black-bg-color');
   }
}


/****** SWITCH NAV *******/

function switch_nav(){
   var nav = document.getElementsByClassName('navbar')[0];
   var links = nav.querySelectorAll('.nav-link');
   var scrollY = window.scrollY;
   var sections = document.querySelectorAll('section');
   var currentURL = '';

   if (scrollY < 50) {
      links.forEach(link => {
         link.classList.remove('active-link');
      });
   }

   sections.forEach(section => {
      var sectionTop = section.offsetTop;
      var sectionId = '#' + section.getAttribute('id');
      var distance = Math.abs(scrollY - sectionTop);

      if (distance < 50 && currentURL !== sectionId ) {
         // console.log('aaaaa');
         links.forEach(link => {
            var hash = link.getAttribute('href');
            currentURL = hash;
            link.classList.remove('active-link');

            if (sectionId == hash) {
               link.classList.add('active-link');
               history.pushState(null, null, currentURL);
            }
         });
      }
   });
}


/***** PARALLAX EFFECT *******/

var images = [].slice.call(document.querySelectorAll('.parallax-js'));

function getViewportHeight() {
    var a = document.documentElement.clientHeight, b = window.innerHeight;
    return a < b ? b : a;
}

function getViewportScroll() {
    if(typeof window.scrollY != 'undefined') {
        return window.scrollY;
    }
    if(typeof pageYOffset != 'undefined') {
        return pageYOffset;
    }
    var doc = document.documentElement;
    doc = doc.clientHeight ? doc : document.body;
    return doc.scrollTop;
}

function parallax_effect() {
    var el, elOffset, elHeight,
        offset = getViewportScroll(),
        vHeight = getViewportHeight();

    for(var i in images) {
        el = images[i];
        elOffset = el.offsetTop;
        elHeight = el.offsetHeight;

        if((elOffset > offset + vHeight) || (elOffset + elHeight < offset)) { continue; }

        el.style.backgroundPosition = '50% '+Math.round((elOffset - offset)*3/8)+'px';
    }
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
    black_bg_nav();
    switch_nav();
  });



/************ WALIDACJA FORMULARZA **************/

const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input[required], textarea[required]');

//wyłączamy domyślną walidację
form.setAttribute('novalidate', true);

function showFieldError(elem){
   const formGroup = elem.closest('.form-group');
   console.log(formGroup);
   const fieldError = formGroup.querySelector('.field-error');

   if (fieldError === null) {
      const errorText = elem.dataset.error;
      const divError = document.createElement('div');
      divError.classList.add('field-error');
      divError.innerText = errorText;
      formGroup.appendChild(divError);
   }
}

function hideFieldError(elem) {
   const formGroup = elem.closest('.form-group');
   const fieldError = formGroup.querySelector('.field-error');

   if(fieldError !== null){
      fieldError.remove();
   }
}

[...inputs].forEach(elem => {
   elem.addEventListener('input', function(){
      if(!this.checkValidity()){
         this.classList.add('error');
      } else {
         this.classList.remove('error');
         hideFieldError(this);
      }
   });
});

function checkFieldsErrors(elements){
   let fieldsAreValid = true;

   [...elements].forEach(elem => {
      if(elem.checkValidity()){
         hideFieldError(elem);
         elem.classList.remove('error');
      } else {
         showFieldError(elem);
         elem.classList.add('error');
         fieldsAreValid = false;
      }
   });
   return fieldsAreValid;
};

form.addEventListener('submit', e => {
   e.preventDefault();

   if (checkFieldsErrors(inputs)){
      const elements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled)');
      const dataToSend = new FormData();

      [...elements].forEach(el => dataToSend.append(el.name,el.value));

      const button = form.querySelector('input[type=submit]');
      button.disabled = true;
      button.classList.add('element-is-busy');

      const action = form.getAttribute('action');
      const method = form.getAttribute('method');

      fetch(action, {
         method: method,
         body: dataToSend
      })
      .then (ret => ret.json())
      .then (ret => {
         button.disabled = false;
         button.classList.remove('element-is-busy');
      }).catch(_ => {
         button.disabled = false;
         button.classList.remove('element-is-busy');
      });
   }
});
