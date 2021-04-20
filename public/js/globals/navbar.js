const navbtn = document.getElementById('navbtn')
const blackMain = document.querySelector('.navbar')

navbtn.addEventListener('click', (e) => openNavbar(e))

function openNavbar(e) {
    blackMain.classList.toggle('navopen')
    if(!navbtn.classList.contains('opened')){
        blackMain.style.zIndex = "2"
        if(screen.width <= 430)
        document.querySelectorAll('.line').forEach(line => {
            line.style.stroke = 'black';
        })
    }
    else{
        blackMain.style.zIndex = "1000"
        if(screen.width <= 430)
        document.querySelectorAll('.line').forEach(line => {
            line.style.stroke = 'white';
        })
    }
}
