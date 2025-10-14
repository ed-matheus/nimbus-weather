// minha chave da API
const apiKey = "d2bccab77ab3788941f28080348cb4b8";

// Obtendo a localização do usuário, de acordo com permissão
const getCoords = () => {
  return new Promise(function (resolve, reject) {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalização não é suportada neste navegador."))
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude.toFixed(2)
        lon = position.coords.longitude.toFixed(2)
        resolve(position)
      },

      (error) => {
        reject(error)
      }
    )
  })
}

const startApp = async (lat, lon) => {
  try {
    // console.log("Pedindo permissão de localização...")

    // Espera explicitamente que todas as fontes do CSS estejam carregadas.
    await document.fonts.ready;

    const position = await getCoords();

    const lat = position.coords.latitude.toFixed(2)
    const lon = position.coords.longitude.toFixed(2)

    // console.log(`Coordenadas obtidas: ${lat}, ${lon}`);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`

    const fetchApiData = async () => {
      try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
        screenUpdate(data)

      } catch (error) {
        console.error('Erro ao obter os dados: ', error)
      }

    }
    
    return fetchApiData()
  } catch (error) {
    console.error("Erro ao obter localização:", error.message)
  }
}

const listaBackground = {
  "01d": "sunny-day",
  "01n": "clear-night",
  "02d": "few-clouds-day",
  "02n": "few-clouds-night",
  "03d": "scattered-day",
  "03n": "scattered-night",
  "04d": "cloudy-day",
  "04n": "cloudy-night",
  "09d": "drizzle-day",
  "09n": "drizzle-night",
  "10d": "rainy-day",
  "10n": "rainy-night",
  "11d": "storm-day",
  "11n": "storm-night",
  "13d": "snow-day",
  "13n": "snow-night",
  "50d": "mist-day",
  "50n": "mist-night",
}

// Manipulando os elementos para inserção de dados dinâmicos
const screenUpdate = (data) => {

  // Temperatura em graus Celsius
  const temperature = document.querySelector(".temperature")
  temperature.innerHTML = `${data.main.temp.toFixed(0)}°c`

  // Ícone do clima
  const apiIconCode = data.weather[0].icon
  // console.log(apiIconCode)
  const weatherIcon = document.querySelector(".weather-icon")
  weatherIcon.setAttribute('src', `assets/icons/${apiIconCode}.png`)

  // Clima e Cidade
  const weatherType = document.querySelector(".weather")
  weatherType.innerHTML = data.weather[0].description

  const location = document.querySelector(".city")
  location.innerHTML = data.name

  // Vento, umidade e sensação térmica 
  const windSpeed = document.querySelector(".wind")
  windSpeed.innerHTML = `Vento: ${data.wind.speed} km/h`

  const humidity = document.querySelector(".humidity")
  humidity.innerHTML = `Umidade: ${data.main.humidity}%`

  const feelsLike = document.querySelector(".feels-like")
  feelsLike.innerHTML = `Real feel: ${data.main.feels_like.toFixed(0)}°c`

  // Dinâmica para o background do app
  const bodyTag = document.querySelector("body")
  const backgroundClass = listaBackground[apiIconCode]
  bodyTag.className = backgroundClass

}

// Função para abrir/fechar o modal de previsão do tempo
const forecastModal = () => {
  const modal = document.querySelector(".modal-forecast")
  modal.classList.toggle('is-visible')
}

// Buscando dados de previsão da API
const fetchForecastData = async (lat, lon) => {
  try {
    // Espera explicitamente que todas as fontes do CSS estejam carregadas.
    await document.fonts.ready;

    const position = await getCoords();

    const lat = position.coords.latitude.toFixed(2)
    const lon = position.coords.longitude.toFixed(2)

    // console.log(`Coordenadas obtidas: ${lat}, ${lon}`);
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`

    const fetchApiData = async () => {
      try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`)
        }

        const data = await response.json()
        
        const forecastList = data.list
        
        const dailyForecast = forecastList.filter(forecastItem => {
          return forecastItem.dt_txt.includes("12:00:00")
        })

        // console.log(dailyForecast)

        modalUpdate(dailyForecast)

      } catch (error) {
        console.error('Erro ao obter os dados: ', error)
      }

    }
    
    return fetchApiData()
  } catch (error) {
    console.error("Erro ao obter localização:", error.message)
  }
}

window.onload = function () {
  startApp()
  fetchForecastData()
}


const modalUpdate = (dailyForecast) => {
  const list = document.querySelector('.forecast-list')
  
  const dataFormatter = (dailyForecast) => {
    const date = new Date(dailyForecast)
    const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })

    return formatter.format(date)
  }
  
  dailyForecast.forEach((i) => {
    console.log(i)

    const weekDay = dataFormatter(i.dt_txt)
    // const humidity = i.main.humidity
    const weather = i.weather[0].icon
    const weatherDesc = i.weather[0].description
    const temp = i.main.temp

    // Criando a tag <li></li>
    const li = document.createElement('li')

    // Criando a tag <img> para o ícone do clima
    const iconTag = document.createElement('img')
    iconTag.setAttribute('src', `assets/icons/${weather}.png`)

    li.innerHTML = `${weekDay} - ${temp.toFixed()}° ${weatherDesc}`
    li.appendChild(iconTag)
    list.appendChild(li)
  })
}
