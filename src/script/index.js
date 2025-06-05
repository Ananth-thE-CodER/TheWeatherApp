import '../style/styles.css';
import images from './imageLoader';
import { GeoCoderService } from './geoCoder';
import { WeatherService } from './weather';
import { UIBuilderService } from './uiBuilder';

class Main {
    constructor() {

    }

    async init() {
        const geoCode = new GeoCoderService();
        let town = await geoCode.getTownName();

        let metricInput = document.querySelector("input#metric");

        const weather = new WeatherService(town, metricInput.checked ? 'us' : 'metric');
        let data = await weather.getWeatherJSON();

        const UIBuilder = new UIBuilderService(weather);
        let UIComponentCurrent = UIBuilder.buildCurrentUI(this.getTime(), data);

        document.querySelector("div.app-content div.current-weather").innerHTML = UIComponentCurrent;

        let d = new Date()
        let UIComponentHourly = UIBuilder.buildHourlyUI(d.getHours(), data);
        document.querySelector("div.hourly-forecast-container").innerHTML = UIComponentHourly;

        let UIComponentWeekly = UIBuilder.buildWeeklyUI(data);
        document.querySelector("div.weekly-forecast-container").innerHTML = UIComponentWeekly;

        // Remove loader
        document.querySelector("div.loader").classList.add("hidden");
    }

    async getWeather() {
        document.querySelector("div.loader").classList.remove("hidden");

        let metricInput = document.querySelector("input#metric");

        let town = document.querySelector("input.search").value;
        if (town.trim().length) {
            const weather = new WeatherService(town, metricInput.checked ? 'us' : 'metric');
            let data = await weather.getWeatherJSON();
            if (data.error) {
                const img = document.createElement('img');
                img.src = require('../assets/planet.png');
                img.alt = "Empty";
                img.classList.add("out-of-planet");
                const p = document.createElement("p");
                p.classList.add("empty-text");
                p.innerText = "Are you sure this location is on planet Earth?"

                document.querySelector("div.app-content div.current-weather").innerHTML = '';
                document.querySelector("div.hourly-forecast-container").innerHTML = '';
                document.querySelector("div.weekly-forecast-container").innerHTML = '';

                document.querySelector("div.empty").innerHTML = '';
                document.querySelector("div.empty").appendChild(img);
                document.querySelector("div.empty").appendChild(p);
                document.querySelector("div.empty").classList.remove("hidden");
                document.querySelector("div.loader").classList.add("hidden");
                return;
            }
            document.querySelector("div.empty").classList.add("hidden");

            const UIBuilder = new UIBuilderService(weather);
            let UIComponentCurrent = UIBuilder.buildCurrentUI(this.getTime(), data);

            document.querySelector("div.app-content div.current-weather").innerHTML = UIComponentCurrent;

            let d = new Date()
            let UIComponentHourly = UIBuilder.buildHourlyUI(d.getHours(), data);
            document.querySelector("div.hourly-forecast-container").innerHTML = UIComponentHourly;

            let UIComponentWeekly = UIBuilder.buildWeeklyUI(data);
            document.querySelector("div.weekly-forecast-container").innerHTML = UIComponentWeekly;

            // Remove loader
            document.querySelector("div.loader").classList.add("hidden");
        }
        else {
            this.init();
        }
    }

    getTime() {
        let d = new Date();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
}

const img = document.createElement('img');
img.src = require('../assets/magnifying-glass.png');
img.alt = "Search Icon";
document.querySelector("button.search-btn").appendChild(img);

const main = new Main();
main.init();

document.querySelector("button.search-btn").addEventListener("click", () => {
    main.getWeather();
})

document.querySelector("input#metric").addEventListener("change", (e) => {
    main.getWeather();
})