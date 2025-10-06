// Chave da API (API Key)
const apiKey = "be626c6ae8668345ab93f7ca2157d5f5"

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
    console.log("Pedindo permissão de localização...")

    const position = await getCoords();

    const lat = position.coords.latitude.toFixed(2)
    const lon = position.coords.longitude.toFixed(2)

    console.log(`Coordenadas obtidas: ${lat}, ${lon}`);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`

    const fetchApiData = async () => {
      try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)

      } catch (error) {
        console.error('Erro ao obter os dados: ', error)
      }
    }

    fetchApiData()
  } catch (error) {
    console.error("Erro ao obter localização:", error.message)
  }
}

startApp()