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
var home = document.getElementById('homeButton')
var addShow = document.getElementById('new-show')
document.addEventListener('DOMContentLoaded', init)

function init() {
    fetchShows()
    addShow.addEventListener('click', createNewShow);
    home.addEventListener('click', wipeShowInfo);

}

function createNewShow() {
    Show.newShow()
}

function fetchShows() {
    var BASE_URL = 'http://[::1]:3000';
    fetch(`${BASE_URL}/shows`)
        .then(response => response.json())
        .then(json => {
            for (let shw of json) {
                Show.renderSideBar(shw)
            }
        })
}

function renderShowProfile(event) {
    let id = event.currentTarget.dataset.id
    let app = new App()
    App.fetchOneShow(id).then(showJson => {
        renderNewShowProfile(showJson)
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

function renderNewShowProfile(showJson) {
    Show.renderShowSegment(showJson)
    Artist.createArtistSegment(showJson)
    Venue.createVenueSegment(showJson)
}

function wipeShowInfo() {
    let showInfoContainer = document.getElementById('twelve')
    showInfoContainer.innerHTML = ""
}