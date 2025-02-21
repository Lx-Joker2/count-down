let snowInterval
let snowMoveInterval
let snowNums = 0

function startSnow(level, wLevel) {
  snowNums = Math.pow(level, 2) * 100
  if (snowMoveInterval)
    return
  console.log('开始下雪')
  const weatherSnow = []
  weatherSnowCvs.style.filter = 'blur(1px)'
  weatherSnowCtx.fillStyle = 'white'
  snowInterval = setInterval(() => {
    while (weatherSnow.length < snowNums) {
      let snowX = Math.random() * window.innerWidth + 1
      const snowWSize = Math.random() * 3
      let snowY = -(Math.random() * (window.innerHeight / 2))
      const snowSpeed = Math.random() + 0.3
      const snowDirect = Math.floor(Math.random() * 3)
      weatherSnow.push({ X: snowX, Y: snowY, size: snowWSize, speed: snowSpeed, direct: snowDirect })
    }
  }, 1000)
  windLevel = wLevel
  snowMoveInterval = setInterval(() => {
    weatherSnowCtx.clearRect(0, 0, weatherSnowCvs.width, weatherSnowCvs.height)
    for (let i = 0; i < weatherSnow.length; i++) {
      weatherSnow[i].Y += (weatherSnow[i].speed + windLevel * 0.1)
      if (weatherSnow[i].direct == 0) {
        weatherSnow[i].X -= (weatherSnow[i].speed + windLevel * 0.1)
      }
      if (weatherSnow[i].direct == 2) {
        weatherSnow[i].X += (weatherSnow[i].speed + windLevel * 0.1)
      }
      weatherSnowCtx.beginPath()
      weatherSnowCtx.arc(weatherSnow[i].X, weatherSnow[i].Y, weatherSnow[i].size, 0, 2 * Math.PI)
      weatherSnowCtx.fill()
      weatherSnowCtx.closePath()
      if (weatherSnow[i].Y > weatherSnowCvs.height || weatherSnow[i].X < 0 || weatherSnow[i].X > weatherSnowCvs.width) {
        weatherSnow.splice(i, 1)
      }
      if (weatherSnow.length === 0) {
        clearInterval(snowMoveInterval)
        snowMoveInterval = null
      }
    }
  }, 5)
}

function stopSnow() {
  console.log('停止下雪')
  if (snowInterval)
    clearInterval(snowInterval)

}