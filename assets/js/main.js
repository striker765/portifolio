/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}





(function() {
    "use strict";

    var carousel = document.getElementsByClassName('carousel')[0],
        slider = carousel.getElementsByClassName('carousel__slider')[0],
        items = carousel.getElementsByClassName('carousel__slider__item'),
        prevBtn = carousel.getElementsByClassName('carousel__prev')[0],
        nextBtn = carousel.getElementsByClassName('carousel__next')[0];
    
    var width, height, totalWidth, margin = 20,
        currIndex = 0,
        interval, intervalTime = 4000;
    
    function init() {
      resize();
      move(currIndex);
      bindEvents();
      timer();
    }
    
    function resize() {
      width = Math.max(window.innerWidth * 0.25, 275);
      height = window.innerHeight * 0.5;
      totalWidth = width * items.length;
      
      slider.style.width = totalWidth + "px";
      
      for (var i = 0; i < items.length; i++) {
        let item = items[i];
        item.style.width = (width - (margin * 2)) + "px";
        item.style.height = height + "px";
      }
      
      move(currIndex); // Ajusta a posição após o redimensionamento
    }
    
    function move(index) {
      if (index < 0) index = items.length - 1;
      if (index >= items.length) index = 0;
      currIndex = index;
      
      for (var i = 0; i < items.length; i++) {
        let item = items[i],
            box = item.getElementsByClassName('item__3d-frame')[0];
        if (i === currIndex) {
          item.classList.add('carousel__slider__item--active');
          box.style.transform = "perspective(1200px)"; 
        } else {
          item.classList.remove('carousel__slider__item--active');
          let rotateY = (i < currIndex) ? 40 : -40;
          box.style.transform = `perspective(1200px) rotateY(${rotateY}deg)`;
        }
      }
      
      slider.style.transform = `translate3d(${-(currIndex * (width - margin * 2)) + window.innerWidth / 2 - width / 2}px, 0, 0)`;
    }
    
    function timer() {
      clearInterval(interval);
      interval = setInterval(() => {
        move(currIndex + 1);
      }, intervalTime);
    }
    
    function prev() {
      move(currIndex - 1);
      timer();
    }
    
    function next() {
      move(currIndex + 1);
      timer();
    }
    
    function bindEvents() {
      window.addEventListener('resize', resize);
      prevBtn.addEventListener('click', prev);
      nextBtn.addEventListener('click', next);
    }

    init();
})();
