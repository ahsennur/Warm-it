const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aurora'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aurora'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help section',
        title: 'Help',
        name: 'Aurora'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address cannot be empty'
        })
    }

    weather(req.query.address, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            // location,
            address: req.query.address
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search term must be provided'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []//play TODO
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aurora',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})