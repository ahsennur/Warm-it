const request = require('request')

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d02eb2626c8446babe222c2cbb953a44&query='+ location

    request({ url: url}, (error,response) => {
        const data = JSON.parse(response.body);

        if (error) {
            callback('Cannot connect to service', undefined)
        } else if (data.error) {
            callback('Cannot find location', undefined)
        } else {
            const temp = data.current.temperature;
            const feels = data.current.feelslike;
            const description = data.current.weather_descriptions[0];
           
            callback(undefined, description+ ". It is "+ temp+" degrees out. But it feels like "+ feels)
        }
    });
}

module.exports = forecast