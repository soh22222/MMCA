import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

THREE.ColorManagement.enabled = false

const videolinks = [{
    'main_video001': 'https://player.vimeo.com/video/859278565?h=b77063abec',
    'video003': 'https://player.vimeo.com/video/859276972?h=ab3ee6f928',
    'video001': 'https://player.vimeo.com/video/859278030?h=b1f4048c29',
},{
    'main_video001': 'https://player.vimeo.com/video/856998107?h=7901166727',
    'video003': 'https://player.vimeo.com/video/856999134?h=9ad574fde9',
    'video001': 'https://player.vimeo.com/video/856999618?h=f3c1be0ca2',
}]

/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

window.addEventListener('touchstart', (event) => {
    mouse.x = (event.touches[0].clientX / sizes.width) * 2 - 1
    mouse.y = - (event.touches[0].clientY / sizes.height) * 2 + 1
    const touchCursor = document.getElementById('touch-cursor')
    touchCursor.style.left = event.touches[0].clientX + 'px'
    touchCursor.style.top = event.touches[0].clientY + 'px'
})

window.addEventListener('touchmove', (event) => {
    const touchCursor = document.getElementById('touch-cursor')
    touchCursor.style.left = event.touches[0].clientX + 'px'
    touchCursor.style.top = event.touches[0].clientY + 'px'
})

const textureLoader = new THREE.TextureLoader()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('black')
scene.fog = new THREE.Fog("rgb(10, 10, 10)", 3, 40);

//plane
const geometry = new THREE.PlaneGeometry();
const geometry2 = new THREE.PlaneGeometry(5, 5);
const geometry3 = new THREE.PlaneGeometry(2, 2.3);

for (let i = 0; i < 6; i++) {
    const image1Material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(`/images/${i}.jpeg`)
    })

    const img = new THREE.Mesh(geometry3, image1Material)
    img.position.x = Math.random() * 20
    img.position.y = Math.random() * 20
    img.position.z = Math.random() * 20
    img.rotation.y = Math.random() * 10
    img.rotation.x = Math.random() * 10
}


let objs = []
scene.traverse((object) => {
    if (object.isMesh)
        objs.push(object)
})



//particle
const particlesGeometry = new THREE.BufferGeometry()
const ratioFactor = Math.min(window.devicePixelRatio, 2)
const count = 300
const positions = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 30
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))


const particlesMaterial = new THREE.PointsMaterial()
// const particlesMaterial2 = new THREE.PointsMaterial()

const particleTexture = textureLoader.load('texture/14.png')
// const particleTexture2 = textureLoader.load('texture/1.png')

particlesMaterial.size = 100 * ratioFactor * ratioFactor * ratioFactor
particlesMaterial.sizeAttenuation = true
particlesMaterial.color = new THREE.Color('white')
particlesMaterial.map = particleTexture
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
particlesMaterial.depthWrite = false

/**
particlesMaterial2.size = 50
particlesMaterial2.map = particleTexture2
particlesMaterial2.transparent = true
particlesMaterial2.alphaMap = particleTexture
particlesMaterial2.depthWrite = false
*/

const dust = new THREE.Points(particlesGeometry, particlesMaterial)
// const dust2 = new THREE.Points(particlesGeometry, particlesMaterial2)

const particles = new THREE.Group()
particles.add(dust)
// particles.add(dust2)

scene.add(particles)

//texture

const image1Texture = new THREE.TextureLoader().load("images/1.jpeg");
const image2Texture = new THREE.TextureLoader().load("images/3.jpeg");


//material

const image1Material = new THREE.MeshStandardMaterial(
    { map: image1Texture }

);
const image2Material = new THREE.MeshStandardMaterial(
    { map: image2Texture }
);

const plane = new THREE.InstancedMesh(geometry, image1Material);
const plane2 = new THREE.Mesh(geometry, image2Material);
const plane3 = new THREE.Mesh(geometry, image2Material);



const loader = new THREE.ImageLoader();


