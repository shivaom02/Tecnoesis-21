const navLinks = document.querySelectorAll('.nav-links')
const sections = document.querySelectorAll('.section');

// scroll
const hacksScroll = (sectionID) => {
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
            for (let i = 0; i < index; i++) {
                document
                    .getElementById(`dot--${i}`)
                    .classList.remove('active', 'go-down', 'active-white', 'dot-white');
                document.getElementById(`dot--${i}`).classList.add('go-up', 'dot');
            }

            document
                .getElementById(`dot--${index}`)
                .classList.remove(
                    'go-down',
                    'go-up',
                    'active-white',
                    'dot-white'
                )
            document.getElementById(`dot--${index}`).classList.add('active', 'dot');

            for (let i = navLinks.length - 1; i > index; i--) {
                document
                    .getElementById(`dot--${i}`)
                    .classList.remove('active', 'go-up', 'dot-white', 'active-white');
                document.getElementById(`dot--${i}`).classList.add('go-down', 'dot');
            }

                if (index === 0) {
                    for (let i = 1; i < 5; i++) {
                        document
                            .getElementById(`dot--${i}`)
                            .classList.remove('active', 'go-up', 'dot')
                        document
                            .getElementById(`dot--${i}`)
                            .classList.add('go-down', 'dot-white')
                    }
                    document
                        .getElementById(`dot--${index}`)
                        .classList.remove('go-down', 'go-up', 'active', 'dot')
                    document
                        .getElementById(`dot--${index}`)
                        .classList.add('active-white', 'dot-white')
                }
    });
}

// update nav on scroll 
window.addEventListener('scroll', () => {
    let current ='', index;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(pageYOffset >= sectionTop- 250 ) {
            current = section.getAttribute('id');
        };
    })
    if(current === '' ) index=0;
    else if(current === 'about') index=1;
    else if (current === 'events') index =2;
    else if (current === 'team') index =3;
    else if(current === 'contact') index =4;

       for (let i = 0; i < index; i++) {
           document
               .getElementById(`dot--${i}`)
               .classList.remove(
                   'active',
                   'go-down',
                   'active-white',
                   'dot-white'
               )
           document.getElementById(`dot--${i}`).classList.add('go-up', 'dot')
       }
    document
        .getElementById(`dot--${index}`)
        .classList.remove('go-down', 'go-up', 'active-white', 'dot-white')
    document.getElementById(`dot--${index}`).classList.add('active', 'dot');

    for (let i = navLinks.length - 1; i > index; i--) {
        document.getElementById(`dot--${i}`).classList.remove('active', 'go-up', 'active-white', 'dot-white')
        document.getElementById(`dot--${i}`).classList.add('go-down', 'dot');
    }

     if (index === 0) {
         for (let i = 1; i < 5; i++) {
             document
                 .getElementById(`dot--${i}`)
                 .classList.remove('active', 'go-up', 'dot')
             document
                 .getElementById(`dot--${i}`)
                 .classList.add('go-down', 'dot-white')
         }
         document
             .getElementById(`dot--${index}`)
             .classList.remove('go-down', 'go-up', 'active', 'dot')
         document
             .getElementById(`dot--${index}`)
             .classList.add('active-white', 'dot-white')
     }

})

// events
const dayOneEvent = document.getElementById('day-one');
const dayTwoEvent = document.getElementById('day-two');

const eventMoreDetails = document.getElementsByClassName('event-more-details');
const eventPopup = document.getElementsByClassName('event-popup');
const closePopupBtn = document.querySelectorAll('.close');
const overlay = document.querySelectorAll('.popup-overlay');

dayOneEvent.addEventListener('click', () => {
    dayOneEvent.classList.add('active');
    dayTwoEvent.classList.remove('active');

    document.querySelector('.day-one-schedule').style.display = 'block';
    document.querySelector('.day-two-schedule').style.display = 'none';
})

dayTwoEvent.addEventListener('click', () => {
    dayOneEvent.classList.remove('active');
    dayTwoEvent.classList.add('active');

    document.querySelector('.day-one-schedule').style.display = 'none';
    document.querySelector('.day-two-schedule').style.display = 'block';
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