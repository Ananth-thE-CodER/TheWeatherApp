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
                        console.log(lat, long);
                    },
                    (error) => {
                        // User denied access. Let's go to Times Square then.
                        let [lat, long] = [40.75806633046647, -73.98554104232731]
                        resolve({lat, long})
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