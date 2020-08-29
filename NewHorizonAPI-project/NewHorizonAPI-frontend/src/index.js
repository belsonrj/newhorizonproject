var codes = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
];
var BASE_URL = 'http://[::1]:3000';

document.addEventListener('DOMContentLoaded', init)


var home = document.getElementById('homeButton')

//fetch(`${BASE_URL}/`)
//    .then(response => response.json())
//    .then(parsedResponse => console.log(parsedResponse));

function init() {
    fetchEvents()
    home.addEventListener('click', wipeEventInfo)
    var addEvent = document.getElementById('new-event');
    if (addEvent) {
        addEvent.addEventListener('click', createNewEvent);
    }
}

function createNewEvent() {
    Event.newEvent()
}

function fetchEvents() {
    fetch(`${BASE_URL}/events`)
        .then(response => response.json())
        .then(json => {
            for (let event of json) {
                Event.renderSideBar(event)
            }
        })
}

function renderEventProfile(event) {
    let id = event.currentTarget.dataset.id
    let app = new App()
    App.fetchOneEvent(id).then(tripJson => {
        renderNewEventProfile(tripJson)
    })
}

function createSegment(name) {
    let columnDiv = document.querySelector('.twelve')
    let segmentDiv = document.createElement('div')
    let labelDiv = document.createElement('div')
    let addButtonDiv = document.createElement('div')
    let cardsDiv = document.createElement('div')
    let formDiv = document.createElement('div')

    segmentDiv.classList.add("ui", "segment")
    labelDiv.classList.add("ui", "top", "attached", "label")
    addButtonDiv.classList.add("ui", "blue", "button")
    cardsDiv.classList.add("ui", "cards")
    formDiv.id = "form"

    addButtonDiv.innerText = "Add New"
    labelDiv.innerText = name

    columnDiv.appendChild(segmentDiv)
    segmentDiv.append(labelDiv, addButtonDiv, formDiv, cardsDiv)

    return segmentDiv
}

function renderNewEventProfile(tripJson) {
    Event.renderEventSegment(tripJson)
    Artist.createArtistSegment(tripJson)
    Venue.createVenueSegment(tripJson)
}

function wipeEventInfo() {
    let eventInfoContainer = document.getElementById('twelve')
    eventInfoContainer.innerHTML = ""
}