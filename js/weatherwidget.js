const background = document.querySelector('.large-header .background')
// 天气画布(云类)
const weatherCloudCvs = document.querySelector('.weather-cloud-canvas')
const weatherCloudCtx = weatherCloudCvs.getContext('2d')
// 天气画布(雨类)
const weatherDropCvs = document.querySelector('.weather-drop-canvas')
const weatherDropCtx = weatherDropCvs.getContext('2d')
// 天气画布(雪类)
const weatherSnowCvs = document.querySelector('.weather-snow-canvas')
const weatherSnowCtx = weatherSnowCvs.getContext('2d')
// // 初始化画布
setCanvasSize()
window.addEventListener('resize', setCanvasSize)
function setCanvasSize() {
  weatherCloudCvs.width = window.innerWidth * devicePixelRatio
  weatherCloudCvs.height = window.innerHeight * devicePixelRatio
  weatherDropCvs.width = window.innerWidth * devicePixelRatio
  weatherDropCvs.height = window.innerHeight * devicePixelRatio
  weatherSnowCvs.width = window.innerWidth * devicePixelRatio
  weatherSnowCvs.height = window.innerHeight * devicePixelRatio
  weatherDropCtx.strokeStyle = 'rgba(255,255,255,0.8)'
  weatherSnowCtx.fillStyle = 'white'
}