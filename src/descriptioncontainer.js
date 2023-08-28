const closePopup = () => {
    const description = document.getElementById('description')
    description.style.display = 'none'
}
const preventClick = () => {
    window.event.stopPropagation()
}
const closeLoading = () => {
    const loading = document.getElementById('loading-layer')
    setTimeout(() => {
        loading.style.display = 'none'
    }, 5000)
}