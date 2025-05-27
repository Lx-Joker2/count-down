// 天气种类
let weatherType
// 风速
let windLevel

let flashAnimation
let flashTimeout
let transitionTimeout

let isFlashing = false

let isCloud = false

let addCludAnimation
let cloudMoveAnimation

const clouds = []

const whiteCloud = new Image()
const blackCloud = new Image()
whiteCloud.src = './images/cloud.png'
blackCloud.src = './images/blackcloud.png'

function checkCloud(count, level, isBlack = false) {
  if (isBlack)
    blackCloud.addEventListener('load', startCloud(count, level, isBlack))
  else
    whiteCloud.addEventListener('load', startCloud(count, level, isBlack))
}

function startCloud(count, level, isBlack = false) {
  isCloud = true
  // 添加云
  windLevel = level
  function addCloud() {
    if (!isCloud)
      return
    if (clouds.length < count) {
      console.log(count, isBlack);
      let size = window.innerWidth / 10 + 250
      let dir = Math.floor(Math.random() * 2)
      let cloudImg = new Image()
      cloudImg = isBlack ? blackCloud : whiteCloud
      const cloud = {
        speed: Math.random() + 0.3,
        cloudSize: size,
        direction: dir,
        positionX: dir === 0 ? -size : window.innerWidth + size,
        positionY: Math.random() * 3,
        image: cloudImg
      }
      clouds.push(cloud)
    }
    if (addCludAnimation)
      cancelAnimationFrame(addCludAnimation)
    addCludAnimation = requestAnimationFrame(addCloud)
  }
  addCloud()
  cloudMove()
}
function cloudMove() {
  weatherCloudCtx.clearRect(0, 0, weatherCloudCvs.width, weatherCloudCvs.height)
  for (let i = 0; i < clouds.length; i++) {
    weatherCloudCtx.drawImage(clouds[i].image, clouds[i].positionX, clouds[i].positionY, clouds[i].cloudSize, clouds[i].cloudSize / 2)
    if (clouds[i].direction === 0)
      clouds[i].positionX = clouds[i].positionX + (clouds[i].speed + windLevel * 0.1)
    else
      clouds[i].positionX = clouds[i].positionX - (clouds[i].speed + windLevel * 0.1)
    if (clouds[i].positionX <= -clouds[i].cloudSize || clouds[i].positionX >= window.innerWidth + clouds[i].cloudSize)
      clouds.splice(i, 1)
    if (clouds.length === 0) {
      isCloud = false
      cancelAnimationFrame(cloudMoveAnimation)
      cloudMoveAnimation = null
      return
    }
  }
  if (cloudMoveAnimation)
    cancelAnimationFrame(cloudMoveAnimation)
  cloudMoveAnimation = requestAnimationFrame(cloudMove)
}

function stopCloud() {
  isCloud = false
}

function startFlash(dark) {
  transitionTimeout = setTimeout(() => {
    background.style.transition = 'initial'
  }, 1000)
  flash(dark)
}

function flash(dark) {
  if (isFlashing)
    return
  isFlashing = true
  flashTimeout = setTimeout(() => {
    setTimeout(() => {
      background.style.opacity = 1
    }, 50)
    setTimeout(() => {
      background.style.opacity = 1 - dark * 0.3
    }, 150)
    setTimeout(() => {
      background.style.opacity = 1
    }, 200)
    setTimeout(() => {
      background.style.opacity = 1 - dark * 0.3
    }, 250)
    setTimeout(() => {
      background.style.opacity = 1
    }, 300)
    setTimeout(() => {
      background.style.opacity = 1 - dark * 0.3
      isFlashing = false
    }, 350)
  }, Math.random() * 5000 + 3000)
  if (flashAnimation)
    cancelAnimationFrame(flash)
  flashAnimation = requestAnimationFrame(flash)
}


function stopFlash() {
  console.log('停止打雷')
  isFlashing = false
  if (flashAnimation) {
    cancelAnimationFrame(flashAnimation)
    flashAnimation = null
  }
  if (flashTimeout)
    clearTimeout(flashTimeout)
  if (transitionTimeout)
    clearTimeout(transitionTimeout)
}