const navLinks = document.querySelectorAll('.nav-links')


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
