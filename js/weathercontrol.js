// 天气种类：晴 少云* 多云* 阴* 阵雨* 雷阵雨* 小雨* 中雨* 大雨* 暴雨* 大暴雨* 特大暴雨* 雨夹雪* 阵雪* 小雪* 中雪* 大雪* 暴雪*

// 当前天气
let nowWeather
// api获取的天气
let weather
// 当前风速
let nowLevel
let level

let isInit = false
let code = localStorage.getItem('cityCode') || '110101'
// 高德地图api
const key = ''
// 正式方法：调用api获取天气并更新
window.addEventListener('load', () => {
  getWeather(code)
  setInterval(() => {
    getWeather(code)
  }, 10000)
})


// 测试用：测试时打开此方法
// weather = '阴'
// level = 1
// setInterval(() => {
//   updateWeather()
// }, 1000)

initCity()

async function initCity() {
  const provinceList = document.querySelector('#provinces')
  const cityList = document.querySelector('#cities')
  const areasList = document.querySelector('#areas')
  provinceList.addEventListener('change', async function (e) {
    const index = this.selectedIndex
    cityList.style.display = 'none'
    areasList.style.display = 'none'
    if (index === 0)
      return
    const pcode = e.target[index].value
    let cityArr = await getResult({
      method: 'GET',
      url: 'https://oneapi.coderbox.cn/openapi/public/chinaregion',
      params: {
        level: 2,
        pcode
      }
    })
    if (cityArr.length > 0)
      cityList.style.display = 'inline-block'
    addList(cityArr, cityList, '城市')
    initList(cityArr, cityList, code, 2, 4)
  })
  cityList.addEventListener('change', async function (e) {
    const index = this.selectedIndex
    areasList.style.display = 'none'
    if (index === 0)
      return
    const pcode = e.target[index].value
    let areaArr = await getResult({
      method: 'GET',
      url: 'https://oneapi.coderbox.cn/openapi/public/chinaregion',
      params: {
        pcode
      }
    })
    if (areaArr.length > 0)
      areasList.style.display = 'inline-block'
    addList(areaArr, areasList, '地区')
    initList(areaArr, areasList, code, 4, 6)
  })
  areasList.addEventListener('change', function () {
    if (code)
      code = null
    const cCode = this.value.substring(0, 6)
    code = cCode
    getWeather(cCode)
    console.log('cCode', cCode)
    localStorage.setItem('cityCode', cCode)
    isInit = true
  })
  let provinceArr = await getResult({
    method: 'GET',
    url: 'https://oneapi.coderbox.cn/openapi/public/chinaregion',
    params: {
      level: 1
    }
  })
  addList(provinceArr, provinceList, '省份')
  initList(provinceArr, provinceList, code, 0, 2)
}

function initList(arr, list, code, startIndex, endIndex) {
  if (code && (!isInit)) {
    const cCode = code.substring(startIndex, endIndex)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].code.toString().slice(startIndex, endIndex) === cCode) {
        list.value = arr[i].code
        list.dispatchEvent(new Event('change'))
      }
    }
  }
}


async function getResult(plugin) {
  let result
  await axios(plugin).then(res => {
    result = res.data.data
  }).catch(err => {
    throw new Error(`错误，原因：${err}`);
  })
  return result
}

function addList(arr, list, info) {
  let optionStr = `<option>请选择${info}</option>`
  for (let i = 0; i < arr.length; i++)
    optionStr += `<option value='${arr[i].code}'>${arr[i].name}</option>`
  list.innerHTML = optionStr
}

async function getWeather(city) {
  await axios({
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    method: 'GET',
    params: {
<<<<<<< HEAD
      key,
=======
      //这里填入高德地图api获取的key
      key: '',
>>>>>>> bc9ec363f41a64184805c7316a1e35f9b252e6f9
      city,
      extensions: 'base'
    }
  }).then(result => {
    console.log(result)
    weather = result.data.lives[0].weather
    level = +result.data.lives[0].windpower.slice(result.data.lives[0].windpower.length - 1)
    updateWeather()
  }).catch(error => {
    console.log(`天气api错误，原因：${error}`)
  })
}

