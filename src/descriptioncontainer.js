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

const closeStart = () => {
    const start = document.getElementById('start-layout')
    start.style.display = 'none'
}