let addRainAnimation
let rainAnimation
let rainNums = 0
const weatherDrop = []

function startRain(level) {
  rainNums = Math.pow(level, 2) * 100
  if (addRainAnimation)
    return
  console.log('开始下雨')
  weatherDropCvs.style.filter = 'none'
  weatherDropCtx.strokeStyle = 'rgba(255,255,255,0.8)'
  weatherDropCtx.lineWidth = 2
  function addRain() {
    while (weatherDrop.length < rainNums) {
      const long = Math.random() * 10 + 10
      const X = Math.random() * window.innerWidth + 1
      const rain = {
        X: X,
        Y: -10 - Math.random() * (window.innerHeight * level),
        long: long
      }
      weatherDrop.push(rain)
    }
    if (addRainAnimation)
      cancelAnimationFrame(addRainAnimation)
    addRainAnimation = requestAnimationFrame(addRain)
  }
  function rainMove() {
    weatherDropCtx.clearRect(0, 0, weatherDropCvs.width, weatherDropCvs.height)
    for (let i = 0; i < weatherDrop.length; i++) {
      weatherDrop[i].Y += 5
      weatherDropCtx.beginPath()
      weatherDropCtx.moveTo(weatherDrop[i].X, weatherDrop[i].Y)
      weatherDropCtx.lineTo(weatherDrop[i].X, weatherDrop[i].Y + weatherDrop[i].long)
      weatherDropCtx.stroke()
      weatherDropCtx.closePath()
      if (weatherDrop[i].Y > weatherDropCvs.height) {
        weatherDrop.splice(i, 1)
      }
      if (weatherDrop.length === 0) {
        cancelAnimationFrame(addRainAnimation)
        addRainAnimation = null
      }
    }
    if (rainAnimation)
      cancelAnimationFrame(rainAnimation)
    rainAnimation = requestAnimationFrame(rainMove)
  }
  addRain()
  rainMove()
}

function stopRain() {
  console.log('停止下雨')
  if (rainAnimation && weatherDrop.length === 0) {
    cancelAnimationFrame(rainAnimation)
    rainAnimation = null
  }
  if (addRainAnimation) {
    cancelAnimationFrame(addRainAnimation)
    addRainAnimation = null
  }
}