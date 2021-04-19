const navLinks = document.querySelectorAll('.nav-links')

// scroll
const hacksScroll = (sectionID) => {
    hideMenu()

    if (sectionID === '#') {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    } else {
        let offSet = document.getElementById(sectionID).offsetTop
        window.scrollTo({
            top: offSet,
            left: 0,
            behavior: 'smooth',
        })
    }
}

// navigation
for (let index = 0; index < navLinks.length; index++) {
    navLinks[index].addEventListener('click', function () {
        {
            for (let i = 0; i < index; i++) {
                document
                    .getElementById(`dot--${i}`)
                    .classList.remove('active', 'go-down')
                document.getElementById(`dot--${i}`).classList.add('go-up')
            }

            document
                .getElementById(`dot--${index}`)
                .classList.remove('go-down', 'go-up')
            document.getElementById(`dot--${index}`).classList.add('active')

            for (let i = navLinks.length - 1; i > index; i--) {
                document
                    .getElementById(`dot--${i}`)
                    .classList.remove('active', 'go-up')
                document.getElementById(`dot--${i}`).classList.add('go-down')
            }
        }
    })
}

// events
const dayOneEvent = document.getElementById('day-one')
const dayTwoEvent = document.getElementById('day-two')

const eventMoreDetails = document.getElementsByClassName('event-more-details')
const eventPopup = document.getElementsByClassName('event-popup')
const closePopupBtn = document.querySelectorAll('.close')
const overlay = document.querySelectorAll('.popup-overlay')

dayOneEvent.addEventListener('click', () => {
    dayOneEvent.classList.add('active')
    dayTwoEvent.classList.remove('active')

    document.querySelector('.day-one-schedule').style.display = 'block'
    document.querySelector('.day-two-schedule').style.display = 'none'
})
dayTwoEvent.addEventListener('click', () => {
    dayOneEvent.classList.remove('active')
    dayTwoEvent.classList.add('active')

    document.querySelector('.day-one-schedule').style.display = 'none'
    document.querySelector('.day-two-schedule').style.display = 'block'
})

for (let i = 0; i < eventMoreDetails.length; i++) {
    eventMoreDetails[i].addEventListener('click', () => {
        for (let j = 0; j < eventPopup.length; j++) {
            if (j == i) {
                eventPopup[j].style.display = 'block'
            } else {
                eventPopup[j].style.display = 'none'
            }
        }
    })
}

const closePopup = () => {
    for (let j = 0; j < eventPopup.length; j++) {
        eventPopup[j].style.display = 'none'
    }
}

closePopupBtn.forEach((el) => {
    el.addEventListener('click', closePopup)
})
overlay.forEach((el) => {
    el.addEventListener('click', closePopup)
})

// event menu
const closeMenuBtn = document.querySelector('.menu-close-btn')
const menuList = document.querySelector('.menu-list')
let menuFlag = 0

function showMenu() {
    closeMenuBtn.textContent = 'CLOSE';
    menuFlag = 1
    menuList.style.transform = 'translate(-50%, -105%) scale(1)'
    menuList.style.opacity = '1'
    menuList.style.display = 'flex'
    menuList.style.zIndex = '1000'
}
function hideMenu() {
    closeMenuBtn.textContent = 'MENU';
    menuFlag = 0
    menuList.style.opacity = '0'
    menuList.style.transform = 'translate(-50%, -40%) scale(0)'
    menuList.style.zIndex = '-10'
}
closeMenuBtn.addEventListener('click', () => {
    menuFlag ? hideMenu() : showMenu()
})

closeMenuBtn.addEventListener('mouseover', () => {
    closeMenuBtn.style.transform = 'scale(1.1)'
    closeMenuBtn.style.boxShadow = '0px 10px 10px rgba(0, 0, 0, .4)'
})
closeMenuBtn.addEventListener('mouseout', () => {
    closeMenuBtn.style.transform = 'scale(1)'
    closeMenuBtn.style.boxShadow = 'none'
})

hideMenu()
    closeMenuBtn.addEventListener('click', () => {
      menuFlag ? hideMenu() : showMenu();
    });

    closeMenuBtn.addEventListener('mouseover', () => {
      closeMenuBtn.style.transform = 'scale(1.1)';
      closeMenuBtn.style.boxShadow = '0px 10px 10px rgba(0, 0, 0, .4)';
    });
    closeMenuBtn.addEventListener('mouseout', () => {
      closeMenuBtn.style.transform = 'scale(1)';
      closeMenuBtn.style.boxShadow = 'none';
    });

    hideMenu();

//gallery
(function() {
    "use strict";
  
    /**
     * Gallery Slider
     */
  
    new Swiper('.gallery-slider', {
      speed: 400,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        575: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 20
        }
      }
    });
  
    /**
     * Initiate gallery lightbox 
     */
    const galleryLightbox = GLightbox({
      selector: '.gallery-lightbox'
    });
  
    /**
     * Buy tickets select the ticket type on click
     */
    on('show.bs.modal', '#buy-ticket-modal', function(event) {
      select('#buy-ticket-modal #ticket-type').value = event.relatedTarget.getAttribute('data-ticket-type')
    })
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
  
  })()
