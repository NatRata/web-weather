console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

messageOne.textContent = ''
messageTwo.textContent = ''
messageThree.textContent = ''
messageFour.textContent = ''



weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = searchTerm.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            return messageOne.textContent = data.error
        }
        messageOne.textContent = 'Location: ' + data.location
        messageTwo.textContent = data.forecast
        messageThree.textContent = 'Temperature (C): ' + data.temperature
        messageFour.textContent = 'Precipitation: ' + data.precipProbability
    })
})
})