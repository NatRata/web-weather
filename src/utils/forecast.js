const request = require('request')
const moment = require('moment')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/cc99de6238fe7d586a5f74471f010242/'+ latitude + ',' + longitude + '?units=si'


    request({url, json: true}, (error, {body}) => {
        if(error)
            callback('Unable to connect to weather services.',undefined)
        else if(body.error)
            callback('Unable to find the location',undefined)
        else{
            const timeHigh = moment(body.daily.data[0].temperatureHighTime*1000).format("HH:mm")
            const timeLow = moment(body.daily.data[0].temperatureLowTime*1000).format("HH:mm")
            
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                temperatureHigh: body.daily.data[0].temperatureHigh,
                temperatureHighTime: timeHigh,
                temperatureLow: body.daily.data[0].temperatureLow,
                temperatureLowTime: timeLow
            })
        }
            
    })
}

module.exports = forecast