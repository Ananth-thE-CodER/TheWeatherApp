import images from "./imageLoader";

export class UIBuilderService {
    // constructor() {
    //     this.rainyCondition = ['type_10', 'type_11', 'type_13', 'type_14', 'type_2', 'type_20', 'type_21', 'type_22', 'type_23', 'type_24', 'type_25', 'type_26', 'type_3', 'type_32', 'type_36', 'type_4', 'type_5', 'type_6']
    //     this.snowy = ['type_1', 'type_16', 'type_17', 'type_31', 'type_33', 'type_34', 'type_35', 'type_40', 'type_9']
    //     this.foggy = ['type_12', 'type_19', 'type_30', 'type_8']
    //     this.cloudy = ['type_27', 'type_28', 'type_41', 'type_42']
    //     this.thunder = ['type_18', 'type_37', 'type_38']
    //     this.stormy = ['type_15', 'type_7']
    // }

    buildCurrentUI(time, data) {
        let dataToday = this.extractToday(data);

        // let html = '<div class="current-weather">';
        let html = '<div class="left-pane">'
            html += '<div class="current-time">'
                html += `<span class="time">${time}</span>`
            html += '</div>'
            html += '<div class="current-temp">'
                html += `<span class="temp">${dataToday.temp}</span>`
                html += `<div class="weather-icon-large">` // Weather icon here !!
                    html += `<img src='${images[dataToday.icon]}' alt='${dataToday.conditions}'/>`
                html += '</div>'
            html += '</div>'
            html += '<div class="low-high">'
                html += '<div class="high-temp">'
                    html += `<span class="high-temp">High: ${dataToday.tempmax}</span>`
                html += '</div>'
                html += '<div class="low-temp">'
                    html += `<span class="low-temp">Low: ${dataToday.tempmin}</span>`
                html += '</div>'
            html += '</div>'
        html += '</div>'
        html += '<div class="right-pane">'
            html += '<div class="weather-status">'
                html += `<span class="status">${dataToday.conditions}</span>`
                html += `<span class="feels-like">${dataToday.feelslike}</span>`
            html += '</div>'
        html += '</div>'

        return html;
    }

    buildHourlyUI(time, data) {
        let hourlyForecast = this.extractHourly(time, data);

        let html = ''
        for (const hour of hourlyForecast) {
            html += `<div class="forecast-card" title='${hour.conditions}'>`
                html += '<div class="forecast-temp">'
                    html += `<span class="forecast-temp">${hour.temp}</span>`
                html += '</div>'
                html += '<div class="forecast-icon">'
                    html += `<img src='${images[hour.icon]}' alt='${hour.conditions}'/>`
                html += '</div>'
                html += '<div class="forecast-time">'
                    html += `<span class="forecast-time">${this.convertHour(hour.datetime)}</span>`
                html += '</div>'
            html += '</div>'
        }
        return html;
    }

    buildWeeklyUI(data) {
        let html = ''

        for (let day of data.days) {
            html += '<div class="forecast-card">'
                html += '<div class="forecast-day">'
                    html += `<span class="forecast-day">${this.formatDateString(day.datetime)}</span>`
                html += '</div>'
                html += '<div class="forecast-icon">'
                    html += `<img src='${images[day.icon]}' alt='${day.conditions}'/>`
                html += '</div>'
                html += '<div class="forecast-high-low">'
                    html += `<span class="forecast-high-low">${day.tempmax}/${day.tempmin}</span>`
                html += '</div>'
            html += '</div>'
        }

        return html;
    }

    convertHour(time) {
        let result = ''
        let hour = parseInt(time.split(':')[0])
        let ampm = hour >= 12 ? ' PM' : ' AM';
        hour = hour % 12;
        let hours = hour ? hour : 12; // the hour '0' should be '12'
        result = hours + ampm;
        return result
    }

    formatDateString(dateStr) {
        const date = new Date(dateStr);

        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const weekday = weekdays[date.getDay()];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];

        return `${weekday}, ${day} ${month}`;
    }

    extractToday(data) {
        return data.days[0];
    }

    extractNextDay(data) {
        return data.days[1];
    }

    extractHourly(time, data) {
        let currentData = this.extractToday(data);
        let hourlyData = [];

        for (const hour of currentData.hours) {
            if (hour.datetime.split(':')[0] >= time) {
                hourlyData.push(hour);
            }
        }

        let nextVals = 25 - hourlyData.length
        if (nextVals > 0) {
            let nextData = this.extractNextDay(data).hours;

            for (let i=0; i < nextVals; i++) {
                hourlyData.push(nextData[i]);
            }
        }

        return hourlyData;
    }
}