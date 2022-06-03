$(document).ready(function () {
    let infoIcon = document.querySelectorAll('._info-icon')

    infoIcon.forEach(icon => {
        icon.addEventListener('click', (e) => {
            console.log('Click');
            e.target.closest('.card-scaf').classList.toggle('__show-info');
        })
    })
})
