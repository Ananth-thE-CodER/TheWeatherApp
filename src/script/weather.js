import urlify from "urlify";

export class WeatherService {
    constructor(town, unit = 'metric') {
        this.town = town
        this.unit = unit
    }

    async getWeatherJSON() {
        let response = await fetch(this.makeURL(), {mode: 'cors'});
        let data = {}
        if (response.status == '200') {
            data = await response.json();
        }
        else {
            data = {'error': 'Cannot find location.'}
        }
        return data
    } 

    getBaseURL() {
        return 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    }

    makeURL() {
        const urlified = urlify.create({
            addEToUmlauts: true,
            szToSs: true,
            spaces: "_",
            nonPrintable: "_",
            trim: true
        });
        let loc_text = urlified(this.town);
        return `${this.getBaseURL()} + ${loc_text}/next7days?unitGroup=${this.unit}&key=8MG3DYMAA28YWNTK8F7YBKKSG&contentType=json`
    }
}