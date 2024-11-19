const form = document.querySelector("form");
const inputLocation: HTMLInputElement | null =
  document.querySelector("#input-location");

const sectionWeatherInfos = document.querySelector("#weather-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!inputLocation || !sectionWeatherInfos) return;

  const location = inputLocation.value;

  if (location.length < 3) {
    alert("O local precisar ter pelo menos 3 letras.");
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b0cd668bae2fc6f9cbc4726b0790d42e&lang=pt_br&units=metric`
  );
  const dataWeather = await response.json();

  if (!response.ok) {
    alert("Cidade não encontrada. Favor tente novamente.");
    return;
  }

  const infos = {
    location: dataWeather.name,
    temp: Math.round(dataWeather.main.temp),
    descriptionWeather: dataWeather.weather[0].description,
    img: `https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`,
  };

  sectionWeatherInfos.innerHTML = `
                <div>
                    <h3>${infos.location}</h3>
                    <span>${infos.temp}°C</span>       
                </div>
                
                <div>
                    <img src="${infos.img}" alt="Icone do clima">
                    <p>${infos.descriptionWeather}</p>
                </div>`;
});