//plane 전체단위 랜덤 생성
for (var i = 0; i < 50; i++) {
    const plane = new THREE.Mesh(geometry, image1Material);

    plane.position.x = Math.random() * 20
    plane.position.y = Math.random() * 20
    plane.position.z = Math.random() * 20

    plane.rotation.y = Math.random() * 10
    plane.rotation.x = Math.random() * 10
}


for (var i = 0; i < 50; i++) {
    const plane2 = new THREE.Mesh(geometry, image2Material);

    plane2.position.x = Math.random() * 20
    plane2.position.y = Math.random() * 20
    plane2.position.z = Math.random() * 20

    plane2.rotation.y = Math.random() * 10
    plane2.rotation.x = Math.random() * 10
}

//model 

const gltfLoader = new GLTFLoader()

let mixer = null
let images = null
let model2 = null
let model3 = null
let model4 = null
let nonimages = null
let nonarticles = null
let nontext = null

let gltfdust = null
let clickables = new THREE.Group()


gltfLoader.load("/models/world_click/world_click_image.gltf", (gltf) => {
    images = gltf.scene;

    images.position.y = -8
    images.rotation.y = 15
    // scene.add(images)
    images.children.forEach((child) => { clickables.add(child) })

    gltfLoader.load("/models/world_click/world_click_video3.gltf", (gltf) => {
        model2 = gltf.scene;
        //model2.color = new THREE.Color('red')

        model2.position.y = -50
        model2.rotation.y = 120
        //scene.add(model2)
        const textureLoader = new THREE.TextureLoader()
        const slate = textureLoader.load("/assets/slate.png")
        const material = new THREE.MeshStandardMaterial({
            map: slate
        })
        model2.children.forEach((child) => {
            child.material = material
        //     child.material.normalMap.center.x = 0.5
        //     child.material.normalMap.center.y = 0.5
        //     child.material.normalMap.repeat.x = -1
        //     child.material.normalMap.repeat.y = 1
        })

        model2.children.forEach((child) => { child.position.z = child.position.z - 15 })
        model2.children.forEach((child) => { child.rotation.y = Math.PI / 180 * 2 })
        model2.children.forEach((child) => { clickables.add(child) })

        gltfLoader.load("/models/world_click/world_click_article.gltf", (gltf) => {
            model3 = gltf.scene;

            model3.position.y = -6
            model3.children.forEach((child) => { clickables.add(child) })

            gltfLoader.load("/models/world_click/world_click_text.gltf", (gltf) => {
                model4 = gltf.scene;

                model4.position.y = -7
                model4.children.forEach((child) => { clickables.add(child) })
                clickables.position.y = -1

                scene.add(clickables)
                tick()
            });
        });
    });
});


//nonclick
gltfLoader.load("/models/nonclickgltf/world_middle_nonclick_images.gltf", (gltf) => {
    nonimages = gltf.scene;

    nonimages.position.y = -6
    //nonimages.rotation.y = 15
    scene.add(nonimages)
});

gltfLoader.load("/models/nonclickgltf/world_middle_nonclick_text.gltf", (gltf) => {
    nontext = gltf.scene;

    nontext.position.y = -7
    //nontext.rotation.y = 15
    scene.add(nontext)
});

gltfLoader.load("/models/nonclickgltf/world_middle_nonclick_articles.gltf", (gltf) => {
    nonarticles = gltf.scene;

    nonarticles.position.y = -7
    //nonarticles.rotation.y = 15
    scene.add(nonarticles)
});

gltfLoader.load("/models/dust2.gltf", (gltf) => {
    gltfdust = gltf.scene;
    gltfdust.position.y = -3
});


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 150
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

const pointLight = new THREE.PointLight('white', 0.1)
pointLight.position.y = 2
pointLight.position.z = 10
//scene.add(pointLight)


window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// 원근카메라
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 400)
camera.position.set(15, 1, 20)

//이미지 사이즈 비슷하게 보이는 ver
//const aspectRatio = sizes.width / sizes.height
//const camera = new THREE.OrthographicCamera(- 5*aspectRatio, 5*aspectRatio, 5, - 5, 0.1, 1000)


scene.add(camera)

