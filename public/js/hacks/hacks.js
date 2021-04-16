const navLinks = document.querySelectorAll('.nav-links')

// scroll
const hacksScroll = (sectionID) => {
    if(sectionID === '#') {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    } else {
    let offSet = document.getElementById(sectionID).offsetTop;
    window.scrollTo({
        top: offSet,
        left: 0,
        behavior: 'smooth',
    });
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
