const closePopup = () => {
    const video = document.getElementById('video-frame')
    if (video) {
        video.src = '#'
    }
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
    const video = document.getElementById('start-video')
    if (video) {
        video.src = '#'
    }
    const start = document.getElementById('start-layout')
    start.style.display = 'none'
}

const playLeft = () => {
    const startContainer = document.getElementById('start-container')
    startContainer.style.display = 'none'
    const videoContainer = document.getElementById('selected-video')
    videoContainer.style.display = 'flex'
    videoContainer.style.width = '80%'
    videoContainer.style.height = '80%'
    const video = document.getElementById('start-video')
    video.src = 'https://player.vimeo.com/video/836889962?h=86078262d3&autoplay=1'
}

const playRight = () => {
    const startContainer = document.getElementById('start-container')
    startContainer.style.display = 'none'
    const videoContainer = document.getElementById('selected-video')
    videoContainer.style.display = 'flex'
    videoContainer.style.width = '95%'
    videoContainer.style.height = '50%'
    const video = document.getElementById('start-video')
    video.src = 'https://player.vimeo.com/video/8283842?h=824686ffff&autoplay=1'
}

const backToStart = () => {
    const video = document.getElementById('start-video')
    if (video) {
        video.src = '#'
    }
    const videoContainer = document.getElementById('selected-video')
    videoContainer.style.display = 'none'
    const startContainer = document.getElementById('start-container')
    startContainer.style.display = 'flex'
}

const playVideo = () => {
    const playBox = document.getElementById('video-description')
    const videoBox = document.getElementById('video-player')
    console.log(videoBox)
    videoBox.style.display = 'flex'
    playBox.style.display = 'none'
}