// 把天气转换为对象
function getWeatherObj(weather) {
  let dark = 0
  let hasCloud = false
  let hasRain = false
  let hasSnow = false
  let hasFlash = false
  let snowLevel = 1
  let rainLevel = 1
  let cloudCount = 1
  let cloudColor = 'white'
  switch (weather) {
    case '少云':
      hasCloud = true
      cloudCount = 3
      break

    case '多云':
      hasCloud = true
      cloudCount = 7
      break
    case '阴':
      hasCloud = true
      cloudCount = 7
      cloudColor = 'black'
      dark = 1
      break
    case '阵雨':
      hasCloud = true
      cloudCount = 3
      hasRain = true
      dark = 0
      break
    case '小雨':
      hasCloud = true
      cloudColor = 'black'
      cloudCount = 7
      hasRain = true
      dark = 1
      break
    case '中雨':
      hasCloud = true
      cloudColor = 'black'
      cloudCount = 7
      hasRain = true
      dark = 1
      rainLevel = 1.5
      break
    case '大雨':
      hasCloud = true
      cloudColor = 'black'
      cloudCount = 7
      hasRain = true
      dark = 2
      rainLevel = 3
      break
    case '暴雨':
      hasCloud = true
      cloudColor = 'black'
      cloudCount = 5
      hasRain = true
      dark = 2
      rainLevel = 4
      break
    case '大暴雨':
      hasCloud = true
      cloudColor = 'black'
      cloudCount = 7
      hasRain = true
      dark = 2
      rainLevel = 5
      break
    case '特大暴雨':
      hasCloud = true
      cloudColor = 'black'
      cloudCount = 7
      hasRain = true
      dark = 2.5
      rainLevel = 7
      break
    case '雷阵雨':
      hasCloud = true
      cloudColor = 'black'
      cloudCount = 7
      hasRain = true
      rainLevel = 4
      hasFlash = true
      dark = 3
      break
    case '雨夹雪':
      hasCloud = true
      cloudColor = 'black'
      cloudCount = 7
      hasRain = true
      hasSnow = true
      dark = 1
      break
    case '小雪':
      hasSnow = true
      dark = 1
      break
    case '中雪':
      hasSnow = true
      snowLevel = 2
      dark = 1
      break
    case '大雪':
      hasSnow = true
      snowLevel = 3
      dark = 2
      break
    case '阵雪':
      hasSnow = true
      snowLevel = 2
      break
    case '暴雪':
      hasSnow = true
      snowLevel = 5
      hasCloud = true
      cloudColor = 'black'
      cloudCount = 7
      dark = 2.5
      break
    default:
      break
  }
  return {
    weatherName: weather,
    dark,
    hasCloud,
    cloudCount,
    cloudColor,
    hasRain,
    rainLevel,
    hasSnow,
    snowLevel,
    hasFlash
  }
}


// 更新天气
function updateWeather() {
  if (!weather || !level)
    return
  weather = getWeatherObj(weather)
  if (!nowWeather || nowWeather !== weather) {
    if (nowWeather) {
      if (!(weather.hasCloud && nowWeather.hasCloud)) {
        stopCloud()
      }
      if (!(weather.hasRain && nowWeather.hasRain)) {
        stopRain()
      }
      if (!(weather.hasSnow && nowWeather.hasSnow)) {
        stopSnow()
      }
      if (!(weather.hasFlash && nowWeather.hasFlash))
        stopFlash()
    }
  }
  background.style.transition = '1s'
  nowWeather = weather
  nowLevel = level
  background.style.opacity = 1 - nowWeather.dark * 0.3
  if (nowWeather.hasCloud) {
    if (nowWeather.cloudColor === 'white') {
      checkCloud(nowWeather.cloudCount, nowLevel)
    } else {
      checkCloud(nowWeather.cloudCount, nowLevel, true)
    }
  }
  if (nowWeather.hasRain)
    startRain(nowWeather.rainLevel)
  if (nowWeather.hasSnow)
    startSnow(nowWeather.snowLevel, nowLevel)
  if (nowWeather.hasFlash)
    startFlash(nowWeather.dark)
  weather = weather.weatherName
}
