console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')

messageOne.textContent = ''
messageTwo.textContent = ''
messageThree.textContent = ''
messageFour.textContent = ''
messageFive.textContent = ''
messageSix.textContent = ''



weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = searchTerm.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            return messageOne.textContent = data.error
        }
        messageOne.textContent   = 'Location: ' + data.location
        messageTwo.textContent   = data.forecast
        messageThree.textContent = 'Temperature: ' + Math.round(data.temperature) +'\u00B0C'
        messageFour.textContent  = 'Precipitation: ' + data.precipProbability
        messageFive.textContent  = 'Highest Temperature: ' + Math.round(data.temperatureHigh) + '\u00B0C at ' + data.temperatureHighTime
        messageSix.textContent   = 'Lowest Temperature: ' + Math.round(data.temperatureLow) + '\u00B0C at ' + data.temperatureLowTime
    })
})
})