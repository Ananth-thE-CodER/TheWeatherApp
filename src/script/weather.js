import urlify from "urlify";

export class WeatherService {
    constructor(town, unit = 'metric') {
        this.town = town
        this.unit = unit
    }

    async getWeatherJSON() {
        const urlified = urlify.create({
            addEToUmlauts: true,
            szToSs: true,
            spaces: "_",
            nonPrintable: "_",
            trim: true
        });
        let loc_text = urlified(this.town);
 
        let response = await fetch(this.makeURL(), {mode: 'cors'});
        const data = await response.json();
        return data
    } 

    getBaseURL() {
        return 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    }

    makeURL() {
        return `${this.getBaseURL()} + ${this.town}/next7days?unitGroup=${this.unit}&key=8MG3DYMAA28YWNTK8F7YBKKSG&contentType=json`
    }
}