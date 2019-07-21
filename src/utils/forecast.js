const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/cc99de6238fe7d586a5f74471f010242/'+ latitude + ',' + longitude + '?units=si'


    request({url, json: true}, (error, {body}) => {
        if(error)
            callback('Unable to connect to weather services.',undefined)
        else if(body.error)
            callback('Unable to find the location',undefined)
        else
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
    })
}

module.exports = forecast