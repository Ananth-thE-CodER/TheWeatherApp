import { GeoCoderService } from "./geoCoder";


export class LocationService {

    getUserLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const long = position.coords.longitude;
                        resolve({ lat, long });
                    },
                    (error) => {
                        // Do nothing.
                        reject("No Access")
                    }
                )
            }
            else {
                // Do nothing.
                reject("Cannot ask for location.")
            }
        })
    }
}