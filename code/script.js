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

startApp()

// Mapa de "tradução" dos códigos de ícones da API OpenWeather

// Inserindo dados atualizados no HTML
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
}
