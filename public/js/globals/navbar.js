const navbtn = document.getElementById('navbtn')
const blackMain = document.querySelector('.navbar')

navbtn.addEventListener('click', (e) => openNavbar(e))

function openNavbar(e) {
    blackMain.classList.toggle('navopen')
}
