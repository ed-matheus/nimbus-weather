// Este código NÃO roda no navegador, roda no servidor da Netlify
exports.handler = async function (event, context) {
  const { lat, lon } = event.queryStringParameters;
  const apiKey = process.env.OPENWEATHER_API_KEY; // Pega a chave segura
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};