const closePopup = () => {
    const description = document.getElementById('description')
    description.style.display = 'none'
}
const preventClick = () => {
    window.event.stopPropagation()
}