// gui.add(camera.position, 'x').min(0).max(25)

// Controls
const controls = new OrbitControls(camera, canvas, plane)
controls.target.set(0, 0, 0)
controls.maxDistance = 20
controls.minDistance = 1
controls.maxPolarAngle = Math.PI / 2
controls.minPolarAngle = Math.PI / 2
//controls.maxAzimuthAngle = Math.PI/1.8
controls.enableDamping = true




//카메라 rotation

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))



/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0


//raycaster
const raycaster = new THREE.Raycaster()
let currentIntersect = null


const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    // model.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    // images.rotation.y = elapsedTime * 0.05
    // model2.rotation.y = elapsedTime * 0.05
    // model3.rotation.y = elapsedTime * -0.1
    // model4.rotation.y = elapsedTime * -0.05

    nonimages.rotation.y = elapsedTime * 0.07
    nonarticles.rotation.y = elapsedTime * -0.05
    nontext.rotation.y = elapsedTime * -0.05

    gltfdust.rotation.y = elapsedTime * 0.07
    clickables.rotation.y = elapsedTime * -0.05


    if (mixer) {
        mixer.update(deltaTime)
    }
    // Update controls
    controls.update()

    camera.lookAt(plane.position);
    dust.rotation.y = elapsedTime * 0.1
    
    raycaster.setFromCamera(mouse, camera)
    const modelIntersects = raycaster.intersectObject(clickables)

    if (modelIntersects.length > 0) {
        currentIntersect = modelIntersects[0].object

        gsap.to(currentIntersect.scale, { duration: .5, x: 1.5, y: 1.5, z: 1.5 });
        gsap.to(currentIntersect.scale, { duration: .5, x: .5, y:.5, z: .5 });

        window.onclick = () => {
            if (currentIntersect != null) {
                openPopup(currentIntersect.name)
            }
        }
        window.ontouchend = () => {
            if (currentIntersect != null) {
                openPopup(currentIntersect.name)
            }
        }
    }
    else {
        currentIntersect = null
    }

    // Render
    renderer.render(scene, camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

const openPopup = (id) => {
    const description = document.getElementById('description')
    const contents = document.getElementById('desc-contents')
    const contentCategory = id.slice(0, 2)
    const contentId = id.split(-3, -1)
    const lr = document.body.dataset.lr
    switch (contentCategory) {
        case 'im':
            contents.innerHTML = `<img id="content-image" src="/clickables/image/${contentId}.jpg" alt="image" />`
            break
        case 'ma':
        case 'vi':
            contents.innerHTML = `
            <div id="video-player">
            <div id="content-video"><iframe id="video-frame" src="#" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
            </div>`
            const video = document.getElementById('video-frame')
            setTimeout(() => {
                video.contentWindow.location.replace(videolinks[lr][contentId[0]])
            }, 100)
            break
        case 'AD':
            contents.innerHTML = `<img id="content-image" src="/clickables/text/${contentId}.jpg" alt="image" />`
            break
        case 'ar':
            contents.innerHTML = `<img id="content-image" src="/clickables/article/${contentId}.jpg" alt="image" />`
            break
    }
    description.style.display = 'flex'
    description.style.width = '100%'
    description.style.height = '100%'

    if(contentCategory !== 'vi' && contentCategory !== 'ma'){
        const contentImage = document.getElementById('content-image')
        contents.scrollTop = Math.random() * contentImage.width
        contents.scrollLeft = Math.random() * contentImage.height
    }

    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;

    contents.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - contents.offsetLeft;
        scrollLeft = contents.scrollLeft;
        startY = e.pageY - contents.offsetTop;
        scrollTop = contents.scrollTop;
      })
      contents.addEventListener('mouseleave', () => {
        isDown = false;
      })
      contents.addEventListener('mouseup', () => {
        isDown = false;
      })
      contents.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - contents.offsetLeft;
        const walk = x - startX
        contents.scrollLeft = scrollLeft - walk;
        const y = e.pageY - contents.offsetTop;
        const walkY = y - startY
        contents.scrollTop = scrollTop - walkY;
      })

}
