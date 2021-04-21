// events
const event_MoreDetails = document.getElementsByClassName('event-more-details_c');
const event_Popup = document.getElementsByClassName('event-popup_c');
const close_PopupBtn = document.querySelectorAll('.close_c');
const overlay_ = document.querySelectorAll('.popup-overlay_c');

const close_Popup = () => {
    for (let j = 0; j < event_Popup.length; j++) {
        event_Popup[j].style.display = 'none';
    }
}

for (let i = 0; i < event_MoreDetails.length; i++) {
    event_MoreDetails[i].addEventListener('click', () => {

        close_Popup();

        for (let j = 0; j < event_Popup.length; j++) {
            if (j == i) {
                event_Popup[j].style.display = 'block';
            } else {
                event_Popup[j].style.display = 'none';
            }
        }
    })
}

close_PopupBtn.forEach((el) => {
    el.addEventListener('click', close_Popup);
})
overlay_.forEach((el) => {
    el.addEventListener('click', close_Popup);
})