# 🌦️ Nimbus Weather

**Nimbus Weather** é um aplicativo simples e elegante de previsão do tempo que consome a API do <a href="https://openweathermap.org/">OpenWeather</a>.

Ele exibe informações meteorológicas em tempo real, como temperatura, sensação térmica, velocidade do vento e umidade, com design moderno e responsivo.

---

### 🚀 Tecnologias Utilizadas
- HTML5 – Estrutura semântica do app

- CSS3 – Estilização moderna e responsiva

- JavaScript (ES6) – Lógica e consumo da API

- OpenWeather API – Dados meteorológicos em tempo real

- Font Awesome – Ícones visuais do app

---

### 💡 Funcionalidades
✅ Exibe a temperatura atual e sensação térmica <br>
✅ Mostra o estado do tempo (ex: Céu Limpo, Nublado, Chuva etc.) <br>
✅ Informa velocidade do vento e umidade do ar <br>
✅ Identifica localização atual do usuário <br>
✅ Interface moderna e intuitiva <br>
✅ Totalmente responsivo, adaptado para telas mobile <br>

---
### 🧠 Como Funciona
O aplicativo faz uma requisição à **API OpenWeather**, obtendo os dados de acordo com a localização informada ou detectada automaticamente.
Essas informações são exibidas dinamicamente na interface principal.

```
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
```

---
### 📸 Preview
Interface limpa, minimalista e agradável, com visual moderno inspirado em apps mobile de clima.

[Aqui ainda vai uma imagem do app]

---
### 👨‍💻 Autor
Desenvolvido com 💙 por <a href="https://ed-matheus-portfolio.vercel.app/">Matheus Costa</a> <br>
📧 edsonmatheus02@hotmail.com <br>
🔗 linkedin.com/in/edson-matheus-b5a0171ba/