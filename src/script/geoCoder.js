import { LocationService } from "./location";

export class GeoCoderService {
    constructor() {}

    async getLocationJSON() {
        const locService = new LocationService();
        let locData = await locService.getUserLocation();
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${locData.lat}&lon=${locData.long}`, {mode: 'cors'});
        let data = await response.json();
        return data;
    }

    async getTownName() {
        let dataJSON = await this.getLocationJSON();
        if (dataJSON) {
            return dataJSON.features[0].properties.address.town;
        } 
    }
}