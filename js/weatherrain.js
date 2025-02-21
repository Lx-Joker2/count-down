let weatherInterval
let weatherMoveInterval
let rainNums = 0

function startRain(level) {
  rainNums = Math.pow(level, 2) * 100
  if (weatherMoveInterval)
    return
  console.log('开始下雨')
  const weatherDrop = []
  weatherDropCvs.style.filter = 'none'
  weatherDropCtx.strokeStyle = 'rgba(255,255,255,0.8)'
  weatherDropCtx.lineWidth = 2
  weatherInterval = setInterval(() => {
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
  }, 1)
  weatherMoveInterval = setInterval(() => {
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
        clearInterval(weatherMoveInterval)
        weatherMoveInterval = null
      }
    }
  }, 0)
}

function stopRain() {
  console.log('停止下雨')
  if (weatherInterval)
    clearInterval(weatherInterval)
}