import { LocationService } from "./location";

export class GeoCoderService {
    constructor() {}

    async getLocationJSON() {
        const locService = new LocationService();
        let locData = await locService.getUserLocation();
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${locData.lat}&lon=${locData.long}&zoom=10&addressdetails=1`, {mode: 'cors'});
        let data = await response.json();
        return data;
    }

    async getTownName() {
        let dataJSON = await this.getLocationJSON();
        if (dataJSON) {
            return dataJSON.name;
        } 
    }
}