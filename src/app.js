const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const name = 'Natthaphon Ratanaroekkhajorn'

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'Helpful text',
        name
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error)
            return res.send({error})
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
                return res.send({error})
            res.send({
                location,
                forecast: forecastData.summary,
                temperature: forecastData.temperature,
                precipProbability: forecastData.precipProbability,
                temperatureHigh: forecastData.temperatureHigh,
                temperatureHighTime: forecastData.temperatureHighTime,
                temperatureLow: forecastData.temperatureLow,
                temperatureLowTime: forecastData.temperatureLowTime
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term."
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404: not found',
        errorText: 'Help artical not found.',
        name
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404: not found',
        errorText: 'The page you are looking for does not exist.',
        name
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})