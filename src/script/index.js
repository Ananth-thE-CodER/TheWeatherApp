import '../style/styles.css';
import { GeoCoderService } from './geoCoder';
import { WeatherService } from './weather';
import { UIBuilderService } from './uiBuilder';

class Main {
    constructor() {

    }

    async init() {
        const geoCode = new GeoCoderService();
        let town = await geoCode.getTownName();

        const weather = new WeatherService(town, 'metric');
        let data = await weather.getWeatherJSON();

        const UIBuilder = new UIBuilderService();
        let UIComponentCurrent = UIBuilder.buildCurrentUI(this.getTime(), data);

        document.querySelector("div.app-content div.current-weather").innerHTML = UIComponentCurrent;

        let d = new Date()
        let UIComponentHourly = UIBuilder.buildHourlyUI(d.getHours(), data);
        document.querySelector("div.hourly-forecast-container").innerHTML = UIComponentHourly;

        let UIComponentWeekly = UIBuilder.buildWeeklyUI(data);
        document.querySelector("div.weekly-forecast-container").innerHTML = UIComponentWeekly;

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

const main = new Main();
main.init();