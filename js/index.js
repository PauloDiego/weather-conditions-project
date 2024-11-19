"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("form");
const inputLocation = document.querySelector("#input-location");
const sectionWeatherInfos = document.querySelector("#weather-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!inputLocation || !sectionWeatherInfos)
        return;
    const location = inputLocation.value;
    if (location.length < 3) {
        alert("O local precisar ter pelo menos 3 letras.");
        return;
    }
    const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b0cd668bae2fc6f9cbc4726b0790d42e&lang=pt_br&units=metric`);
    const dataWeather = yield response.json();
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
}));
